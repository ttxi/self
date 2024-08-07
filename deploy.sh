#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn docs:build

# 进入生成的文件夹
cd docs-dist

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:ttxi/self.git main:gh-pages
echo '发布完成'

cd ..

sh push.sh