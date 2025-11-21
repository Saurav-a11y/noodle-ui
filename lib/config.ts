// Server-side API URL (for Next.js API routes)
export const API_BASE_URL =
    process.env.INTERNAL_API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:5130/noodle";

// Client-side API URL (for direct external API calls from browser)
export const CLIENT_API_URL = 
    process.env.NEXT_PUBLIC_API_URL ??
    "https://data-api.agentos.cloud/noodle";