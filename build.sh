#!/bin/bash

npm install yarn
make init
make fmt-check
make packages-lint
make packages-tslint
make packages-test
make packages-publish