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
    "message":"Logged in successfully",
    "token":"<TOKEN>"
}
```

3. ### **POST** *`/logout`*

- Response Object 
```json
{
    "success":true,
    "message":"Logged out successfully"
}
```

4. ### **GET** *`/info`*

- Response Object 
```json
{
    "success":true,
    "user<OBJECT>": {
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
1. ### **GET** *`/channels?name=<string>&page=<num>&skip=<num>`*
    - to search for channel, Don't have to send full name of the channel,
    just send a part of the name and it will request all channels that their name contain this part

- Response Object 
```json
{
    "success":true,
    "channels<ARRAY>": [
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
    "channels<ARRAY>": [
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

### Dialogue Endpoints

1. ### **GET** *`/dialogues/<channel_id>?skip=<num>&count=<num>`*
    - list all dialogue blocks related to this channel and user
    - count variables in query define how many blocks per request
- Response Object
```json
{
    "success":true,
    "blocks<ARRAY>":[
        {
            "isArabic": true,
            "_id": "6140c4f1d32bfdb840819022",
            "name": "رسالة ترحيب واشتراك",
            "title": "مرحبا بك فى قناة Basmala kitchen",
            "content": "هذة قناة مخصصة لعرض احسن وافضل اكلات حول العالم لهذا اذا كنت مهتم فاضغط على زر الاشتراك",
            "buttons": [
                {
                    "title": "إضغط هنا للإشتراك",
                    "type": "Subscribe",
                    "action": "614104b56ba538c46deb70ef",
                    "_id": "6140c4f1d32bfdb840819023"
                }
            ],
            "type": "Card",
            "creator": "61342bdac34d202a73a28c51",
            "channel": "61408a489c0ae41898ec33e9",
            "role": "init",
            "abbr": "CD",
            "createdAt": "2021-09-14T15:54:14.733Z",
            "updatedAt": "2021-09-19T16:44:22.909Z",
            "__v": 29,
            "image": "image-1632069705705-.png"
        }
    ]
}
```

2.  ### **GET** *`/block/<block_id>/<channel_id>`*
    - get only one block

- Response Object
```json
{
    "success":true,
    "block<OBJECT>":{
            "isArabic": true,
            "_id": "6140c4f1d32bfdb840819022",
            "name": "رسالة ترحيب واشتراك",
            "title": "مرحبا بك فى قناة Basmala kitchen",
            "content": "هذة قناة مخصصة لعرض احسن وافضل اكلات حول العالم لهذا اذا كنت مهتم فاضغط على زر الاشتراك",
            "buttons": [
                {
                    "title": "إضغط هنا للإشتراك",
                    "type": "Subscribe",
                    "action": "614104b56ba538c46deb70ef",
                    "_id": "6140c4f1d32bfdb840819023"
                }
            ],
            "type": "Card",
            "creator": "61342bdac34d202a73a28c51",
            "channel": "61408a489c0ae41898ec33e9",
            "role": "init",
            "abbr": "CD",
            "createdAt": "2021-09-14T15:54:14.733Z",
            "updatedAt": "2021-09-19T16:44:22.909Z",
            "__v": 29,
            "image": "image-1632069705705-.png"
        }
}
```

3. ### **DELETE** *`dialogues/<channel_id>`*
    - This endpoint will delete all dialogue records and clear the chat

- Response Object
```json
{
    "success":true,
    "message":"Records has been deleted"
}
```

4.  ### **GET** *`/timed/<channel_id>`*
    - request scheduled blocks that will be send to user in certain time

- Response Object
```json
{
    "success":true,
    "blocks<ARRAY>":[
        {
            "isArabic": true,
            "_id": "6140c4f1d32bfdb840819022",
            "name": "رسالة ترحيب واشتراك",
            "title": "مرحبا بك فى قناة Basmala kitchen",
            "content": "هذة قناة مخصصة لعرض احسن وافضل اكلات حول العالم لهذا اذا كنت مهتم فاضغط على زر الاشتراك",
            "buttons": [
                {
                    "title": "إضغط هنا للإشتراك",
                    "type": "Subscribe",
                    "action": "614104b56ba538c46deb70ef",
                    "_id": "6140c4f1d32bfdb840819023"
                }
            ],
            "type": "Card",
            "creator": "61342bdac34d202a73a28c51",
            "channel": "61408a489c0ae41898ec33e9",
            "role": "init",
            "abbr": "CD",
            "createdAt": "2021-09-14T15:54:14.733Z",
            "updatedAt": "2021-09-19T16:44:22.909Z",
            "__v": 29,
            "image": "image-1632069705705-.png"
        }
    ]
}
```
