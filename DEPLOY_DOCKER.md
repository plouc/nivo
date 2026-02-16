# Docker Deployment (Website + Storybook, Optional Render API)

This repo includes Dockerfiles and docker-compose examples to build and serve:

- the Nivo website (Gatsby static build)
- Storybook at `/storybook/`
 - optionally, a self-hosted render API proxied under `/nivo/` for the `/<chart>/api/` pages

## Website + Storybook

```bash
docker compose -f deploy/compose.website.yml up -d --build
```

Open:

- Website: `http://localhost:8080/`
- Storybook: `http://localhost:8080/storybook/`

## Website + Storybook + Render API

```bash
docker compose -f deploy/compose.website-api.yml up -d --build
```

This stack reverse-proxies the API under the same origin:

- `POST http://localhost:8080/nivo/charts/<type>`
- `GET  http://localhost:8080/nivo/r/<id>`

## Notes

- Gatsby inlines `GATSBY_*` variables at build time.
- `SITE_URL` is also a build-time value used by Gatsby.
