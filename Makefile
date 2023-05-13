MAKEFLAGS += --no-print-directory

SOURCES = packages

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

.PHONY: help
help: ##prints help
	@perl -e '$(HELP_HELPER)' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

########################################################################################################################
#
# 0. GLOBAL
#
########################################################################################################################

.PHONY: install
install: ##@0 global install
	@pnpm install

.PHONY: init
init: ##@0 global cleanup/install/bootstrap
	@$(MAKE) clean-all
	@$(MAKE) install
	@$(MAKE) pkgs-build

.PHONY: fmt
fmt: ##@0 global format code using prettier (js, css, md)
	@pnpm prettier --color --write \
		"packages/*/{src,tests}/**/*.{js,ts,tsx}" \
		"packages/*/index.d.ts" \
		"packages/*/README.md" \
		"website/src/**/*.{js,ts,tsx,css}" \
		"api/**/*.{js,ts,tsx}" \
		"storybook/.storybook/*.{js,ts,tsx}" \
		"storybook/stories/**/*.{js,ts,tsx}" \
		"cypress/src/**/*.{js,ts,tsx}" \
		"README.md"

.PHONY: fmt-check
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
		"cypress/src/**/*.{js,ts,tsx}" \
        "README.md"

.PHONY: test
test: ##@0 global run all checks/tests (packages, website)
	@$(MAKE) fmt-check
	@$(MAKE) lint
	@$(MAKE) pkgs-test

.PHONY: vercel-build
vercel-build: ##@0 global Build the website and storybook to vercel
	@echo "${YELLOW}Building the website and storybook${RESET}"
	$(MAKE) website-build
	$(MAKE) storybook-build
	@cp -a storybook/storybook-static website/public/storybook

.PHONY: clean-all
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
endef

define clean-source-all
	rm -rf $(1)/*/cjs
	rm -rf $(1)/*/node_modules
	rm -rf $(1)/*/package-lock.json
endef


########################################################################################################################
#
# 1. PACKAGES
#
########################################################################################################################

pkg-lint-%: ##@1 packages run eslint on package
	@echo "${YELLOW}Running eslint on package ${WHITE}@nivo/${*}${RESET}"
	@pnpm eslint ./packages/${*}/{src,tests}/**/*.{js,ts,tsx}

.PHONY: pkgs-lint
pkgs-lint: ##@1 packages run eslint on all packages
	@echo "${YELLOW}Running eslint on all packages${RESET}"
	@pnpm eslint "./packages/*/{src,tests}/**/*.{js,ts,tsx}"

.PHONY: pkgs-lint-fix
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

.PHONY: pkgs-test
pkgs-test: ##@1 packages run tests for all packages
	@echo "${YELLOW}Running test suites for all packages${RESET}"
	@export BABEL_ENV=development; pnpm jest -c ./packages/jest.config.js --workerThreads --rootDir . ./packages/*/tests

.PHONY: pkgs-watch-test
pkgs-watch-test: ##@1 packages run tests for all packages and watch for changes
	@echo "${YELLOW}Running test suites watcher for all packages${RESET}"
	@export BABEL_ENV=development; pnpm jest -c ./packages/jest.config.js --rootDir . ./packages/*/tests --watch

.PHONY: pkgs-test-cover
pkgs-test-cover: ##@1 packages run tests for all packages with code coverage
	@echo "${YELLOW}Running test suites coverage for all packages${RESET}"
	@export BABEL_ENV=development; pnpm jest -c ./packages/jest.config.js --rootDir . --coverage ./packages/*/tests

.PHONY: pkgs-build
pkgs-build: pkgs-types ##@1 packages build all packages
	@# Using exit code 255 in case of error as it'll make xargs stop immediately.
	@# Skipping type generation as it's already done via `pkgs-types` in one go.
	@export SKIP_TYPES=TRUE; find ./packages -type d -maxdepth 1 ! -path ./packages \
        | sed 's|^./packages/||' \
        | xargs -P 8 -I '{}' sh -c '$(MAKE) pkg-build-{} || exit 255'
	@echo "${GREEN}Packages built${RESET}"

.PHONY: pkgs-types
pkgs-types: ##@1 packages build all package types
	@pnpm tsc --build ./tsconfig.monorepo.json

.PHONY: pkgs-types-clean
pkgs-types-clean: ##@1 packages clean all package types
	@pnpm tsc --build --clean ./tsconfig.monorepo.json

pkg-types-%: ##@1 packages generate types for a specific package
	@if [ "$${SKIP_TYPES}" != "TRUE" ]; \
    then \
        if [ -f "./packages/${*}/tsconfig.json" ]; \
		then \
			echo "${YELLOW}Building TypeScript types for package ${WHITE}@nivo/${*}${RESET}"; \
			rm -rf ./packages/${*}/dist/types; \
			rm -rf ./packages/${*}/dist/tsconfig.tsbuildinfo; \
			pnpm tsc --build ./packages/${*}; \
        fi \
	fi;

pkg-build-%: pkg-types-% ##@1 packages build a package
	@-rm -rf ./packages/${*}/dist/nivo-${*}*
	@export PACKAGE=${*}; NODE_ENV=production BABEL_ENV=production ./node_modules/.bin/rollup -c conf/rollup.config.mjs

.PHONY: pkgs-screenshots
pkgs-screenshots: ##@1 packages generate screenshots for packages readme (website dev server must be running)
	@node scripts/capture.mjs

.PHONY: pkgs-publish-dry-run
pkgs-publish-dry-run: ##@1 packages dry run for packages publication
	#@$(MAKE) pkgs-build
	@pnpm lerna publish \
        --exact \
        --no-git-tag-version \
        --no-push \
        --force-publish \
        --registry "http://localhost:4873" \
        --loglevel verbose

.PHONY: pkgs-publish
pkgs-publish: ##@1 packages publish all packages
	@$(MAKE) pkgs-build

	@echo "${YELLOW}Publishing packages${RESET}"
	@pnpm lerna publish --exact

.PHONY: pkgs-publish-next
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
# 2. WEBSITE
#
########################################################################################################################

.PHONY: website-deps-up
website-deps-up: ##@2 website interactive upgrade of website's dependencies
	@pnpm upgrade-interactive --latest

.PHONY: website
website: ##@2 website start website in dev mode
	@echo "${YELLOW}Starting website dev server${RESET}"
	@cd website && pnpm start

.PHONY: website-build
website-build: ##@2 website build website
	@echo "${YELLOW}Building website${RESET}"
	@-rm -rf website/.cache
	@cd website && pnpm build

.PHONY: website-serve
website-serve: ##@2 website build & serve website
	@$(MAKE) website-build
	@cd website && pnpm serve

.PHONY: website-audit
website-audit: ##@2 website audit website build
	@cd website && pnpm analyze

.PHONY: website-lint
website-lint: ##@2 website run eslint on the website code
	@pnpm eslint ./website/src

.PHONY: website-sprites
website-sprites: ##@2 website build sprite sheet
	@glue --img website/src/assets --css website/src/styles website/src/assets/icons


########################################################################################################################
#
# 3. STORYBOOK
#
########################################################################################################################

.PHONY: storybook
storybook: ##@3 storybook start storybook in dev mode on port 6006
	@pnpm --filter storybook dev

.PHONY: storybook-build
storybook-build: ##@3 storybook build storybook
	@echo "${YELLOW}Building storybook${RESET}"
	@pnpm --filter storybook build


########################################################################################################################
#
# 4. End-to-end tests
#
########################################################################################################################

.PHONY: end-to-end-open
end-to-end-open: ##@4 end-to-end open cypress
	pnpm --filter nivo-e2e open

.PHONY: end-to-end-test
end-to-end-test: ##@4 end-to-end build
	pnpm --filter nivo-e2e test


########################################################################################################################
#
# 5. API
#
########################################################################################################################

.PHONY: api-dev
api-dev: ##@5 API run API in dev mode (watcher)
	@echo "${YELLOW}Starting API in dev mode${RESET}"
	@cd api && pnpm dev

.PHONY: api
api: ##@5 API run API in regular mode (no watcher)
	@echo "${YELLOW}Starting API${RESET}"
	@cd api && pnpm start

.PHONY: api-lint
api-lint: ##@5 API run eslint on the API code
	@pnpm eslint ./api/src

.PHONY: api-deploy
api-deploy: ##@5 API Deploy API on heroku
	git subtree push --prefix api heroku master
