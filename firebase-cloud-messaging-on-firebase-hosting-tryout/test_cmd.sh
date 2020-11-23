#!/usr/bin/env bash

set -ex

# curl -X POST -H "Authorization: key=$FIREBASE_FIREBASE_TRYOUT_SERVER_KEY" -H "Content-Type: application/json" -d '{
#   "notification": {
#     "title": "Portugal vs. Denmark",
#     "body": "5 to 1",
#     "icon": "firebase-logo.png",
#     "click_action": "http://localhost:8081"
#   },
#   "to": "ftffHqvm0H7ibGC-Brtqzg:APA91bHLcFiwjuS8pvaDQ_atZW4SH7BVOcp5NKzSU2vdrcuCOpqEWIAEp0FY-PibObDLlHj9q3Jk6P7ooVWg8bs6Op75eHyEqu0Eqs_Rnleg-nYfkraBui0wtuov3nE9j5SRLKGVbSgW"
# }' "https://fcm.googleapis.com/fcm/send"

# https://firebase.google.com/docs/cloud-messaging/http-server-ref#notification-payload-support

curl -X POST -H "Authorization: key=$FIREBASE_FIREBASE_TRYOUT_SERVER_KEY" -H "Content-Type: application/json" -d '{
  "notification": {
    "title": "Portugal vs. Denmark 1",
    "body": "5 to 1",
    "vibrate": [200, 100, 200, 100, 200, 100, 200],
    "icon": "firebase-logo.png",
    "click_action": "http://localhost:8081",
    "tag": "vibration-sample",
    "sound":"default"

  },
  "to": "dGsfYJFbL1plIadzae_FRd:APA91bFTq2zx93c146ZdEa_vI_Q2w5owk-KVwPnzMGGrzFaWAWoOtuYEKHaZ1x6AX6e0WQMRKr_yQngCZZb7KVbiuflwnCCDfjruu-QAN3s_oClls7K3JvlNbu8S32N0uG3QBFkGP9yD"
}' "https://fcm.googleapis.com/fcm/send"
