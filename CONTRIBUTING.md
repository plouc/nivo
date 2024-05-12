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

- **Node.js >= 16**
- **pnpm**
- **Make** (you also have the option to run the commands manually though)

## Setup

Nivo is structured into multiple packages thanks to workspaces.
In order to install all the required dependencies and to establish links between
the various packages, please execute the following:

```
make init
```

> please note that it will take a while as this project uses a lot of dependencies…

### Windows

If you want to build this project on Windows, it is recommended to use either WSL 2,
or Git bash + `choco install make`.

## Development

### Storybook

The easiest way to work on Nivo, is to use our [storybook](https://storybook.js.org/).
The storybook development mode can be started via:

```
make storybook
```

Stories are located in a different folder: `storybook/stories/` so you should also
run the package in dev mode:

```
make pkg-dev-bar
```

Where `bar` is the name of the package.

### Demo/Doc website

You can also use the demo website while working on components, it might be
useful to see how it behaves with various controls, and might be required to
update the documentation if you change the public API of components.

The packages are automatically linked to the website, so it doesn't use
the version from npm, however if you make some change to the source
of a package, you'll have to rebuild it to see the changes.

To automate this process, you can start a watcher on the package you're working
on, for example if you want to make some change on the `@nivo/bar` package,
you should run `make pkg-dev-bar` and then start the website `make website`,
this way each change you make will trigger a build and will be (almost :))
immediately visible on the website.

You can also build the packages without running a watcher, you have two options:

 1. Rebuild all the packages via `make pkgs-build` or…
 2. Rebuild only a specific package, for example `make pkg-build-bar` for `@nivo/bar` package

### Testing

#### Unit tests

Unit tests for each package are located in the `packages/<pkg>/tests` folder, we're using jest
as a test running and `react-test-renderer` as a testing library, some tests are still using
`enzyme`, but this lib is not maintained anymore and doesn't support newer versions of React,
so those should eventually be migrated.

To run unit tests on all packages, run the following command:

```
make pkgs-test
```

If you only made modifications on a specific package,
you can use the scoped form to speed up the process:

```
make pkg-test-bar
```

where `bar` is the name of the targeted nivo package.

#### End-to-end tests

Sometimes it's difficult to test certain things in unit tests, from our experience, animations
and interactions can be tricky to test via unit tests only, so we also try to have end-to-end tests.

We're using `cypress` for writing such tests, and those are located in the `cypress/src/components`
folder, as we introduced end-to-end tests later, not all packages have some.

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
make pkgs-lint
```

If you only made modifications on a specific package,
you can use the scoped form to speed up the process:

```
make pkg-lint-bar
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
make pkgs-screenshots
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
