#!/usr/bin/env bash

set -ex

firestore-export --backupFile ./backups/myDatabase.json
