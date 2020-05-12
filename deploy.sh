#!/usr/bin/env bash

set -ex

cd firebase-hosting-tryout
  firebase deploy  --non-interactive --project $FIREBASE_PROJECT --token $FIREBASE_TOKEN

cd ..