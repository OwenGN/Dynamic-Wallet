const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
export const apiCall = async (endpoint, options = {}) => {
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });
    if (!response.ok) {
        const error = new Error(`API Error: ${response.status}`);
        error.status = response.status;
        throw error;
    }
    return response.json();
};
export default apiCall;
