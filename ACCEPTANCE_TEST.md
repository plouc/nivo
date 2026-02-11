# Acceptance Test Plan (Docker Compose)

This plan verifies a containerized Nivo website build with a co-located Storybook at `/storybook/`.

## Preconditions

- Docker is running.
- You are in the repo root.

## A. Website + Storybook (No Render API)

Bring up the website-only stack:

```bash
docker compose -f deploy/compose.website.yml up -d --build
```

Smoke checks:

```bash
curl -sS -I http://localhost:8080/ | tr -d '\r'
curl -sS -I http://localhost:8080/storybook/ | tr -d '\r'
curl -sS -I http://localhost:8080/storybook/sb-manager/runtime.js | tr -d '\r'
```

Expect:

- `/` returns `200` and `Cache-Control: public, max-age=1800`
- `/storybook/` returns `200`
- Storybook hashed assets return `Cache-Control: public, max-age=31536000, immutable`

Bring it down:

```bash
docker compose -f deploy/compose.website.yml down --remove-orphans
```

## Optional: Render API

The website includes `/<chart>/api/` pages that POST chart props to a render API.

This repo historically used `https://nivo-api.herokuapp.com/nivo` for that, but if you want those pages to work without relying on an external service, the render API needs to be self-hosted and proxied under the same origin (e.g. at `/nivo/`).
