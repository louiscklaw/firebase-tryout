#!/usr/bin/env bash

set -ex

cp ../scripts/.firebaserc .
cp ../scripts/firebase.json .

firebase init
