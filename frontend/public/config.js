// Runtime configuration consumed by the SPA before it boots.
//
// In production the frontend container OVERWRITES this file at startup from the
// VITE_API_URL value in .env (see docker-entrypoint.sh). It is left empty here
// so local development falls back to the build-time env / localhost default.
window.__APP_CONFIG__ = {};
