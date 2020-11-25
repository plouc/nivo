MAKEFLAGS += --no-print-directory

SOURCES = packages

.PHONY: help bootstrap init packages-build packages-publish clean-all website-install website website-build website-deploy storybook storybook-build storybook-deploy deploy-all examples-install

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

bootstrap: ##@0 global lerna bootstrap
	@./node_modules/.bin/lerna bootstrap

init: ##@0 global cleanup/install/bootstrap
	@$(MAKE) clean-all
	@yarn install
	@$(MAKE) bootstrap
	@$(MAKE) packages-build

fmt: ##@0 global format code using prettier (js, css, md)
	@./node_modules/.bin/prettier --color --write \
		"packages/*/{src,stories,tests}/**/*.{js,ts,tsx}" \
		"packages/*/index.d.ts" \
		"packages/*/README.md" \
		"website/src/**/*.{js,css}" \
		"examples/*/src/**/*.{js,ts,tsx,css}" \
		"api/**/*.{js,ts,tsx}" \
		"README.md"

fmt-check: ##@0 global check if files were all formatted using prettier
	@echo "${YELLOW}Checking formatting${RESET}"
	@./node_modules/.bin/prettier --color --list-different \
        "packages/*/{src,stories,tests}/**/*.{js,ts,tsx}" \
        "packages/*/index.d.ts" \
        "packages/*/README.md" \
        "website/src/**/*.{js,css}" \
        "examples/*/src/**/*.{js,ts,tsx,css}" \
		"api/**/*.{js,ts,tsx}" \
        "README.md"

test: ##@0 global run all checks/tests (packages, website & examples)
	@$(MAKE) fmt-check
	@$(MAKE) lint
	@$(MAKE) packages-test

deploy-all: ##@0 global deploy website & storybook
	@$(MAKE) website-deploy
	@$(MAKE) storybook-deploy

clean-all: ##@0 global uninstall node modules, remove transpiled code & lock files
	@rm -rf node_modules
	@rm -rf package-lock.json
	@$(foreach source, $(SOURCES), $(call clean-source-all, $(source)))
	@rm -rf website/node_modules
	@rm -rf website/package-lock.json

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

lint: ##@0 run eslint & tslint
	@$(MAKE) packages-lint
	@$(MAKE) packages-tslint

########################################################################################################################
#
# PACKAGES
#
########################################################################################################################

package-lint-%: ##@1 packages run eslint on package
	@echo "${YELLOW}Running eslint on package ${WHITE}@nivo/${*}${RESET}"
	@./node_modules/.bin/eslint ./packages/${*}/{src,tests}

packages-lint: ##@1 packages run eslint on all packages
	@echo "${YELLOW}Running eslint on all packages${RESET}"
	@./node_modules/.bin/eslint "./packages/*/{src,tests}/**/*.{js,ts,tsx}"

package-test-cover-%: ##@1 packages run tests for a package with code coverage
	@yarn jest -c ./packages/jest.config.js --rootDir . --coverage ./packages/${*}/tests

package-test-%: ##@1 packages run tests for a package
	@yarn jest -c ./packages/jest.config.js --rootDir . ./packages/${*}/tests

package-update-test-%: ##@1 packages run tests for a package and update its snapshots
	@yarn jest -c ./packages/jest.config.js --rootDir . ./packages/${*}/tests -u

package-watch-test-%: ##@1 packages run tests for a package and watch for changes
	@yarn jest -c ./packages/jest.config.js --rootDir . ./packages/${*}/tests --watch

packages-test: ##@1 packages run tests for all packages
	@echo "${YELLOW}Running test suites for all packages${RESET}"
	@yarn jest -c ./packages/jest.config.js --rootDir . ./packages/*/tests

packages-watch-test: ##@1 packages run tests for all packages and watch for changes
	@echo "${YELLOW}Running test suites for all packages${RESET}"
	@yarn jest -c ./packages/jest.config.js --rootDir . ./packages/*/tests --watch

packages-test-cover: ##@1 packages run tests for all packages with code coverage
	@echo "${YELLOW}Running test suites for all packages${RESET}"
	@yarn jest -c ./packages/jest.config.js --rootDir . --coverage ./packages/*/tests

packages-types: ##@1 packages build all package types
	@echo "${YELLOW}Building TypeScript types for all packages${RESET}"
	@yarn tsc -b ./tsconfig.monorepo.json

packages-build: packages-types ##@1 packages build all packages
	@echo "${YELLOW}Building all packages${RESET}"
	@find ./packages -type d -maxdepth 1 ! -path ./packages \
        | sed 's|^./packages/||' \
        | xargs -I '{}' sh -c '$(MAKE) package-build-{}'

package-types-%: ##@1 packages build a package types
	@if [ -f "./packages/${*}/tsconfig.json" ]; \
    then \
        echo "${YELLOW}Building TypeScript types for package ${WHITE}@nivo/${*}${RESET}"; \
        rm -rf ./packages/${*}/dist/types; \
        rm -rf ./packages/${*}/dist/tsconfig.tsbuildinfo; \
        yarn tsc -b ./packages/${*}; \
    else \
        echo "${YELLOW}Package ${WHITE}@nivo/${*}${RESET}${YELLOW} does not have tsconfig, skipping"; \
    fi;

package-build-%: package-types-% ##@1 packages build a package
	@echo "${YELLOW}Building package ${WHITE}@nivo/${*}${RESET}"
	@-rm -rf ./packages/${*}/dist/nivo-${*}*
	@export PACKAGE=${*}; NODE_ENV=production BABEL_ENV=production ./node_modules/.bin/rollup -c conf/rollup.config.js

packages-screenshots: ##@1 packages generate screenshots for packages readme (website dev server must be running)
	@node scripts/capture.js

packages-publish: ##@1 packages publish all packages
	@$(MAKE) packages-build

	@echo "${YELLOW}Publishing packages${RESET}"
	@./node_modules/.bin/lerna publish --exact

packages-publish-next: ##@1 packages publish all packages for @next npm tag
	@$(MAKE) packages-build

	@echo "${YELLOW}Publishing packages${RESET}"
	@./node_modules/.bin/lerna publish --exact --npm-tag=next

package-watch-%: ##@1 packages build package (es flavor) on change, eg. `package-watch-bar`
	@echo "${YELLOW}Running build watcher for package ${WHITE}@nivo/${*}${RESET}"
	@rm -rf ./packages/${*}/cjs
	@rm -rf ./packages/${*}/umd
	@export PACKAGE=${*}; NODE_ENV=development BABEL_ENV=development ./node_modules/.bin/rollup -c conf/rollup.config.js -w

package-dev-%: ##@1 packages setup package for development, link to website, run watcher
	@echo "${YELLOW}Preparing package ${WHITE}${*}${YELLOW} for development${RESET}"
	@cd packages/${*} && yarn link
	@cd examples/typescript && yarn link @nivo/${*}
	@$(MAKE) package-watch-${*}

########################################################################################################################
#
# WEBSITE
#
########################################################################################################################

website-deps-up: ##@2 website interactive upgrade of website's dependencies
	@yarn upgrade-interactive --latest

website: ##@2 website start website in dev mode
	@echo "${YELLOW}Starting website dev server${RESET}"
	@cd website && yarn start

website-build: ##@2 website build website
	@echo "${YELLOW}Building website${RESET}"
	@node scripts/patch-react-spring.js
	@cd website && yarn build

website-serve: ##@2 website build & serve website
	@$(MAKE) website-build
	@cd website && yarn serve

website-deploy: ##@2 website build & deploy website
	@$(MAKE) website-build

	@echo "${YELLOW}Deploying website${RESET}"
	@./node_modules/.bin/gh-pages -d website/public -r git@github.com:plouc/nivo.git -b gh-pages

website-audit: ##@2 website audit website build
	@cd website && yarn analyze

website-sprites: ##@2 website build sprite sheet
	@glue --img website/src/assets --css website/src/styles website/src/assets/icons

########################################################################################################################
#
# STORYBOOK
#
########################################################################################################################

storybook: ##@3 storybook start storybook in dev mode on port 6006
	@yarn start-storybook -p 6006

storybook-build: ##@3 storybook build storybook
	@echo "${YELLOW}Building storybook${RESET}"
	@yarn build-storybook

storybook-deploy: ##@3 storybook build and deploy storybook
	@$(MAKE) storybook-build

	@echo "${YELLOW}Deploying storybook${RESET}"
	@./node_modules/.bin/gh-pages -d storybook-static -r git@github.com:plouc/nivo.git -b gh-pages -e storybook

########################################################################################################################
#
# EXAMPLES
#
########################################################################################################################

examples-install: ##@4 examples install all examples dependencies
	@$(MAKE) example-install-retro
	@$(MAKE) example-install-typescript

example-install-%: ##@4 examples install example dependencies, eg. example-install-retro
	@echo "${YELLOW}Installing ${WHITE}${*}${YELLOW} example dependencies${RESET}"
	@cd examples/${*} && yarn install

example-deps-up-%: ##@4 examples interactive upgrade of example's dependencies
	@cd examples/${*} && yarn upgrade-interactive --latest

example-start-%: ##@4 examples start example in dev mode, eg. example-start-retro
	@echo "${YELLOW}Starting ${WHITE}${*}${YELLOW} example dev server${RESET}"
	@cd examples/${*} && yarn start

examples-build: ##@4 examples build all examples
	@$(MAKE) example-build-retro
	@$(MAKE) example-build-typescript

example-build-%: ##@4 examples build an example, eg. example-build-retro
	@echo "${YELLOW}Building ${WHITE}${*}${YELLOW} example${RESET}"
	@cd examples/${*} && yarn build

########################################################################################################################
#
# API
#
########################################################################################################################

api-dev: ##@5 API run API in dev mode (watcher)
	@echo "${YELLOW}Starting API in dev mode${RESET}"
	@cd api && yarn dev

api: ##@5 API run API in regular mode (no watcher)
	@echo "${YELLOW}Starting API${RESET}"
	@cd api && yarn start

api-deploy: ##@5 Deploy API on heroku
	git subtree push --prefix api heroku master
