#!/usr/bin/env bash

set -ex

npm install

# firebase target:apply hosting target-name resource-name
# target-name — a unique identifier (that you've defined yourself) for the Hosting site that you're deploying to
# resource-name — the name of the Hosting site as listed in your Firebase project

# firebase target:apply hosting performance-monitor-tryout performance-monitor
firebase deploy --only hosting:performance-monitor