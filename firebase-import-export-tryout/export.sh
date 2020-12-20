#!/usr/bin/env bash

set -ex

export GOOGLE_APPLICATION_CREDENTIALS=$PWD/credentials.json

firestore-export --backupFile ./backups/myDatabase.json
