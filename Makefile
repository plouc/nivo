MAKEFLAGS += --no-print-directory

SOURCES = packages

.PHONY: help bootstrap init pkgs-build pkgs-publish clean-all website-install website website-build website-deploy storybook storybook-build storybook-deploy deploy-all

########################################################################################################################
#
# HELP
#
########################################################################################################################

# COLORS
RED    = $(shell printf "\33[31m")
GREEN  = $(shell printf "\33[32m")
WHITE  = $(shell printf "\33[37m")
YELLOW = $(shell printf "\33[33m")
RESET  = $(shell printf "\33[0m")

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
# A category can be added with @category
HELP_HELPER = \
    %help; \
    while(<>) { push @{$$help{$$2 // 'options'}}, [$$1, $$3] if /^([a-zA-Z\-\%]+)\s*:.*\#\#(?:@([0-9]+\s[a-zA-Z\-\%_]+))?\s(.*)$$/ }; \
    print "usage: make [target]\n\n"; \
    for (sort keys %help) { \
    print "${WHITE}$$_:${RESET}\n"; \
    for (@{$$help{$$_}}) { \
    $$sep = " " x (32 - length $$_->[0]); \
    print "  ${YELLOW}$$_->[0]${RESET}$$sep${GREEN}$$_->[1]${RESET}\n"; \
    }; \
    print "\n"; }

help: ##prints help
	@perl -e '$(HELP_HELPER)' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

########################################################################################################################
#
# GLOBAL
#
########################################################################################################################

install: ##@0 global install
	@pnpm install

init: ##@0 global cleanup/install/bootstrap
	@$(MAKE) clean-all
	@$(MAKE) install
	@$(MAKE) pkgs-build

fmt: ##@0 global format code using prettier (js, css, md)
	@pnpm prettier --color --write \
		"packages/*/{src,tests}/**/*.{js,ts,tsx}" \
		"packages/*/index.d.ts" \
		"packages/*/README.md" \
		"website/src/**/*.{js,ts,tsx,css}" \
		"api/**/*.{js,ts,tsx}" \
		"storybook/.storybook/*.{js,ts,tsx}" \
		"storybook/stories/**/*.{js,ts,tsx}" \
		"README.md"

fmt-check: ##@0 global check if files were all formatted using prettier
	@echo "${YELLOW}Checking formatting${RESET}"
	@pnpm prettier --color --list-different \
        "packages/*/{src,tests}/**/*.{js,ts,tsx}" \
        "packages/*/index.d.ts" \
        "packages/*/README.md" \
        "website/src/**/*.{js,ts,tsx,css}" \
		"api/**/*.{js,ts,tsx}" \
		"storybook/.storybook/*.{js,ts,tsx}" \
		"storybook/stories/**/*.{js,ts,tsx}" \
        "README.md"

test: ##@0 global run all checks/tests (packages, website)
	@$(MAKE) fmt-check
	@$(MAKE) lint
	@$(MAKE) pkgs-test

deploy-all: ##@0 global deploy website & storybook
	@$(MAKE) website-deploy
	@$(MAKE) storybook-deploy

netlify-build: ##@0 Build the website and storybook to netlify
	@$(MAKE) init
	@$(MAKE) website-build
	@$(MAKE) website-build
	@cp -a storybook-static website/public/storybook

clean-all: ##@0 global uninstall node modules, remove transpiled code & lock files
	@rm -rf node_modules
	@rm -rf package-lock.json
	@$(foreach source, $(SOURCES), $(call clean-source-all, $(source)))
	@rm -rf website/node_modules
	@rm -rf website/package-lock.json
	@rm -rf api/node_modules
	@rm -rf api/package-lock.json

define clean-source-lib
	rm -rf $(1)/*/cjs
	rm -rf $(1)/*/umd
endef

define clean-source-all
	rm -rf $(1)/*/cjs
	rm -rf $(1)/*/umd
	rm -rf $(1)/*/node_modules
	rm -rf $(1)/*/package-lock.json
endef

########################################################################################################################
#
# PACKAGES
#
########################################################################################################################

pkg-lint-%: ##@1 packages run eslint on package
	@echo "${YELLOW}Running eslint on package ${WHITE}@nivo/${*}${RESET}"
	@pnpm eslint ./packages/${*}/{src,tests}/**/*.{js,ts,tsx}

pkgs-lint: ##@1 packages run eslint on all packages
	@echo "${YELLOW}Running eslint on all packages${RESET}"
	@pnpm eslint "./packages/*/{src,tests}/**/*.{js,ts,tsx}"

pkgs-lint-fix: ##@1 packages run eslint on all packages with a fix option
	@echo "${YELLOW}Running eslint on all packages${RESET}"
	@pnpm eslint "./packages/*/{src,tests}/**/*.{js,ts,tsx}" --fix

pkg-test-cover-%: ##@1 packages run tests for a package with code coverage
	@export BABEL_ENV=development; pnpm jest -c ./packages/jest.config.js --rootDir . --coverage ./packages/${*}/tests

pkg-test-%: ##@1 packages run tests for a package
	@export BABEL_ENV=development; pnpm jest -c ./packages/jest.config.js --rootDir . ./packages/${*}/tests

pkg-watch-test-%: ##@1 packages run tests for a package and watch for changes
	@export BABEL_ENV=development; pnpm jest -c ./packages/jest.config.js --rootDir . ./packages/${*}/tests --watch

pkg-update-test-%: ##@1 packages run tests for a package and update its snapshots
	@export BABEL_ENV=development; pnpm jest -c ./packages/jest.config.js --rootDir . ./packages/${*}/tests -u

pkg-watch-test-%: ##@1 packages run tests for a package and watch for changes
	@export BABEL_ENV=development; pnpm jest -c ./packages/jest.config.js --rootDir . ./packages/${*}/tests --watch

pkgs-test: ##@1 packages run tests for all packages
	@echo "${YELLOW}Running test suites for all packages${RESET}"
	@export BABEL_ENV=development; pnpm jest -c ./packages/jest.config.js --rootDir . ./packages/*/tests

pkgs-watch-test: ##@1 packages run tests for all packages and watch for changes
	@echo "${YELLOW}Running test suites watcher for all packages${RESET}"
	@export BABEL_ENV=development; pnpm jest -c ./packages/jest.config.js --rootDir . ./packages/*/tests --watch

pkgs-test-cover: ##@1 packages run tests for all packages with code coverage
	@echo "${YELLOW}Running test suites coverage for all packages${RESET}"
	@export BABEL_ENV=development; pnpm jest -c ./packages/jest.config.js --rootDir . --coverage ./packages/*/tests

pkgs-types: ##@1 packages build all package types
	@echo "${YELLOW}Building TypeScript types for all packages${RESET}"
	@pnpm tsc -b ./tsconfig.monorepo.json

pkgs-build: pkgs-types ##@1 packages build all packages
	@echo "${YELLOW}Building all packages${RESET}"
	@# Using exit code 255 in case of error as it'll make xargs stop immediately.
	@find ./packages -type d -maxdepth 1 ! -path ./packages \
        | sed 's|^./packages/||' \
        | xargs -I '{}' sh -c '$(MAKE) pkg-build-{} || exit 255'

pkg-types-%: ##@1 packages build a package types
	@if [ -f "./packages/${*}/tsconfig.json" ]; \
    then \
        echo "${YELLOW}Building TypeScript types for package ${WHITE}@nivo/${*}${RESET}"; \
        rm -rf ./packages/${*}/dist/types; \
        rm -rf ./packages/${*}/dist/tsconfig.tsbuildinfo; \
        pnpm tsc -b ./packages/${*}; \
    else \
        echo "${YELLOW}Package ${WHITE}@nivo/${*}${RESET}${YELLOW} does not have tsconfig, skipping"; \
    fi;

pkg-build-%: pkg-types-% ##@1 packages build a package
	@echo "${YELLOW}Building package ${WHITE}@nivo/${*}${RESET}"
	@-rm -rf ./packages/${*}/dist/nivo-${*}*
	@export PACKAGE=${*}; NODE_ENV=production BABEL_ENV=production ./node_modules/.bin/rollup -c conf/rollup.config.mjs

pkgs-screenshots: ##@1 packages generate screenshots for packages readme (website dev server must be running)
	@node scripts/capture.js

pkgs-publish: ##@1 packages publish all packages
	@$(MAKE) pkgs-build

	@echo "${YELLOW}Publishing packages${RESET}"
	@pnpm lerna publish --exact

pkgs-publish-next: ##@1 packages publish all packages for @next npm tag
	@$(MAKE) pkgs-build

	@echo "${YELLOW}Publishing packages${RESET}"
	@pnpm lerna publish --exact --npm-tag=next

pkg-dev-%: ##@1 packages build package (es flavor) on change, eg. `package-watch-bar`
	@echo "${YELLOW}Running build watcher for package ${WHITE}@nivo/${*}${RESET}"
	@rm -rf ./packages/${*}/cjs
	@export PACKAGE=${*}; NODE_ENV=development BABEL_ENV=development ./node_modules/.bin/rollup -c conf/rollup.config.mjs -w

########################################################################################################################
#
# WEBSITE
#
########################################################################################################################

website-deps-up: ##@2 website interactive upgrade of website's dependencies
	@pnpm upgrade-interactive --latest

website: ##@2 website start website in dev mode
	@echo "${YELLOW}Starting website dev server${RESET}"
	@cd website && pnpm start

website-build: ##@2 website build website
	@echo "${YELLOW}Building website${RESET}"
	@-rm -rf website/.cache
	@cd website && pnpm build

website-serve: ##@2 website build & serve website
	@$(MAKE) website-build
	@cd website && pnpm serve

website-deploy: ##@2 website build & deploy website
	@$(MAKE) website-build

	@echo "${YELLOW}Deploying website${RESET}"
	@pnpm gh-pages -d website/public -r git@github.com:plouc/nivo.git -b gh-pages

website-audit: ##@2 website audit website build
	@cd website && pnpm analyze

website-lint: ##@2 website run eslint on the website code
	@pnpm eslint ./website/src

website-sprites: ##@2 website build sprite sheet
	@glue --img website/src/assets --css website/src/styles website/src/assets/icons

########################################################################################################################
#
# STORYBOOK
#
########################################################################################################################

storybook: ##@3 storybook start storybook in dev mode on port 6006
	@pnpm --filter storybook dev

storybook-build: ##@3 storybook build storybook
	@echo "${YELLOW}Building storybook${RESET}"
	@pnpm --filter storybook build

storybook-deploy: ##@3 storybook build and deploy storybook
	@$(MAKE) storybook-build

	@echo "${YELLOW}Deploying storybook${RESET}"
	@pnpm gh-pages -d storybook-static -r git@github.com:plouc/nivo.git -b gh-pages -e storybook

########################################################################################################################
#
# API
#
########################################################################################################################

api-dev: ##@5 API run API in dev mode (watcher)
	@echo "${YELLOW}Starting API in dev mode${RESET}"
	@cd api && pnpm dev

api: ##@5 API run API in regular mode (no watcher)
	@echo "${YELLOW}Starting API${RESET}"
	@cd api && pnpm start

api-lint: ##@5 API run eslint on the API code
	@pnpm eslint ./api/src

api-deploy: ##@5 Deploy API on heroku
	git subtree push --prefix api heroku master
