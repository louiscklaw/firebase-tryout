#!/usr/bin/env bash

set -ex

cd firebase-hosting-tryout
  ./build.sh
cd ..

cd firebase-functions-tryout
  ./build.sh
cd ..

exit 0