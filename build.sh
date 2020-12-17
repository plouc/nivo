#!/bin/bash

set -e

yarn install
make packages-test
make init
make packages-publish