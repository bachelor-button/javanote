#!/bin/bash

set -e

yarn docs:build

cd docs/.vuepress/dist

git init

git add -A

git commit -m "deploy"

git push -f git@github.com:bachelor-button/javanote.git deploy

rm -rf *

