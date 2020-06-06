#!/usr/bin/env bash

set -ex

FCM_TOKEN=c_1q8VzfFCwiZYGzwUp0kW:APA91bGSs3rvKT7dTTABfOMs_tSTwOjQRJ9pz-KvO2D4JGG6-T5XSd5lKNUwCbm4Uo9CadaV4ob6o0l6Q6RD8hHIgRlEr893Z4RjmB2kHbUXOswdKKEWzez8rWkZoWjY6hTevsFpPYpH

SERVER_KEY=AAAAyCg7VpQ:APA91bH3FKoCVW8g0tmpVarzftozIAFvkJRiZK8OlAPclrNX-z7xf48MJyR7KFpj-nTm67iFUH9TJUJaDmW6Dkdh9yBHt0w452WriKfktkfQ8Hki_iJocjjD7LXm5s2cjkdWOFACvOxO

curl \
--header "Content-Type: application/json" \
--header "Authorization: key=$SERVER_KEY" https://fcm.googleapis.com/fcm/send \
-d '{"notification": {"body": "helloworld", "sound": "default"}, "priority": "high", "to": "c_1q8VzfFCwiZYGzwUp0kW:APA91bGSs3rvKT7dTTABfOMs_tSTwOjQRJ9pz-KvO2D4JGG6-T5XSd5lKNUwCbm4Uo9CadaV4ob6o0l6Q6RD8hHIgRlEr893Z4RjmB2kHbUXOswdKKEWzez8rWkZoWjY6hTevsFpPYpH"}'
