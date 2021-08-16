#!/bin/bash

set -e

yarn docs:build

cd docs/.vuepress/dist

git init

git add -A

git commit -m "deploy"

# git push -f https://e.coding.net/bromeliad/bromeliad/bromeliad.git master

# git push -f git@gitee.com:bromeliad/javanote.git master

# rm -rf *

