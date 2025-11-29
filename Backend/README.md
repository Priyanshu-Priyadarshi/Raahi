# /users/register

Description

- Endpoint to create/register a new user account.
- Route: POST /users/register (assumes router is mounted at `/users`).

Headers

- Content-Type: application/json

Request body (JSON)

- fullname (object)
  - firstname (string, required) — minimum 3 characters
  - lastname (string, optional) — minimum 3 characters if provided
- email (string, required) — must be a valid email
- password (string, required) — minimum 6 characters

Example request

{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "secret123"
}

Validation rules implemented

- email: must be a valid email (express-validator .isEmail())
- fullname.firstname: minimum length 3 (express-validator .isLength({min:3}))
- password: minimum length 6 (express-validator .isLength({min:6}))

Responses

Success (201 Created)

- Description: user created and a JWT auth token is returned.
- Body: JSON with `token` and `user` object (user object will not include the password field).

Example success response (201)

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f1a2b3c4d5e6f7890abcdef",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null,
    "__v": 0
  }
}

Client error (400 Bad Request)

- Occurs when validation fails. Response body contains an `errors` array from `express-validator`.

Example validation error response (400)

{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body",
      "value": "not-an-email"
    }
  ]
}

Server error (500 Internal Server Error)

- Occurs for unexpected failures (database errors, missing environment variables, etc.).

Example server error response (500)

{
  "error": "Internal Server Error"
}

Notes

- Passwords are hashed before being saved (see model/service).
- The returned `user` object will typically omit the password field (schema has `select:false`).
- Ensure `JWT_SECRET` is set in environment variables so token generation works.

---

# /users/login

Description

- Endpoint to authenticate a user and return a JWT token.
- Route: POST /users/login (assumes router is mounted at `/users`).

Headers

- Content-Type: application/json

Request body (JSON)

- email (string, required) — must be a valid email
- password (string, required) — minimum 6 characters

Example request

{
  "email": "john@example.com",
  "password": "secret123"
}

Validation rules implemented

- email: must be a valid email (express-validator .isEmail())
- password: minimum length 6 (express-validator .isLength({min:6}))

Responses

Success (200 OK)

- Description: user authenticated and a JWT auth token is returned.
- Body: JSON with `token` and `user` object (user object will not include the password field).

Example success response (200)

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f1a2b3c4d5e6f7890abcdef",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null,
    "__v": 0
  }
}

Client error (400 Bad Request)

- Occurs when validation fails. Response body contains an `errors` array from `express-validator`.

Example validation error response (400)

{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body",
      "value": "not-an-email"
    }
  ]
}

Unauthorized (401 Unauthorized)

- Occurs when email or password is incorrect.

Example unauthorized response (401)

{
  "message": "Invalid email or password"
}

Server error (500 Internal Server Error)

- Occurs for unexpected failures (database errors, missing environment variables, etc.).

Example server error response (500)

{
  "error": "Internal Server Error"
}

---

# /users/profile

Description

- Endpoint to get the authenticated user's profile information.
- Route: GET /users/profile (assumes router is mounted at `/users`).
- Requires authentication (JWT token in cookie or Authorization header).

Headers

- Content-Type: application/json
- Authorization: Bearer <token> (if not using cookies)

Request

- No body required. JWT token must be sent in cookie or Authorization header.

Responses

Success (200 OK)

- Description: Returns the user object for the authenticated user.
- Body: JSON user object (password field omitted).

Example success response (200)

{
  "_id": "64f1a2b3c4d5e6f7890abcdef",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "socketId": null,
  "__v": 0
}

Unauthorized (401 Unauthorized)

- Occurs if token is missing or invalid.

Example unauthorized response (401)

{
  "message": "unauthorized"
}

---

# /users/logout

Description

- Endpoint to log out the authenticated user.
- Route: POST /users/logout (assumes router is mounted at `/users`).
- Requires authentication (JWT token in cookie or Authorization header).

Headers

- Content-Type: application/json
- Authorization: Bearer <token> (if not using cookies)

Request

- No body required. JWT token must be sent in cookie or Authorization header.

Responses

Success (200 OK)

- Description: Logs out the user by clearing the token cookie and blacklisting the token.
- Body: JSON message confirming logout.

Example success response (200)

{
  "message": "Logged out"
}

Unauthorized (401 Unauthorized)

- Occurs if token is missing or invalid.

Example unauthorized response (401)

{
  "message": "unauthorized"
}

---

# /captains/register

Description

- Register a new captain (driver) with vehicle details.
- Route: POST /captains/register

Request body (JSON)

```jsonc
{
  "fullname": {
    "firstname": "Alex", // required, min 3 chars
    "lastname": "Smith" // optional, min 3 chars if provided
  },
  "email": "alex@captain.com", // required, valid email
  "password": "captainpass", // required, min 6 chars
  "vehicle": {
    "color": "Red", // required, min 3 chars
    "plate": "ABC123", // required, min 3 chars
    "capacity": 4, // required, integer >= 1
    "vehicleType": "car" // required, one of: 'car', 'motorcycle', 'auto'
  }
}
```

Example success response (201)

```jsonc
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // JWT token
  "captain": {
    "_id": "65f1a2b3c4d5e6f7890abcdef",
    "fullname": {
      "firstname": "Alex",
      "lastname": "Smith"
    },
    "email": "alex@captain.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "__v": 0
  }
}
```

Example error response (400)

```jsonc
{
  "errors": [
    {
      "msg": "Invalid Email", // validation error
      "param": "email",
      "location": "body",
      "value": "not-an-email"
    },
    {
      "message": "Captain already exists" // duplicate email error
    }
  ]
}
```

---

# /captains/login

Description

- Authenticate a captain and return a JWT token.
- Route: POST /captains/login

Request body (JSON)

```jsonc
{
  "email": "alex@captain.com", // required, valid email
  "password": "captainpass" // required, min 6 chars
}
```

Example success response (200)

```jsonc
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // JWT token
  "captain": {
    "_id": "65f1a2b3c4d5e6f7890abcdef",
    "fullname": {
      "firstname": "Alex",
      "lastname": "Smith"
    },
    "email": "alex@captain.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "__v": 0
  }
}
```

Example error response (400/401)

```jsonc
{
  "errors": [
    {
      "msg": "Invalid Email", // validation error
      "param": "email",
      "location": "body",
      "value": "not-an-email"
    }
  ]
}

{
  "message": "Invalid email or password" // authentication error
}
```

---

# /captains/profile

Description

- Get the authenticated captain's profile.
- Route: GET /captains/profile
- Requires JWT token (cookie or Authorization header)

Example success response (200)

```jsonc
{
  "captain": {
    "_id": "65f1a2b3c4d5e6f7890abcdef",
    "fullname": {
      "firstname": "Alex",
      "lastname": "Smith"
    },
    "email": "alex@captain.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "__v": 0
  }
}
```

Example unauthorized response (401)

```jsonc
{
  "message": "unauthorized" // missing or invalid token
}
```

---

# /captains/logout

Description

- Logout the authenticated captain and blacklist the token.
- Route: GET /captains/logout
- Requires JWT token (cookie or Authorization header)

Example success response (200)

```jsonc
{
  "message": "Logout successfully" // logout confirmation
}
```

Example unauthorized response (401)

```jsonc
{
  "message": "unauthorized" // missing or invalid token
}
```


# /rides/get-fare

Description

- Calculate estimated fare for a trip based on pickup and destination using Google Distance Matrix.
- Route: GET /rides/get-fare (assumes router is mounted at `/rides`).
- Requires authentication (JWT token in cookie or Authorization header).

Headers

- Content-Type: application/json
- Authorization: Bearer <token> (if not using cookies)

Query parameters

- pickup (string, required, min length 3) — pickup address
- destination (string, required, min length 3) — destination address

Example request

```http
GET /rides/get-fare?pickup=MG%20Road%20Bengaluru&destination=Indiranagar%20Bengaluru HTTP/1.1
Authorization: Bearer <token>
```

Example success response (200)

```jsonc
{
  "auto": 75.5,
  "car": 120.75,
  "motorcycle": 45.25
}
```

Validation error (400 Bad Request)

- Occurs when validation fails.

```jsonc
{
  "errors": [
    {
      "msg": "Invalid pickup address",
      "param": "pickup",
      "location": "query",
      "value": "ab"
    }
  ]
}
```

Unauthorized (401 Unauthorized)

- Occurs when token is missing or invalid (from `authUser` middleware).

```jsonc
{
  "message": "unauthorized"
}
```

Server error (500 Internal Server Error)

- Occurs if distance/time cannot be fetched or another unexpected error happens.

```jsonc
{
  "message": "Internal server error"
}
```