#!/usr/bin/env bash

set -ex

apt install libnss3-tools -y

wget https://github.com/FiloSottile/mkcert/releases/download/v1.1.2/mkcert-v1.1.2-linux-amd64

mv mkcert-v1.1.2-linux-amd64 mkcert

chmod +x mkcert

cp mkcert /usr/local/bin/
