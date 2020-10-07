#!/bin/bash

set -e

npm install yarn
# test publishing one module
make init
make package-build-bar
echo "Publishing packages"
cd packages/bar
npm publish

#make packages-publish