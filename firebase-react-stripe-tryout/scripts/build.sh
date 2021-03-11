#!/usr/bin/env bash

set -ex

# npm install

# firebase deploy  --non-interactive --token $FIREBASE_TOKEN

export GOOGLE_APPLICATION_CREDENTIALS=/home/logic/.firebase-keys/fir-tryout-f4e7a-firebase-adminsdk-ylqrb-35bbb11924.json

cd functions
  npm install &
cd ..

yarn
yarn build &

wait

firebase deploy -f --non-interactive --only hosting &

firebase deploy -f --non-interactive --only functions &

wait

git add .
