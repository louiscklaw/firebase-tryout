#!/usr/bin/env bash

set -ex

sudo yarn global add node-firestore-import-export

firestore-export --backupFile ./backups/myDatabase.json