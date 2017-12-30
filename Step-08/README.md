# Step 8: Adding Authentication and Authorization to your Website

[JWT](https://jwt.io/)

Header (Algorithm and Token Type)

```json
{
    "kid": "6km5DL+JIfa7sRo2O+aJivd5j9apTafsvZ7qEHxbXsA=",
    "alg": "RS256"
}
```

Payload (Data)
```json
{
    "sub": "fbe73a76-c688-43c3-beee-22484e318aa7",
    "aud": "168ou4pq8o9gtcng6vktbom2a7",
    "email_verified": true,
    "event_id": "664fc7fc-ecf0-11e7-a767-d7f1e41dd422",
    "token_use": "id",
    "auth_time": 1514590291,
    "iss": "https://cognito-idp.us-west-2.amazonaws.com/[YOUR COGNITO USER POOL ID]",
    "cognito:username": "[YOUR USERNAME]",
    "exp": 1514593891,
    "iat": 1514590291,
    "email": "[YOUR EMAIL]"
}
```