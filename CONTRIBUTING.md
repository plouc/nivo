# Contributing

- [requirements](#requirements)
- [setup](#setup)
- [development](#development)
  - [storybook](#storybook)
  - [demo/doc website](#demodoc-website)
  - [testing](#testing)
  - [formatting](#formatting)
  - [linting](#linting)
  - [screenshots](#screenshots)
- [website](#website)
- [deploy](#deploy)

## Requirements

- **Node.js**
- **yarn**
- **Make** (you also have the option to run the commands manually though)

## Setup

Nivo is structured into multiple packages handled by [lerna](https://lerna.js.org/).
In order to install all the required dependencies and to establish links between
the various packages, please execute the following:

```
make init
```

> please note that it will take a while as this project uses a lot of dependencies…

## Development

### Storybook

The easiest way to work on Nivo, is to use our [storybook](https://storybook.js.org/).
The storybook development mode can be started via:

```
make storybook
```

The storybook uses the src code of each package, thus you don't have to build
to see your changes.

### Demo/Doc website

You can also use the demo website while working on components, it might be
useful to see how it behaves with various controls, and might be required to
update the documentation if you change the public API of components.

The packages are automatically linked to the website, so it doesn't use
the version from npm, however if you make some change to the source
of a package, you'll have to rebuild it to see the changes.

To automate this process, you can start a watcher on the package you're working
on, for example if you want to make some change on the `@nivo/bar` package,
you should run `make package-dev-bar` and then start the website `make website`,
this way each change you make will trigger a build and will be (almost :))
immedialty visible on the website.

You can also build the packages without running a watcher, you have two options:

 1. Rebuild all the packages via `make packages-build` or…
 2. Rebuild only a specific package, for example `make package-build-bar` for `@nivo/bar` package

### Testing

To run unit tests on all packages, run the following command:

```
make packages-test
```

If you only made modifications on a specific package,
you can use the scoped form to speed up the process:

```
make package-test-bar
```

where `bar` is the name of the targeted nivo package.

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

### Screenshots

Each package comes with its own README, we use screenshots from the website
in order to illustrate available package components.

The script takes screenshots from the website using config defined in
`conf/base.yaml`, if you added a new package, please update this config accordingly.

To refresh the screenshots, please make sure the website is running on port `3000`,
otherwise run:

```
make website
```

Then run the corresponding script:

```
make packages-screenshots
```

## Website

The website is a CRA based application.

## Deploy

The website is hosted on GitHub pages.
In order to deploy the website (plus storybook), you need to have access
to the nivo github repository.
There's a convenient command to deploy both the website & storybook:

```
make deploy-all
```
