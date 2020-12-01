#!/bin/bash

set -e

make test
make init
make packages-publish