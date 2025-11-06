
import React, { useState, useCallback, useEffect, useRef } from 'react';
import type { UserDetails } from '../types';
import { generateReport, refineTopic } from '../services/geminiService';
import { compileLatexToPdf, LatexCompilationError } from '../services/pdfService';
import { DownloadIcon, SparklesIcon, WarningIcon, RefreshIcon, DocumentTextIcon, CogIcon, PdfIcon } from './icons';
import Spinner from './Spinner';
import { useLanguage } from '../contexts/LanguageContext';
import ReportSettings from './ReportSettings';

interface ReportViewProps {
  userDetails: UserDetails;
  setUserDetails: (details: UserDetails) => void;
  onStartOver: () => void;
}

const ReportView: React.FC<ReportViewProps> = ({ userDetails, setUserDetails, onStartOver }) => {
  const { t } = useLanguage();
  const [topic, setTopic] = useState('');
  const [latexCode, setLatexCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRefining, setIsRefining] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
  const compileAbortRef = useRef<AbortController | null>(null);
  const pdfBlobRef = useRef<Blob | null>(null);
  const previewUrlRef = useRef<string | null>(null);

  const handleGenerate = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || isLoading || isRefining) return;

    setIsLoading(true);
    setError(null);
    setLatexCode(null);
    setPreviewError(null);
    setPdfPreviewUrl(null);
    setIsPreviewLoading(false);
    pdfBlobRef.current = null;
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    if (compileAbortRef.current) {
      compileAbortRef.current.abort();
      compileAbortRef.current = null;
    }

    try {
      const result = await generateReport(userDetails, topic);
      if (result.startsWith('Error from API:')) {
        setError(result);
        setLatexCode(null);
      } else {
        setLatexCode(result);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setLatexCode(null);
    } finally {
      setIsLoading(false);
    }
  }, [topic, isLoading, isRefining, userDetails]);

  const handleRefineTopic = useCallback(async () => {
    if (!topic.trim() || isRefining || isLoading) return;

    setIsRefining(true);
    setError(null);

    try {
        const refined = await refineTopic(topic, userDetails.language);
        setTopic(refined);
    } catch (err) {
        setError(err instanceof Error ? `${t('refineErrorPrefix')} ${err.message}` : 'Failed to refine topic.');
    } finally {
        setIsRefining(false);
    }
  }, [topic, isRefining, isLoading, userDetails, t]);

  const handleDownloadTex = () => {
    if (!latexCode) return;
    const blob = new Blob([latexCode], { type: 'application/x-tex' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report-source.tex';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = useCallback(async () => {
    if (!latexCode || isGeneratingPdf) return;

    setIsGeneratingPdf(true);
    setError(null);

    try {
        const blob = pdfBlobRef.current ?? await compileLatexToPdf(latexCode);
        pdfBlobRef.current = blob;
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'report.pdf';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(url);
    } catch (err) {
        if (err instanceof LatexCompilationError) {
            if (err.log) {
                console.error('PDF compilation error log:', err.log);
            }
            console.error('Failed to generate PDF:', err);
            setError(t('pdfGenerationError'));
        } else {
            console.error('Failed to generate PDF:', err);
            setError(t('pdfGenerationError'));
        }
    } finally {
        setIsGeneratingPdf(false);
    }
  }, [latexCode, isGeneratingPdf, t]);

  useEffect(() => {
    if (!latexCode) {
      setPdfPreviewUrl(null);
      setPreviewError(null);
      setIsPreviewLoading(false);
      pdfBlobRef.current = null;
      compileAbortRef.current?.abort();
      compileAbortRef.current = null;
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
      return;
    }

    const controller = new AbortController();
    compileAbortRef.current?.abort();
    compileAbortRef.current = controller;
    setIsPreviewLoading(true);
    setPreviewError(null);

    const preparePreview = async () => {
      try {
        const blob = await compileLatexToPdf(latexCode, controller.signal);
        if (controller.signal.aborted) return;
        pdfBlobRef.current = blob;
        if (previewUrlRef.current) {
          URL.revokeObjectURL(previewUrlRef.current);
        }
        const nextUrl = URL.createObjectURL(blob);
        previewUrlRef.current = nextUrl;
        setPdfPreviewUrl(nextUrl);
      } catch (err) {
        if (controller.signal.aborted) return;
        console.error('Failed to prepare PDF preview:', err);
        setPreviewError(t('previewErrorGeneric'));
        pdfBlobRef.current = null;
        if (previewUrlRef.current) {
          URL.revokeObjectURL(previewUrlRef.current);
          previewUrlRef.current = null;
        }
        setPdfPreviewUrl(null);
      } finally {
        if (!controller.signal.aborted) {
          setIsPreviewLoading(false);
          compileAbortRef.current = null;
        }
      }
    };

    preparePreview();

    return () => {
      controller.abort();
    };
  }, [latexCode, t]);

  useEffect(() => {
    return () => {
      compileAbortRef.current?.abort();
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto animate-fade-in">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
            {/* Left Column: Form */}
            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-8 space-y-6">
                <div className="bg-white border border-slate-200/50 shadow-lg rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-slate-800">{t('generationSettingsTitle')}</h3>
                        <button
                            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                            className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                            aria-expanded={isSettingsOpen}
                            aria-controls="report-settings-panel"
                        >
                            <CogIcon className="w-5 h-5"/>
                            <span className="ms-1.5">{isSettingsOpen ? t('hideSettingsButton') : t('showSettingsButton')}</span>
                        </button>
                    </div>

                    {isSettingsOpen && (
                        <div id="report-settings-panel" className="mb-6 animate-fade-in transition-all duration-300">
                            <ReportSettings details={userDetails} setDetails={setUserDetails} />
                        </div>
                    )}
                    
                    <form onSubmit={handleGenerate} className="space-y-4">
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label htmlFor="topic" className="block text-sm font-medium text-slate-700">
                                {t('topicLabel')}
                            </label>
                             <button 
                                type="button" 
                                onClick={handleRefineTopic}
                                disabled={isRefining || isLoading || !topic.trim()}
                                className="flex items-center text-xs font-semibold text-blue-600 hover:text-blue-800 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
                            >
                                {isRefining ? <Spinner/> : <SparklesIcon className="w-4 h-4"/>}
                                <span className="ms-1">{isRefining ? t('refiningButton') : t('refineButton')}</span>
                            </button>
                        </div>
                        <textarea
                        id="topic"
                        rows={4}
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder={t('topicPlaceholder')}
                        className="block w-full bg-white border border-slate-300 rounded-md shadow-sm py-2 px-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                        required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading || isRefining || !topic.trim()}
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? <Spinner /> : <SparklesIcon className="w-5 h-5"/>}
                        <span className="mx-2">{isLoading ? t('generatingButton') : t('generateButton')}</span>
                    </button>
                    </form>
                </div>
                 <button 
                    onClick={onStartOver}
                    className="w-full flex justify-center items-center py-2 px-4 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 transition-colors"
                >
                    <RefreshIcon className="w-4 h-4 me-2" />
                    {t('startOverButton')}
                </button>
            </div>

            {/* Right Column: Results */}
            <div className="lg:col-span-7 xl:col-span-8 mt-8 lg:mt-0">
                <div className="bg-white border border-slate-200/50 shadow-lg rounded-xl p-6 min-h-[70vh] flex flex-col">
                    {isLoading ? (
                    <div className="flex-grow flex flex-col items-center justify-center text-slate-500">
                        <Spinner />
                        <p className="mt-4 text-center">{t('generatingStatus')} "{topic}"...</p>
                    </div>
                    ) : error ? (
                    <div className="flex-grow flex flex-col items-center justify-center text-red-600">
                        <WarningIcon />
                        <p className="mt-4 font-semibold">{t('errorTitle')}</p>
                        <p className="text-sm text-red-500 text-center">{error}</p>
                    </div>
                    ) : latexCode ? (
                    <div className="flex flex-col flex-grow">
                        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                            <h3 className="text-lg font-semibold text-slate-900">{t('previewTitle')}</h3>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={handleDownloadPdf}
                                    disabled={isGeneratingPdf || isPreviewLoading}
                                    className="flex items-center px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium text-white transition-colors disabled:bg-green-400 disabled:cursor-not-allowed"
                                >
                                    {isGeneratingPdf ? <Spinner /> : <PdfIcon />}
                                    <span className="ms-1.5">{isGeneratingPdf ? t('generatingPdfButton') : t('downloadPdfButton')}</span>
                                </button>
                                <button
                                    onClick={handleDownloadTex}
                                    className="flex items-center px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md text-sm font-medium text-slate-700 transition-colors"
                                >
                                    <DownloadIcon />
                                    <span className="ms-1.5">{t('downloadSourceButton')}</span>
                                </button>
                            </div>
                        </div>
                        <div className="relative flex-grow">
                            {isPreviewLoading ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 bg-slate-50 border border-slate-200 rounded-md">
                                    <Spinner />
                                    <p className="mt-4 text-sm max-w-xs text-center">{t('previewLoading')}</p>
                                </div>
                            ) : previewError ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-red-50 border border-red-200 rounded-md p-6 text-red-600">
                                    <WarningIcon className="w-6 h-6" />
                                    <p className="mt-3 text-sm">
                                        <span className="font-semibold">{t('previewErrorPrefix')}</span>{' '}
                                        {previewError}
                                    </p>
                                    <p className="mt-2 text-xs text-red-500">{t('previewRecovery')}</p>
                                </div>
                            ) : pdfPreviewUrl ? (
                                <iframe
                                    src={pdfPreviewUrl}
                                    title={t('previewTitle')}
                                    className="w-full h-[70vh] border border-slate-200 rounded-md shadow-inner"
                                />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 bg-slate-50 border border-slate-200 rounded-md">
                                    <DocumentTextIcon className="w-10 h-10 text-slate-300" />
                                    <p className="mt-3 text-sm text-center px-6">{t('previewUnavailable')}</p>
                                </div>
                            )}
                        </div>
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                            <strong>{t('nextStepTitle')}</strong> <span>{t('nextStepDesc')}</span>
                        </div>
                    </div>
                    ) : (
                        <div className="flex-grow flex flex-col items-center justify-center text-center text-slate-500 p-8">
                            <DocumentTextIcon className="w-16 h-16 text-slate-300" />
                            <h3 className="mt-4 text-lg font-semibold text-slate-700">{t('emptyStateTitle')}</h3>
                            <p className="mt-1 max-w-sm">{t('emptyStateDesc')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default ReportView;
