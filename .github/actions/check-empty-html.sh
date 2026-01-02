#!/bin/bash

set -e

for file in *.html; do
  if [ ! -s "$file" ]; then
    echo "Error: $file is empty"
    exit 1
  fi
done

echo "All HTML files are non-empty"
