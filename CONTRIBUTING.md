# Contributing

- [setup](#setup)
- [development](#development)
  - [formatting](#formatting)
  - [linting](#linting)
- [deploy](#deploy)

## Setup

Nivo is structured into multiple packages handled by [lerna](https://lernajs.io/).
In order to install all the required dependencies and to establish links between
the various packages, please execute the following:

```
# please note that it can take a while as the repository contains a lot of packages
make init
```

## Development

The easiest way to work on Nivo, is to use our [storybook](https://storybook.js.org/).
The storybook development mode can be started via:

```
make storybook
```

Once you have made changes to the packages, you will need to rebuild the respective package.
In this case, you have two options:

 1. Rebuild all the packages via `make packages-build` or…
 2. Rebuild only a specific package via, e.g. for the package `bar`, `PACKAGE=bar make package-build-bar`.

### Formatting

Nivo uses prettier in order to provide a consistent code style.
If you made some modification to the existing code base, please run the formatting
command before submitting your modifications:

```
make fmt
```

### Linting

Nivo code base also uses eslint to enforce consistent code style.
eslint is only enabled on packages for now, if you want to run eslint
against all packages, please run:

```
make packages-lint
```

If you only made modifications on a specific package,
you can use the scoped form to speed up the process:

```
make package-lint-bar
```

where `bar` is the name of the targeted nivo package.

## Deploy

The website is hosted on GitHub pages.
In order to deploy the website (plus storybook), you need to have access
to the nivo github repository.
There's a convenient command to deploy both the website & storybook:

```
make deploy-all
```
