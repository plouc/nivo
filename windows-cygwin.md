# Building with Cygwin


1 - install Cygwin
2 - run shell from the project root folder
3 - set path so that `find` is Cygwin's find utility not Windows'
    `PATH="/usr/local/bin:/usr/bin${PATH:+:${PATH}}"`
4 - install with `pnpm install`
5 - make with `make pkgs-build`
6 - if it complains about babel packages then install them manually

To trigger a new version on Azure pipelines, use `lerna version patch`, which will create a patch version and push to origin. This will trigger a new build on Azure pipelines.
