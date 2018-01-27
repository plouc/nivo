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

init: ##@0-global cleanup/install/bootstrap
	@make clean-all
	@yarn install
	@make bootstrap
	@make packages-build

fmt: ##@0 global format code using prettier (js, css, md)
	@./node_modules/.bin/prettier --color --write \
        "packages/*/{src,tests}/**/*.js" \
        "packages/*/README.md" \
        "website/src/**/*.{js,css}" \
        "storybook/stories/**/*.{js,css}" \
        "examples/*/src/**/*.{js,css}" \
        "README.md"

fmt-check: ##@0 global check if files were all formatted using prettier
	@echo "${YELLOW}Checking formatting${RESET}"
	@./node_modules/.bin/prettier --color --list-different \
        "packages/*/{src,tests}/**/*.js" \
        "packages/*/README.md" \
        "website/src/**/*.{js,css}" \
        "storybook/stories/**/*.{js,css}" \
        "examples/*/src/**/*.{js,css}" \
        "README.md"

test: ##@0 global run all checks & tests
	@make fmt-check
	@make packages-lint
	@make packages-test
	@make storybook-lint

deploy-all: ##@0 global deploy website & storybook
	@make website-deploy
	@make storybook-deploy

clean-all: ##@0 global uninstall node modules, remove transpiled code & lock files
	@rm -rf node_modules
	@rm -rf package-lock.json
	@$(foreach source, $(SOURCES), $(call clean-source-all, $(source)))
	@rm -rf website/node_modules
	@rm -rf website/package-lock.json
	@rm -rf website/yarn.lock

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
# PACKAGES
#
########################################################################################################################

package-lint-%: ##@1 packages run eslint on package
	@echo "${YELLOW}Running eslint on package ${WHITE}@nivo/${*}${RESET}"
	@./node_modules/.bin/eslint ./packages/nivo-${*}/{src,tests}

packages-lint: ##@1 packages run eslint on all packages
	@echo "${YELLOW}Running eslint on all packages${RESET}"
	@./node_modules/.bin/eslint \
        --ignore-pattern 'nivo-core' \
        --ignore-pattern 'nivo-stream' \
        --ignore-pattern 'nivo-sunburst' \
        --ignore-pattern 'nivo-pie' \
        --ignore-pattern 'nivo-radar' \
        --ignore-pattern 'nivo-heatmap' \
        --ignore-pattern 'nivo-treemap' \
        --ignore-pattern 'nivo-voronoi' \
        --ignore-pattern 'nivo-line' \
        ./packages/*/{src,tests}

package-test-%: ##@1 packages run tests for a package
	@./node_modules/.bin/jest --setupTestFrameworkScriptFile=raf/polyfill ./packages/nivo-${*}/tests

package-update-test-%: ##@1 packages run tests for a package and update its snapshots
	@./node_modules/.bin/jest --setupTestFrameworkScriptFile=raf/polyfill ./packages/nivo-${*}/tests -u

packages-test: ##@1 packages run tests for all packages
	@echo "${YELLOW}Running test suites for all packages${RESET}"
	@./node_modules/.bin/jest --setupTestFrameworkScriptFile=raf/polyfill ./packages/*/tests

packages-test-cover: ##@1 packages run tests for all packages with code coverage
	@echo "${YELLOW}Running test suites for all packages${RESET}"
	@./node_modules/.bin/jest --coverage --setupTestFrameworkScriptFile=raf/polyfill ./packages/*/tests

package-build-%: ##@1 packages build a package
	@echo "${YELLOW}Building package ${WHITE}@nivo/${*}${RESET}"
	@export PACKAGE=${*}; ./node_modules/.bin/rollup -c conf/rollup.config.js

packages-build: ##@1 packages build all packages
	@echo "${YELLOW}Building all packages${RESET}"
	@find ./packages -type d -name 'nivo-*' \
        ! -path "*-babel-preset" \
        | awk -Fnivo- '{print $$NF}' \
        | xargs -I '{}' \
            sh -c 'PACKAGE={} make package-build-{}'

packages-screenshots: ##@1 packages generate screenshots for packages readme (website dev server must be running)
	@node scripts/capture.js

packages-publish: ##@1 packages publish all packages
	@make packages-build

	@echo "${YELLOW}Publishing packages${RESET}"
	@./node_modules/.bin/lerna publish ---exact

packages-publish-next: ##@1 packages publish all packages for @next npm tag
	@make packages-build

	@echo "${YELLOW}Publishing packages${RESET}"
	@./node_modules/.bin/lerna publish ---exact --npm-tag=next

package-watch-%: ##@1 packages build package (es flavor) on change, eg. `package-build-watch-bar`
	@echo "${YELLOW}Running build watcher for package ${WHITE}@nivo/${*}${RESET}"
	@export PACKAGE=${*}; ./node_modules/.bin/rollup -c conf/rollup.config.js -w

package-dev-%: ##@1 packages setup package for development, link to website, run watcher
	@echo "${YELLOW}Preparing package ${WHITE}@nivo/${*}${YELLOW} for development${RESET}"
	@cd packages/nivo-${*} && yarn link
	@cd website && yarn link @nivo/${*}
	@make package-watch-${*}

########################################################################################################################
#
# WEBSITE
#
########################################################################################################################

website-install: ##@2 website install website dependencies
	@echo "${YELLOW}Installing ${WHITE}website${YELLOW} dependencies${RESET}"
	@cd website && yarn install

website: ##@2 website start website in dev mode
	@echo "${YELLOW}Starting ${WHITE}website${YELLOW} dev server${RESET}"
	@cd website && yarn start

website-build: ##@2 website build website
	@echo "${YELLOW}Building ${WHITE}website${RESET}"
	@make website-links-rm
	@cd website && yarn build

website-deploy: ##@2 website build & deploy website
	@make website-build

	@echo "${YELLOW}Deploying ${WHITE}website${RESET}"
	@./node_modules/.bin/gh-pages -d website/build -r git@github.com:plouc/nivo.git -b gh-pages

website-audit: ##@2 website audit website build
	@./node_modules/.bin/source-map-explorer website/build/static/js/main.*

website-links-ls: ##@2 website list linked packages
	@echo "${YELLOW}Which packages are currently being linked to ${WHITE}website${YELLOW}?${RESET}"
	@cd website; \
    find node_modules node_modules/\@* -depth 1 -type l -print | awk -F/ '{print $$(NF)}' | while read MODULE; do \
        echo "> linked package: ${WHITE}$${MODULE}${RESET}"; \
    done

website-links-rm: ##@2 website unlink all linked packages
	@echo "${YELLOW}Unlinking all packages for ${WHITE}website${RESET}"
	@-cd website; \
    find node_modules node_modules/\@* -depth 1 -type l -print | awk -F/ '{print $$(NF)}' | while read MODULE; do \
        yarn unlink "@nivo/$${MODULE}"; \
    done
	@make website-install

########################################################################################################################
#
# STORYBOOK
#
########################################################################################################################

storybook-install: ##@3 storybook install storybook dependencies
	@echo "${YELLOW}Installing ${WHITE}storybook${YELLOW} dependencies${RESET}"
	@cd storybook && yarn install

storybook: ##@3 storybook start storybook in dev mode on port 6006
	@cd storybook && ./node_modules/.bin/start-storybook -p 6006

storybook-lint: ##@3 storybook run eslint on stories
	@echo "${YELLOW}Running eslint on stories${RESET}"
	@./node_modules/.bin/eslint storybook/stories

storybook-build: ##@3 storybook build storybook
	@echo "${YELLOW}Building storybook${RESET}"
	@@cd storybook  && ./node_modules/.bin/build-storybook

storybook-deploy: ##@3 storybook build and deploy storybook
	@make storybook-build

	@echo "${YELLOW}Deploying storybook${RESET}"
	@./node_modules/.bin/gh-pages -d storybook/storybook-static -r git@github.com:plouc/nivo.git -b gh-pages -e storybook

storybook-audit: ##@3 storybook audit storybook build
	@./node_modules/.bin/source-map-explorer storybook/storybook-static/static/preview.*

########################################################################################################################
#
# EXAMPLES
#
########################################################################################################################

examples-install: ##@4 examples install all examples dependencies
	@make example-install-retro

example-install-%: ##@4 examples install example dependencies, eg. example-install-retro
	@echo "${YELLOW}Installing ${WHITE}${*}${YELLOW} example dependencies${RESET}"
	@cd examples/${*} && yarn install

example-start-%: ##@4 examples start example in dev mode, eg. example-start-retro
	@echo "${YELLOW}Starting ${WHITE}${*}${YELLOW} example dev server${RESET}"
	@cd examples/${*} && yarn start

examples-build: ##@4 examples build all examples
	@make example-build-retro

example-build-%: ##@4 examples build an example, eg. example-build-retro
	@echo "${YELLOW}Building ${WHITE}${*}${YELLOW} example${RESET}"
	@cd examples/${*} && yarn build

example-audit-%: ##@4 examples audit an example build, eg. example-audit-retro
	@./node_modules/.bin/source-map-explorer examples/${*}/build/static/js/main.*
