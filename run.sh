#!/bin/sh

JSENGINE=~/local/node/bin/node
REQUIREJS=requirejs/r.js
#REQUIREDIR=$(dirname "$REQUIREJS")

#$JSENGINE $REQUIREJS $REQUIREDIR _base.js

$JSENGINE $REQUIREJS _base.js
