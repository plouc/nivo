#!/bin/bash

set -e

npm install yarn
make init
npm publish ".\packages\bar"

#make packages-publish