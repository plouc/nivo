# Contributing

## Setup
Nivo is structured into multiple packages handled by [lerna](https://lernajs.io/). In order to install all the
required dependencies and to establish links between the various packages, please execute the following:

```
make init
```

## Development Mode
The easiest way to work on Nivo, is to use our [storybook](https://storybook.js.org/). The storybook development mode
can be started via:

```
make storybook
```

Once you have made changes to the packages, you will need to rebuild the respective package. In this case, you have two
options:

 1. Rebuild all the packages via `make packages-build` or…
 2. Rebuild only a specific package via, e.g. for the package `bar`, `PACKAGE=bar make package-build-bar`.
