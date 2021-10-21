# API Reference

- Base URL: https://www.khoolasa.chat/api/users 
- Authentication: The API require authentication by
  - Provide valid (apikey) in the header with every request
  - login so you can connect the endpoints

## ERROR
--------------------
Errors are returned as JSON object in the following format:
```json
{
    "success":false,
    "message":"NOT Found",
    "error":404
}
```
## IMAGES
- Base URL for images :- https://www.khoolasa.chat/api/uploads/`image-link`

## ENDPOINTS

### USER Endpoints
----------------------
1. ### **POST** *`/register`*
- body Sample
```json
{
    "userName":"demery",
    "fullName":"mohamed el demery",
    "email":"demery@test.com",
    "password":"2254799",
    "phone":"1254789",
    "gender":"male",
    "avatar":"user image"
}
```

- Response Object 
```json
{
    "id":"61504a5f4be4d420e0d5b45a",
    "success":true,
    "message":"The Account has been created"
}
```

2. ### **POST** *`/login`*

- body Sample
> the user can login by using email or just username
```json
{
    "info":"demery@test.com OR demery",
    "password":"1254789"
}
```

- Response Object 
> the expiry date will be the same as the expiry date of the token which is 7 days by default
```json
{
    "id":"61504a5f4be4d420e0d5b45a",
    "expiryAt":1633477516413,
    "success":true,
    "message":"The User has Logged in successfully"
}
```

3. ### **POST** *`/logout`*
the endpoint will clear the token in the cookie

- Response Object 
```json
{
    "success":true,
    "message":"The User has Logged out successfully"
}
```

4. ### **GET** *`/info`*

- Response Object 
```json
{
    "success":true,
    "user": {
        "userName":"demery",
        "fullName":"mohamed el demery",
        "email":"demery@test.com",
        "phone":"1254789",
        "gender":"male",
        "image":"<image link>"
    }
}
```

5. ### **PATCH** *`/edit`*
- body Sample

> notice => send what only need to be updated in the body

> notice => The image update has different endpoint
```json
{
    "userName":"demery",
    "fullName":"mohamed el demery",
    "email":"demery@test.com",
    "password":"2254799",
    "phone":"1254789",
    "gender":"male",
}
```

- Response Object 
```json
{
   "id":"61504a5f4be4d420e0d5b45a",
    "success":true,
    "message":"The Account has been updated"
}
```

6. ### **PATCH** *`/avatar`*
- body Sample
```json
{
    "avatar":"<image file>"
}
```

- Response Object 
```json
{
    "id":"61504a5f4be4d420e0d5b45a",
    "success":true,
    "message":"the image has been uploaded"
}
```

6. ### **DELETE** *`/delete`*

- Response Object 
```json
{
    "id":"61504a5f4be4d420e0d5b45a",
    "success":true,
    "message":"The account has been Deleted"
}
```
### Channel Endpoints
----------------------
1. ### **GET** *`/channels?page=<num>&skip=<num>`*

- Response Object 
```json
{
    "success":true,
    "channels": [
        {
            "id":"61504a5f4be4d420e0d5b45a",
            "name":"Barcelona Club",
            "description":"This is channel is dedicated for broadcasting all the club news and players",
            "image":"<image-link>"
        },
        {
            "id":"61504a5f4be4d420e0d5b45a",
            "name":"Barcelona Club",
            "description":"This is channel is dedicated for broadcasting all the club news and players",
            "image":"<image-link>"
        },
    ]
}
```
2. ### **GET** *`/channels/{user_id}?page=<num>&skip=<num>`*
    the channels that has been subscribed by this user
- Response Object 
```json
{
    "success":true,
    "channels": [
        {
            "id":"61504a5f4be4d420e0d5b45a",
            "name":"Barcelona Club",
            "description":"This is channel is dedicated for broadcasting all the club news and players",
            "image":"<image-link>"
        },
        {
            "id":"61504a5f4be4d420e0d5b45a",
            "name":"Barcelona Club",
            "description":"This is channel is dedicated for broadcasting all the club news and players",
            "image":"<image-link>"
        },
    ]
}
```
3. ### **PATCH** *`/subscribe`*
    the channels that has been subscribed by this user
- Body object 
```json
    {
        "channelId":"61504a5f4be4d420e0d5b45a"
    }
```
- Response Object 
```json
{
    "success":true,
    "message":"Subscription has been Confirmed"
}
``` 

4. ### **PATCH** *`/unsubscribe`*
    the channels that has been subscribed by this user
- Body object 
```json
    {
        "channelId":"61504a5f4be4d420e0d5b45a"
    }
```
- Response Object 
```json
{
    "success":true,
    "message":"UnSubscription has been Confirmed"
}
``` 



