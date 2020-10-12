#!/bin/bash

set -e

npm install yarn
make init
git config --global user.name "lerna-bot"
git config --global user.email "lerna-bot@lbot.io"
git branch tmp

make packages-publish

#make packages-publish