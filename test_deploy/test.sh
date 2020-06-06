#!/usr/bin/env bash

set -ex

firebase deploy --non-interactive --project $FIREBASE_PROJECT  --token $FIREBASE_TOKEN