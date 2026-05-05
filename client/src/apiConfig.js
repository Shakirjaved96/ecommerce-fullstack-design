// Centralized API Base URL
// For Vercel deployment, we use a relative path if hosted on the same domain
// Otherwise, we can use an environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export default API_BASE_URL;
