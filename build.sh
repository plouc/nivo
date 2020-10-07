#!/bin/bash

set -e

npm install yarn
# test publishing one module
make init
make package-build-bar

#make packages-publish