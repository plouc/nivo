#!/bin/bash

set -e

make lint
make packages-test
make init
make packages-publish