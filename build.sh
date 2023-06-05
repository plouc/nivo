#!/bin/bash

set -e

npm install -g pnpm
make init
make packages-publish-ci