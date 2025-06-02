## auth router
    POST-/signup
    POST-/login
    POST-/logout

## profile-router
    PATCH-profile/edit
    PATCH-profile/password
    GET-profile/view

## connectionRequestRouter
    POST-/request/send/interested/:userid
    POST-/request/send/ignored/:userid
    POST-/request/send/accepted/:requestid
    POST-/request/send/rejected/:requestid
## UserRouter
    GET-/user/connection
    GET-/user/request/received
    GET-/user/feed-get the profile of other user on the  platform 

Status: accepted,rejected,interested,ignored
