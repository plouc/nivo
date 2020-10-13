#!/bin/bash

set -e

npm install yarn
make init
git commit -a -m 'Build'

make packages-publish