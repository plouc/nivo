# nivo-api

Rendering API for [nivo](https://github.com/plouc/nivo) dataviz React/d3 components.

A [demo](https://nivo-api.herokuapp.com/) is available on heroku, but may not respond depending on usage.

## How it works

The API expose some of the [nivo](https://github.com/plouc/nivo) charts by using
[React server side environment](https://facebook.github.io/react/docs/environments.html).

First you will have to make a post request on the desired endpoint, for example:

```sh
curl -X POST \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  -d '{ "width": 500, "height": 500, "data": [[223, 299, 345, 184], [123, 248, 65, 123], [412, 76, 187, 312], [97, 37, 502, 176]]}' \
  'http://localhost:3030/charts/chord'

{
  "id": "73633fea-160e-4118-a534-377c3ed85254",
  "url": "http://localhost:3000/r/73633fea-160e-4118-a534-377c3ed85254"
}
```

The response contains a link to the chart

```
GET http://localhost:3000/r/73633fea-160e-4118-a534-377c3ed85254
```

## Charts endpoints

```
POST /charts/bar
POST /charts/bubble
POST /charts/calendar
POST /charts/chord
POST /charts/line
POST /charts/pie
POST /charts/radar
POST /charts/sankey
POST /charts/sunburst
POST /charts/treemap
```

## Charts samples

- https://nivo-api.herokuapp.com/samples/line.svg
- https://nivo-api.herokuapp.com/samples/bar.svg
- https://nivo-api.herokuapp.com/samples/bubble.svg
- https://nivo-api.herokuapp.com/samples/chord.svg
- https://nivo-api.herokuapp.com/samples/pie.svg
- https://nivo-api.herokuapp.com/samples/radar.svg
- https://nivo-api.herokuapp.com/samples/sankey.svg
- https://nivo-api.herokuapp.com/samples/sunburst.svg
- https://nivo-api.herokuapp.com/samples/treemap.svg

## Repositories

- [nivo](https://github.com/plouc/nivo) - the nivo library
- [nivo-api](https://github.com/plouc/nivo-api) - the nivo http api
- [nivo-api-docker](https://github.com/plouc/nivo-api-docker) - a Docker image for the nivo http api
- [nivo-generators](https://github.com/plouc/nivo-generators) - the data generators used for nivo-website and http API samples
- [nivo-website](https://github.com/plouc/nivo-website) - the source for the nivo website
