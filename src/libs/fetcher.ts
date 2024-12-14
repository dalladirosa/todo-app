type FetcherError = {
  message: string;
  status?: number;
};

export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = 'APIError';
  }
}

type FetcherOptions = RequestInit & {
  baseURL?: string;
};

export async function fetcher<T>(
  url: string,
  options: FetcherOptions = {},
): Promise<T> {
  const { baseURL = process.env.API_BASE_URL, ...fetchOptions } = options;

  const fullUrl = `${baseURL}${url.startsWith('/') ? url : `/${url}`}`;

  try {
    const response = await fetch(fullUrl, {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    });

    if (!response.ok) {
      const error: FetcherError = {
        message: 'An error occurred while fetching the data.',
        status: response.status,
      };

      try {
        const data = await response.json();
        error.message = data.message || error.message;
      } catch {
        console.error('Failed to parse JSON response', response);
      }

      throw new APIError(error.message, error.status);
    }

    return response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(
      error instanceof Error ? error.message : 'An unexpected error occurred',
    );
  }
}
