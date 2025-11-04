const DEFAULT_TEX_COMPILE_ENDPOINT = 'https://latex.ytotech.com/builds/sync';

export class LatexCompilationError extends Error {
  public readonly log?: string;

  constructor(message: string, log?: string) {
    super(message);
    this.name = 'LatexCompilationError';
    this.log = log;
  }
}

const getCompileEndpoint = (): string => {
  const configured = import.meta.env?.VITE_TEX_COMPILE_ENDPOINT as string | undefined;
  return configured?.trim() || DEFAULT_TEX_COMPILE_ENDPOINT;
};

const extractCompilationError = async (response: Response): Promise<LatexCompilationError> => {
  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    try {
      const payload = await response.json() as {
        error?: string;
        logs?: string;
        log_files?: Record<string, string>;
      };

      const message = payload?.error
        ? `LaTeX compilation failed: ${payload.error}`
        : `Service responded with status ${response.status}`;

      const log =
        payload?.logs ??
        (payload?.log_files
          ? Object.values(payload.log_files).join('\n\n')
          : undefined);

      return new LatexCompilationError(message, log);
    } catch (jsonError) {
      return new LatexCompilationError(
        `Failed to parse error response (status ${response.status})`,
        jsonError instanceof Error ? jsonError.message : String(jsonError),
      );
    }
  }

  const fallbackLog = await response.text();
  return new LatexCompilationError(`Service responded with status ${response.status}`, fallbackLog);
};

export const compileLatexToPdf = async (latexCode: string, signal?: AbortSignal): Promise<Blob> => {
  if (!latexCode.trim()) {
    throw new LatexCompilationError('No LaTeX code provided');
  }

  const endpoint = getCompileEndpoint();

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      compiler: 'xelatex',
      resources: [
        {
          main: true,
          content: latexCode,
        },
      ],
      options: {
        response: {
          log_files_on_failure: true,
        },
      },
    }),
    signal,
  });

  if (!response.ok) {
    throw await extractCompilationError(response);
  }

  const contentType = response.headers.get('content-type') ?? '';

  if (!contentType.includes('application/pdf')) {
    throw await extractCompilationError(response);
  }

  return response.blob();
};
