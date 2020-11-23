#!/usr/bin/env bash

set -ex

# npm install

firebase deploy -f --non-interactive --token $FIREBASE_TOKEN
