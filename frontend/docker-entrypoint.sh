#!/bin/sh
set -e

# Write the runtime backend URL (from .env, passed as VITE_API_URL) into the
# served config.js so the SPA reads it at load time — no rebuild to change it.
cat > /app/dist/config.js <<EOF
window.__APP_CONFIG__ = { API_URL: "${VITE_API_URL:-}" };
EOF

exec serve -s dist -l 80
