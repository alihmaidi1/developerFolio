# Production Setup

## Environment

Copy the example file and replace every secret before running production:

```bash
cp .env.example .env
```

Required secret values:

- `DATABASE_CONNECTION_STRING`
- `JWT_KEY`
- `ADMIN_SEED_PASSWORD`

Use a real HTTPS origin for `PUBLIC_APP_URL` in production.
The PostgreSQL server is expected to already exist. Set
`DATABASE_CONNECTION_STRING` to a host that the `api` container can reach. If
PostgreSQL is another Docker container, place both containers on a shared Docker
network or use a reachable host/IP in the connection string.

If the server already has Nginx installed, keep `WEB_BIND_ADDRESS=127.0.0.1` so
the Docker web container is reachable only from the host machine. The host Nginx
should be the public entry point for the domain and TLS.

Docker Compose gives shell environment variables higher priority than `.env`.
If a value looks unexpected, check your active terminal environment first.

## Docker Compose

Build and start the stack:

```bash
docker compose up -d --build
```

Services:

- `web`: containerized static frontend on `WEB_BIND_ADDRESS:WEB_PUBLIC_PORT`
- `api`: ASP.NET Core API, internal port `8080`

The frontend uses `VITE_API_URL=/api`, and Nginx proxies `/api/*` to the API container.

## Host Nginx

Use the existing host-level Nginx as a reverse proxy to the Docker web service:

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

After enabling HTTPS on the host Nginx, set `PUBLIC_APP_URL` to the HTTPS domain.

## Health Checks

- Frontend container through host loopback: `http://127.0.0.1:${WEB_PUBLIC_PORT}/healthz`
- API through frontend proxy: `http://127.0.0.1:${WEB_PUBLIC_PORT}/health`

## CI/CD

GitHub Actions runs:

- frontend install, format check, lint, and build
- backend restore, build, and tests
- Docker image build verification
- GHCR image publish on pushes to `main`

Images are published as:

- `ghcr.io/<repository-owner>/developerfolio-api:latest`
- `ghcr.io/<repository-owner>/developerfolio-web:latest`
