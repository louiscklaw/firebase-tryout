#!/usr/bin/env bash

set -ex

http-server -S -C localhost.pem -K localhost-key.pem
