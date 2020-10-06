#!/bin/bash

set -e

npm install yarn
make init
make test
make packages-publish