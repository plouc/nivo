#!/bin/bash

set -e

npm install yarn
make init
cd packages/bar
npm publish

#make packages-publish