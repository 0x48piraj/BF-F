#!/bin/bash

# Minify JavaScript
uglifyjs --compress --mangle -- lib/decog.js > dist/decog.min.js