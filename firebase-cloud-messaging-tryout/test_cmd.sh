#!/usr/bin/env bash

set -ex

curl -X POST -H "Authorization: key=$FIREBASE_FIREBASE_TRYOUT_SERVER_KEY" -H "Content-Type: application/json" -d '{
  "notification": {
    "title": "Portugal vs. Denmark",
    "body": "5 to 1",
    "icon": "firebase-logo.png",
    "click_action": "http://localhost:8081"
  },
  "to": "f702OkC3ust_yN6Ejsb9gV:APA91bHFgBZPM5tFw_u7aMhSvsFIFEU7ODR8HLVnMojzqyCXLBw4fcwis-HZtaTaaowQ60GtsPmm8CGFXnlFeFSbmBHWe5v6yajxaT7ofR81zFLkXcvv0sTkYelbITWskMnB6-K2F_yE"
}' "https://fcm.googleapis.com/fcm/send"