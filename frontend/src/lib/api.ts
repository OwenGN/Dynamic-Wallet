const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

interface ApiError extends Error {
  status?: number;
}

export const apiCall = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const headers = new Headers(options.headers as HeadersInit);
  headers.set('Content-Type', 'application/json');

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error: ApiError = new Error(`API Error: ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
};

export default apiCall;
