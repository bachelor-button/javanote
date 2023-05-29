#!/bin/bash

set -e

yarn docs:build

cd docs/.vuepress/dist

git init

git add -A

git commit -m "deploy"

git remote add origin git@github.com:bachelor-button/javanote.git

git push -f origin deploy

cd ../../../

rm -rf docs/.vuepress/dist/

