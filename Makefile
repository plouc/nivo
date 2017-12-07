SOURCES = packages

.PHONY: help bootstrap init packages-build packages-publish clean-all website-install website website-build website-deploy storybook storybook-build storybook-deploy deploy-all

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
    while(<>) { push @{$$help{$$2 // 'options'}}, [$$1, $$3] if /^([a-zA-Z\-\%]+)\s*:.*\#\#(?:@([a-zA-Z\-\%]+))?\s(.*)$$/ }; \
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
# INIT
#
########################################################################################################################

bootstrap: ##@init lerna bootstrap
	@./node_modules/.bin/lerna bootstrap

init: ##@init cleanup/install/bootstrap
	@make clean-all
	@yarn install
	@make bootstrap
	@make packages-build
	@make website-install

########################################################################################################################
#
# GLOBAL
#
########################################################################################################################

fmt: ##@global format code using prettier (js, css, md)
	@./node_modules/.bin/prettier --color --write \
		"packages/*/{src,stories,tests}/**/*.js" \
		"packages/*/README.md" \
		"website/src/**/*.{js,css}" \
		"examples/*/src/**/*.{js,css}" \
		"README.md"

deploy-all: ##@global deploy website & storybook
	@make website-deploy
	@make storybook-deploy

########################################################################################################################
#
# CLEANUP
#
########################################################################################################################

clean-all: ##@cleanup uninstall node modules, remove transpiled code & lock files
	@rm -rf node_modules
	@rm -rf package-lock.json
	@$(foreach source, $(SOURCES), $(call clean-source-all, $(source)))
	@rm -rf website/node_modules
	@rm -rf website/package-lock.json

define clean-source-lib
	rm -rf $(1)/*/es
	rm -rf $(1)/*/lib
endef

define clean-source-all
	rm -rf $(1)/*/es
	rm -rf $(1)/*/lib
	rm -rf $(1)/*/node_modules
	rm -rf $(1)/*/package-lock.json
endef

########################################################################################################################
#
# PACKAGES
#
########################################################################################################################

packages-test: ##@packages run tests for all packages
	# stream can be used for a mire verbose output
	#@./node_modules/.bin/lerna run --concurrency 1 --stream test
	@./node_modules/.bin/lerna run --concurrency 1 test

packages-build: ##@packages build all packages
	@echo "${YELLOW}Building all packages${RESET}"
	@$(foreach source, $(SOURCES), $(call clean-source-lib, $(source)))
	@./node_modules/.bin/lerna run build

packages-publish: ##@packages publish all packages
	@make packages-build

	@echo "${YELLOW}Publishing packages${RESET}"
	@./node_modules/.bin/lerna publish ---exact

package-build-watch-%: ##@packages build package (es flavor) on change, eg. `package-build-watch-bar`
	@echo "${YELLOW}Running build watcher for package ${WHITE}${*}${RESET}"
	@cd packages/nivo-${*} && yarn build:es:watch

package-build-%: ##@packages build package (all flavors), eg. `package-build-bar`
	@echo "${YELLOW}Build package ${WHITE}${*}${RESET}"
	@cd packages/nivo-${*} && yarn build

package-dev-%: ##@packages setup package for development, link to website, run watcher
	@echo "${YELLOW}Preparing package ${WHITE}${*}${YELLOW} for development${RESET}"
	@cd packages/nivo-${*} && yarn link
	@cd website && yarn link @nivo/${*}
	@make package-build-watch-${*}

########################################################################################################################
#
# WEBSITE
#
########################################################################################################################

website-install: ##@website install website dependencies
	@echo "${YELLOW}INstalling website dependencies${RESET}"
	@cd website && yarn install

website: ##@website start website in dev mode
	@echo "${YELLOW}Starting website dev server${RESET}"
	@cd website && yarn start

website-build: ##@website build website
	@echo "${YELLOW}Building website${RESET}"
	@cd website && yarn build

website-deploy: ##@website build & deploy website
	@make website-build

	@echo "${YELLOW}Deploying website${RESET}"
	@./node_modules/.bin/gh-pages -d website/build -r git@github.com:plouc/nivo.git -b gh-pages

website-audit: ##@website audit website build
	@cd website && yarn analyze

website-links-ls: ##@website list linked packages
	@echo "${YELLOW}Which packages are currently being linked to ${WHITE}website${YELLOW}?${RESET}"
	@cd website; \
    find node_modules node_modules/\@* -depth 1 -type l -print | awk -F/ '{print $$(NF)}' | while read MODULE; do \
        echo "> linked package: ${WHITE}$${MODULE}${RESET}"; \
    done

website-links-rm: ##@website unlink all linked packages
	@echo "${YELLOW}Unlinking all packages for ${WHITE}website${RESET}"
	@cd website; \
    find node_modules node_modules/\@* -depth 1 -type l -print | awk -F/ '{print $$(NF)}' | while read MODULE; do \
        yarn unlink "@nivo/$${MODULE}"; \
    done
	@make website-install

########################################################################################################################
#
# STORYBOOK
#
########################################################################################################################

storybook: ##@storybook start storybook in dev mode on port 6006
	@./node_modules/.bin/start-storybook -p 6006

storybook-build: ##@storybook build storybook
	@echo "${YELLOW}Building storybook${RESET}"
	@./node_modules/.bin/build-storybook

storybook-deploy: ##@storybook build and deploy storybook
	@make storybook-build

	@echo "${YELLOW}Deploying storybook${RESET}"
	@./node_modules/.bin/gh-pages -d storybook-static -r git@github.com:plouc/nivo.git -b gh-pages -e storybook
