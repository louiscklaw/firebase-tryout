#!/usr/bin/env bash

set -ex


# firebase target:apply hosting meme-admin-panel meme-admin-panel
firebase deploy --only hosting
# meme-admin-panel
