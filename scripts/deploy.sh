#!/usr/bin/env bash

set -ex

cd functions
  yarn build
  firebase deploy
cd ..
