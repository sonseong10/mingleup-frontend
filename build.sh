#!/bin/sh
set -e

# build
npm install
npm run build

rm -rf output
mkdir output

# dist 전체 복사
cp -R dist/* output

# vercel.json도 output으로 복사
cp vercel.json output
