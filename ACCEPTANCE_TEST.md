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

Bring up the website+api stack:

```bash
docker compose -f deploy/compose.website-api.yml up -d --build
```

Render flow (POST -> url -> GET svg):

```bash
cat > /tmp/nivo_bar_payload.json <<'JSON'
{
  "width": 1200,
  "height": 500,
  "margin": { "top": 40, "right": 50, "bottom": 40, "left": 50 },
  "data": "[\n  {\n    \"country\": \"AD\",\n    \"hot dog\": 47,\n    \"burger\": 27,\n    \"sandwich\": 113,\n    \"kebab\": 75,\n    \"fries\": 59,\n    \"donut\": 168\n  }\n]",
  "keys": ["hot dog", "burger", "sandwich", "kebab", "fries", "donut"],
  "indexBy": "country",
  "colors": { "scheme": "nivo" },
  "colorBy": "id",
  "borderRadius": 0,
  "borderWidth": 0,
  "borderColor": { "from": "color", "modifiers": [["darker", 1.6]] },
  "padding": 0.2,
  "innerPadding": 0,
  "groupMode": "stacked",
  "layout": "vertical",
  "valueScale": { "type": "linear", "nice": true, "round": false },
  "indexScale": { "type": "band", "round": false },
  "axisTop": null,
  "axisRight": null,
  "axisBottom": { "legend": "country", "legendOffset": 36 },
  "axisLeft": { "legend": "food", "legendOffset": -40 },
  "enableGridX": false,
  "enableGridY": true,
  "enableLabel": true,
  "enableTotals": false,
  "totalsOffset": 10,
  "labelSkipWidth": 12,
  "labelSkipHeight": 12,
  "labelTextColor": { "from": "color", "modifiers": [["darker", 1.6]] },
  "labelPosition": "middle",
  "labelOffset": 0
}
JSON

curl -sS -o /tmp/nivo_post.json -X POST http://localhost:8080/nivo/charts/bar \
  -H 'Content-Type: application/json' -H 'Accept: application/json' \
  --data-binary @/tmp/nivo_bar_payload.json

cat /tmp/nivo_post.json

url="$(node -e 'const fs=require(\"fs\"); console.log(JSON.parse(fs.readFileSync(\"/tmp/nivo_post.json\",\"utf8\")).url)')"
curl -sS -I "$url" | tr -d '\r'
```

Bring it down:

```bash
docker compose -f deploy/compose.website-api.yml down --remove-orphans
```
