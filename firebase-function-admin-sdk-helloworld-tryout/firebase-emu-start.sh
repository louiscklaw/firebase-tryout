#!/usr/bin/env bash

set -ex

export GOOGLE_APPLICATION_CREDENTIALS=/home/logic/fir-tryout-f4e7a-firebase-adminsdk-ylqrb-35bbb11924.json

firebase emulators:start
