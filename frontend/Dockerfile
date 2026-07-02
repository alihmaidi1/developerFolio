# syntax=docker/dockerfile:1

# Builds the SPA and packages the static assets in a tiny image. Nothing is
# served from a container — the deploy job copies /dist out of this image onto
# the host nginx web root (see .github/workflows/ci-cd.yml).
FROM node:22-alpine AS build
WORKDIR /app

ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build:docker

FROM alpine:3.20 AS runtime
COPY --from=build /app/dist /dist
