# Testing create fight (POST /fights)
$ curl -d '{"winner":"levi", "losser":"henry", "title": "fight1"}' -H "Content-Type: application/json" -X POST "http://localhost:5000/test-firebase-3a0f6/us-central1/main/api/jstest/create_fight/"

> {"id":"zC9QORei07hklkKUB1Gl","data":{"title":"fight1","winner":"levi","losser":"henry"}

# Testing  get a fight (GET /fight:id)
$ curl -G "http://localhost:5000/test-firebase-3a0f6/us-central1/main/api/jstest/fight/OJAHy9p8yMAjTAiZxVF8/"

>{"id":"zC9QORei07hklkKUB1Gl","data":{"winner":"levi","losser":"henry","title":"fight1"}}


# Testing get fights list (GET /fights/)
$ curl -G "http://localhost:5000/test-firebase-3a0f6/us-central1/main/api/jstest/fights/"
> [{"id":"zC9QORei07hklkKUB1Gl","data":{"title":"fight1","winner":"levi","losser":"henry"}}]

# Testing update a fight (PUT /fights/:id)
$ curl -d '{"title": "new fight title"}' -H "Content-Type: application/json" -X PUT "http://localhost:5000/test-firebase-3a0f6/us-central1/main/api/jstest/fights/irAUmIlnvuzVVCdIj55e/"

> {"id":"zC9QORei07hklkKUB1Gl","data":{"title":"new fight title"}}

# Testing delete a fight (DELETE /fight/:id)
$ curl -X DELETE "http://localhost:5000/test-firebase-3a0f6/us-central1/main/api/jstest/fights/OJAHy9p8yMAjTAiZxVF8/"

> {"id":"zC9QORei07hklkKUB1Gl"}

# Testing delete all fight (GET /fight/delete_all)
$ curl -G "http://localhost:5000/test-firebase-3a0f6/us-central1/main/api/jstest/db_util/delete_all"
