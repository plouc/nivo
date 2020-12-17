#!/bin/bash

set -e

make packages-test
make init
make packages-publish