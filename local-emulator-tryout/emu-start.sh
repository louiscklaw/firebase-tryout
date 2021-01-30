#!/usr/bin/env bash

set -ex

export GOOGLE_APPLICATION_CREDENTIALS=/home/logic/.firebase-keys/fir-tryout-f4e7a-firebase-adminsdk-ylqrb-35bbb11924.json
export FIRESTORE_EMULATOR_HOST="localhost:8080"



firebase emulators:start