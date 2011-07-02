#!/bin/sh

npm install express
npm install mongoose
npm install redis
npm install connect-redis

mkdir node_modules && cd node_modules
git clone https://github.com/craigching/socket.io.git
git clone https://github.com/LearnBoost/socket.io-client.git
cd ..
npm install uglify-js

DOJO_VERSION=release-1.7.0b2

curl http://download.dojotoolkit.org/release-$DOJO_VERSION/dojo-release-$DOJO_VERSION-src.tar.gz >dojo-release-$DOJO_VERSION-src.tar.gz
tar -zxvf dojo-release-$DOJO_VERSION-src.tar.gz

cd dojo-release-$DOJO_VERSION-src && ln -s webasap ../webasap & cd ..
cd public && ln -s dojo-$DOJO_VERSION ../dojo-release-$DOJO_VERSION-src
