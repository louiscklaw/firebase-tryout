#!/usr/bin/env bash

set -ex

export GOOGLE_APPLICATION_CREDENTIALS="/home/logic/fir-tryout-f4e7a-firebase-adminsdk-ylqrb-5599f706a7.json"
node ./delete_all_users
