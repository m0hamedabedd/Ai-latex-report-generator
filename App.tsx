
import React, { useState } from 'react';
import type { UserDetails } from './types';
import UserDetailsForm from './components/UserDetailsForm';
import ReportView from './components/ReportView';
import HowItWorks from './components/HowItWorks';
import { SparklesIcon } from './components/icons';
import { useLanguage } from './contexts/LanguageContext';

const App: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const { t, language, toggleLanguage } = useLanguage();

  const handleDetailsSubmit = (details: UserDetails) => {
    setUserDetails(details);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleStartOver = () => {
    setUserDetails(null);
     window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartCreating = () => {
    const formSection = document.getElementById('form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLearnMore = () => {
    const howItWorksSection = document.getElementById('how-it-works');
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <main className="w-full flex-grow flex flex-col items-center">
        {userDetails ? (
          <>
            <header className="w-full max-w-7xl text-center mb-8 sm:mb-12 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">{t('studioTitle')}</h1>
              <p className="mt-3 text-lg text-slate-600">
                {t('studioSubtitle')}
              </p>
            </header>
            <ReportView 
              userDetails={userDetails} 
              setUserDetails={setUserDetails} 
              onStartOver={handleStartOver} 
            />
          </>
        ) : (
          <div className="w-full max-w-6xl flex flex-col items-center">
            {/* Hero Section */}
            <section className="w-full py-12 sm:py-16 lg:py-20 animate-fade-in">
              <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-6 py-10 sm:px-10">
                <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
                  <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-blue-200 blur-[120px]" />
                  <div className="absolute top-32 -left-10 h-56 w-56 rounded-full bg-indigo-200 blur-[140px]" />
                </div>
                <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-16">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/70 px-4 py-2 shadow-sm backdrop-blur">
                      <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                        {t('heroBadgeLabel')}
                      </span>
                      <span className="text-xs text-slate-500">{t('heroBadgeSublabel')}</span>
                    </div>
                    <div>
                      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                        {t('heroTitle')}
                      </h1>
                      <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                        {t('heroSubtitle')}
                      </p>
                    </div>
                    <div className="space-y-4">
                      {[
                        { title: t('heroBenefit1Title'), desc: t('heroBenefit1Desc') },
                        { title: t('heroBenefit2Title'), desc: t('heroBenefit2Desc') },
                        { title: t('heroBenefit3Title'), desc: t('heroBenefit3Desc') },
                      ].map((item) => (
                        <div key={item.title} className="flex items-start gap-3">
                          <div className="mt-1 rounded-full bg-blue-600/10 p-2 text-blue-600">
                            <SparklesIcon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{item.title}</p>
                            <p className="text-sm text-slate-600">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <button
                        onClick={handleStartCreating}
                        className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        <SparklesIcon className="me-2 h-5 w-5" />
                        {t('startCreating')}
                      </button>
                      <button
                        type="button"
                        onClick={handleLearnMore}
                        className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-base font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
                      >
                        {t('heroSecondaryCta')}
                      </button>
                      <p className="text-sm text-slate-500">{t('heroCtaHint')}</p>
                    </div>
                    <div className="flex flex-wrap gap-6">
                      {[
                        { value: t('heroStat1Value'), label: t('heroStat1Label') },
                        { value: t('heroStat2Value'), label: t('heroStat2Label') },
                      ].map((stat) => (
                        <div key={stat.label} className="rounded-2xl border border-white/60 bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
                          <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                          <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/60 bg-white/90 p-6 shadow-xl backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-500">
                      {t('heroPreviewLabel')}
                    </p>
                    <h3 className="mt-3 text-2xl font-bold text-slate-900">{t('heroPreviewTitle')}</h3>
                    <p className="mt-2 text-sm text-slate-600">{t('heroPreviewDesc')}</p>
                    <div className="mt-6 space-y-4">
                      <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {t('heroPreviewItem1Title')}
                        </p>
                        <p className="mt-2 text-slate-800">{t('heroPreviewItem1Desc')}</p>
                      </div>
                      <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {t('heroPreviewItem2Title')}
                        </p>
                        <p className="mt-2 text-slate-800">{t('heroPreviewItem2Desc')}</p>
                      </div>
                    </div>
                    <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
                      {t('heroPreviewFooter')}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* "How It Works" Section */}
            <div id="how-it-works" className="w-full py-12 animate-fade-in">
                <HowItWorks />
            </div>
            
            {/* Form Section */}
            <div id="form-section" className="w-full scroll-mt-20 pt-16 sm:pt-24 animate-fade-in">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">{t('formSectionTitle')}</h2>
                <p className="mt-3 text-lg text-slate-500">{t('formSectionSubtitle')}</p>
              </div>
              <div className="flex justify-center">
                <UserDetailsForm onSubmit={handleDetailsSubmit} />
              </div>
            </div>
          </div>
        )}
      </main>
       <footer className="w-full max-w-5xl text-center py-8 mt-16 border-t border-slate-200">
            <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} {t('footerText')}</p>
            <button onClick={toggleLanguage} className="mt-2 text-sm text-blue-600 hover:underline">
              {t('toggleLanguage')}
            </button>
        </footer>
    </div>
  );
};

export default App;
