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
* Create a free account in [Uploadcare](https://uploadcare.com/).
* Create a free account in [Stripe](https://stripe.com/).

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
POST /auth/register
```

```sh
curl --request 'POST' --url 'http://localhost:3000/auth/register' --header 'Content-Type: application/json' --data '{ "name": "Foo", "email": "foo@example.com", "password": "12345672" }'
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
<p>Login to your account</p>

##### Request
```http
POST /auth/login
```

```sh
curl --request 'POST' --url 'http://localhost:3000/auth/login' --header 'Content-Type: application/json' --data '{ "email": "foo@example.com", "password": "12345672" }'
```
##### Response

```http
HTTP/1.1 200 OK
Access-Control-Allow-Headers: *
Access-Control-Allow-Credentials: true
Vary: *
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST
Content-Type: application/json;charset=utf-8
Access-Control-Exposed-Headers: *
Date: Fri, 22 Mar 2024 11:55:52 GMT
Content-Length: 183

{
  "accessToken": "access token"
}
  
```

### product

#### Get Products
<p>Get all products</p>

##### Request
```http
GET /products/
```

```sh
curl --request 'GET' --url 'http://localhost:3000/products/?category=popular&pageIndex=0' --header 'Authorization: Bearer YOUR_TOKEN'
```

##### Response

```http
HTTP/1.1 200 OK
Access-Control-Allow-Headers: *
Access-Control-Allow-Credentials: true
Vary: *
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET
Content-Type: application/json;charset=utf-8
Access-Control-Exposed-Headers: *
Date: Fri, 22 Mar 2024 14:35:40 GMT
Content-Length: 426

{
  "products": [
    {
      "id": "mz2nk6csoc6p2mewmfoya8s4",
      "name": "Floor Lamp with Reading Light",
      "image": "https://ucarecdn.com/b6d6ba6e-21e8-4781-9ffa-5249341267a1/FloorLampwithReadingLight.jpg",
      "priceInCents": 1299900
    }
  ],
  "pageIndex": 1,
  "perPage": 10,
  "totalCount": 1
}
  
```
#### Get Product By Id
<p>Get a product by id</p>

##### Request
```http
GET /products/:id
```

```sh
  curl --request 'GET'  --url 'http://localhost:3000/products/mz2nk6csoc6p2mewmfoya8s4' --header 'Authorization: Bearer YOUR_TOKEN'
```

##### Response

```http
HTTP/1.1 200 OK
Access-Control-Allow-Headers: *
Access-Control-Allow-Credentials: true
Vary: *
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET
Content-Type: application/json;charset=utf-8
Access-Control-Exposed-Headers: *
Date: Sat, 23 Mar 2024 17:17:27 GMT
Content-Length: 337

{
  "id": "mz2nk6csoc6p2mewmfoya8s4",
  "name": "Floor Lamp with Reading Light",
  "image": "https://ucarecdn.com/b6d6ba6e-21e8-4781-9ffa-5249341267a1/FloorLampwithReadingLight.jpg",
  "pricePriceInCents": 1299900,
  "description": "Versatile floor lamp with an adjustable reading light for added functionality.",
  "review": 1,
  "rating": 1,
  "isFavorite": false
}
```

### Cart

#### Add Product to Cart
<p>Add a product to cart</p>

##### Request
```http
POST /cart/
```

```sh
curl --request 'POST' --url 'http://localhost:3000/cart/' --header 'Authorization: Bearer YOUR_TOKEN' --header 'Content-Type: application/json' --data '{ "items": [{"productId": "mz2nk6csoc6p2mewmfoya8s4", "quantity": 1 }] }'
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
Date: Sat, 23 Mar 2024 17:17:27 GMT
Content-Length: 0
```

#### Update Product in Cart
<p>Update a product in cart</p>

##### Request

```http
PUT /cart/{productId}
```

```sh
curl --request 'PUT' --url 'http://localhost:3000/cart/mz2nk6csoc6p2mewmfoya8s4' --header 'Authorization: Bearer YOUR_TOKEN' --header 'Content-Type: application/json' --data '{ "quantity": 2 }'
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
Date: Sat, 23 Mar 2024 17:17:27 GMT
Content-Length: 0
```

#### Get Cart
<p>Get cart items</p>

##### Request

```http
GET /cart/
```

```sh
curl --request 'GET' --url 'http://localhost:3000/cart/?pageIndex=0' --header 'Authorization: Bearer YOUR_TOKEN'
```

##### Response

```http
HTTP/1.1 200 OK
Access-Control-Allow-Headers: *
Access-Control-Allow-Credentials: true
Vary: *
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET
Content-Type: application/json;charset=utf-8
Access-Control-Exposed-Headers: *
Date: Sat, 23 Mar 2024 21:43:42 GMT
Content-Length: 297

{
  "products": [
    {
      "name": "Floor Lamp with Reading Light",
      "id": "mz2nk6csoc6p2mewmfoya8s4",
      "image": "https://ucarecdn.com/b6d6ba6e-21e8-4781-9ffa-5249341267a1/FloorLampwithReadingLight.jpg",
      "priceInCents": 1299900,
      "stock": 10,
      "quantity": 1
    }
  ],
  "totalInCents": 1299900,
  "pageIndex": 0,
  "perPage": 10,
  "totalCount": 1
}
```

#### Get Cart price 

##### Request

```http
GET /cart/price
```

```sh
curl --request 'GET' --url 'http://localhost:3000/cart/price' --header 'Authorization: Bearer YOUR_TOKEN'
```

##### Response

```http
HTTP/1.1 200 OK
Access-Control-Allow-Headers: *
Access-Control-Allow-Credentials: true
Vary: *
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET
Content-Type: application/json;charset=utf-8
Access-Control-Exposed-Headers: *
Date: Sat, 23 Mar 2024 21:43:42 GMT
Content-Length: 121

{
  "totalInCents": 1299900
}
```

#### Delete Cart Ptoduct
<p>Delete a product from cart</p>

##### Request

```http
DELETE /cart/{productId}
```

```sh
curl --request 'DELETE' --url 'http://localhost:3000/cart/mz2nk6csoc6p2mewmfoya8s4' --header 'Authorization: Bearer YOUR_TOKEN'
```

##### Response

```http
HTTP/1.1 204 No Content
Access-Control-Allow-Headers: *
Access-Control-Allow-Credentials: true
Vary: *
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: DELETE
Access-Control-Exposed-Headers: *
Date: Sat, 23 Mar 2024 21:43:42 GMT
Content-Length: 0
```

### Favorites

#### Add Product to Favorite

<p>Add a product to favorite</p>

##### Request

```http
POST /favorites/{productId}
```

```sh
curl --request 'POST' --url 'http://localhost:3000/favorites/mz2nk6csoc6p2mewmfoya8s4' --header 'Authorization: Bearer YOUR_TOKEN'
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
Date: Sat, 23 Mar 2024 21:43:42 GMT
Content-Length: 0
```

#### Remove Product from Favorite

<p>Remove a product from favorite</p>

##### Request

```http
DELETE /favorites/{productId}
```

```sh
curl --request 'DELETE' --url 'http://localhost:3000/favorites/mz2nk6csoc6p2mewmfoya8s4' --header 'Authorization: Bearer YOUR_TOKEN'
```

##### Response

```http
HTTP/1.1 204 No Content
Access-Control-Allow-Headers: *
Access-Control-Allow-Credentials: true
Vary: *
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: DELETE
Access-Control-Exposed-Headers: *
Date: Sat, 23 Mar 2024 21:43:42 GMT
Content-Length: 0
```

#### Get Favorite Products

<p>Get favorite products</p>

##### Request

```http
GET /favorites/
```

```sh
curl --request 'GET' --url 'http://localhost:3000/favorites/?pageIndex=0' --header 'Authorization: Bearer YOUR_TOKEN'
```

##### Response

```http
HTTP/1.1 200 OK
Access-Control-Allow-Headers: *
Access-Control-Allow-Credentials: true
Vary: *
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET
Content-Type: application/json;charset=utf-8
Access-Control-Exposed-Headers: *
Date: Sat, 23 Mar 2024 21:43:42 GMT
Content-Length: 297

{
  "products": [
    {
      "name": "Floor Lamp with Reading Light",
      "id": "mz2nk6csoc6p2mewmfoya8s4",
      "image": "https://ucarecdn.com/b6d6ba6e-21e8-4781-9ffa-5249341267a1/FloorLampwithReadingLight.jpg",
      "priceInCents": 1299900,
    }
  ]
  "pageIndex": 0,
  "perPage": 10,
  "totalCount": 1
}
```

#### Move Products from Favorite to Cart

<p>Move a product from favorite to cart</p>

##### Request

```http
POST /favorites/cart
```

```sh
curl --request 'POST' --url 'http://localhost:3000/favorites/cart' --header 'Authorization: Bearer YOUR_TOKEN'
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
Date: Sat, 23 Mar 2024 21:43:42 GMT
Content-Length: 0
```

## License

This project is under the MIT license. See the [LICENSE](LICENSE) file for more details.
<br/>

Made with :heart: por [Edlâneo Manuel](https://github.com/EdlanioJ) :wave:




[Elysia]: https://img.shields.io/badge/Elysia.js-7b85eb?style=for-the-badge&logo=elysia&logoColor=ffffff
[Elysia-url]: https://elysiajs.com/

[Drizzle-Orm]: https://img.shields.io/badge/Drizzle_orm-c5f74f?style=for-the-badge&logo=drizzle-orm&logoColor=ffffff
[Drizzle-Orm-url]: https://elysiajs.com/