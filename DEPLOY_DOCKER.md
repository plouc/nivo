# Docker Deployment (Website + Storybook, Optional Render API)

This repo includes Dockerfiles and docker-compose examples to build and serve:

- the Nivo website (Gatsby static build)
- Storybook at `/storybook/`

## Website + Storybook

```bash
docker compose -f deploy/compose.website.yml up -d --build
```

Open:

- Website: `http://localhost:8080/`
- Storybook: `http://localhost:8080/storybook/`

## Notes

- Gatsby inlines `GATSBY_*` variables at build time.
- `SITE_URL` is also a build-time value used by Gatsby.
