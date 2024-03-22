# Shopping API Application

## About the project

This is a RESTful API for a shopping application.

### Built With

[![Elysia][Elysia]][Elysia-url]

[![Drizzle-Orm][Drizzle-Orm]][Drizzle-Orm-url]


## Getting Started
To get started with this project, run the steps below.

### Prerequisites

To run this project, you will need:

* install [bun](https://bun.sh/).
* Create a free account in [uploadcare](https://uploadcare.com/).

### Installation

1. Clone the repo

  ```sh
    git clone https://github.com/EdlanioJ/shopping-api.git
  ```

2. Install NPM packages

```sh
  bun install
```

3. Enter your env variables in `.env.local`

```ts
DATABASE_URL='ENTER DATABASE URL'
JWT_SECRET_KEY='ENTER JWT SECRET KEY'
UPLOADCARE_PUBLIC_KEY='ENTER UPLOADCARE PUBLIC KEY'
STRIPE_SECRET_KEY='ENTER STRIPE SECRET KEY'

// optional

PORT=ENTER PORT
```

### Run

```js
bun run dev
```

### API Documentation
Open http://localhost:3000/docs to see the API documentation.

## Rest API

### Authentication

#### Register
Create a new user

##### Request
```http
POST /register
```

```sh
curl -i -H 'Accept: application/json' -d 'username=Foo&email=foo@example.com&password=123456' http://localhost:3000/register
```

##### Response
```http
HTTP/1.1 204 No Content
Access-Control-Allow-Headers: *
Access-Control-Allow-Credentials: true
Vary: *
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST
Access-Control-Exposed-Headers: *
Date: Fri, 22 Mar 2024 10:55:12 GMT
Content-Length: 0
```


#### Login


## License

This project is under the MIT license. See the [LICENSE](LICENSE) file for more details.
<br/>

Made with :heart: por [Edlâneo Manuel](https://github.com/EdlanioJ) :wave:




[Elysia]: https://img.shields.io/badge/Elysia.js-7b85eb?style=for-the-badge&logo=elysia&logoColor=ffffff
[Elysia-url]: https://elysiajs.com/

[Drizzle-Orm]: https://img.shields.io/badge/Drizzle_orm-c5f74f?style=for-the-badge&logo=drizzle-orm&logoColor=ffffff
[Drizzle-Orm-url]: https://elysiajs.com/