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
  "accessToken": "…"
}
  
```

### Addresses

#### Get Addresses
<p>Get all addresses</p>

##### Request
```http
GET /addresses/
```

```sh
curl --request 'GET' --url 'http://localhost:3000/addresses/' --header 'Authorization: Bearer YOUR_TOKEN'
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
  "addresses": [
    {
      "id": "…",
      "name": "…",
      "address": {
        "street": "…",
        "city": "…",
        "state": "…",
        "zipCode": "…",
        "country": "…"
      }
    }
  ],
  "shippingAddress": "…"
}
```

#### Add Address
<p>Add a new address</p>

##### Request
```http
POST /addresses/
```

```sh
curl --request 'POST' --url 'http://localhost:3000/addresses/' --header 'Content-Type: application/json' --header 'Authorization: Bearer YOUR_TOKEN' --data '{ "name": "Foo", "street": "123 Fake St", "city": "Fake City", "state": "Fake State", "country": "Fake Country", "zipCode": "12345" }'
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
Date: Fri, 22 Mar 2024 14:35:40 GMT
Content-Length: 0
```

#### Count Addresses
<p>Count all addresses</p>

##### Request
```http
GET /addresses/count
```

```sh
curl --request 'GET' --url 'http://localhost:3000/addresses/count' --header 'Authorization: Bearer YOUR_TOKEN'
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
Content-Length: 12

{
  "count": 1
}
```

#### Get Shipping Address

<p>Get shipping address</p>

##### Request

```http
GET /addresses/shipping
```

```sh
curl --request 'GET' --url 'http://localhost:3000/addresses/shipping' --header 'Authorization: Bearer YOUR_TOKEN'
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
  "id": "…",
  "name": "…",
  "address": {
    "street": "…",
    "city": "…",
    "state": "…",
    "zipCode": null,
    "country": null
  }
}
```

#### Update Shipping Address

<p>Update shipping address</p>

##### Request

```http
PUT /addresses/shipping/{addressId}
```

```sh
curl --request 'PUT' --url 'http://localhost:3000/addresses/shipping/mz2nk6csoc6p2mewmfoya8s4'
```

##### Response

```http
HTTP/1.1 204 No Content
Access-Control-Allow-Headers: *
Access-Control-Allow-Credentials: true
Vary: *
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: PUT
Access-Control-Exposed-Headers: *
Date: Fri, 22 Mar 2024 14:35:40 GMT
Content-Length: 0
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
      "id": "…",
      "name": "…",
      "image": "…",
      "stock": 1,
      "quantity": 1,
      "priceInCents": 1
    }
  ],
  "totalInCents": 0,
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
  "totalInCents": 0
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
      "id": "…",
      "name": "…",
      "image": "…",
      "priceInCents": 1
    }
  ],
  "pageIndex": 1,
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

### Orders

#### Get Orders

<p>Get all orders</p>

##### Request

```http
GET /orders/
```

```sh
curl --request 'GET' --url 'http://localhost:3000/orders/?status=processing&pageIndex=0' --header 'Authorization: Bearer YOUR_TOKEN'
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
  "orders": [
    {
      "id": "…",
      "status": "…",
      "totalInCents": 1,
      "createdAt": "…",
      "quantity": 1
    }
  ],
  "pageIndex": 0,
  "perPage": 10,
  "totalCount": 1
}
```

#### Add Order Items

<p>Add order items</p>

##### Request

```http
POST /orders/
```

```sh
curl --request 'POST' --url 'http://localhost:3000/' --header 'Content-Type: application/json' --header 'Authorization: Bearer YOUR_TOKEN' --data '{ "items": [{ "productId": "mz2nk6csoc6p2mewmfoya8s4", "quantity": 1 }] }'
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

#### Count Orders

<p>Count all orders</p>

##### Request

```http
GET /orders/count
```

```sh
curl --request 'GET' --url 'http://localhost:3000/orders/count' --header 'Authorization: Bearer YOUR_TOKEN'
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
  "count": 1
}
```

### Products

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
      "id": "…",
      "name": "…",
      "image": "…",
      "priceInCents": 0
    }
  ],
  "pageIndex": 0,
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
  "id": "…",
  "name": "…",
  "image": "…",
  "pricePriceInCents": 1,
  "description": null,
  "review": 1,
  "rating": 1,
  "isFavorite": true
}
```

#### Product Reviews

##### Request

```http
GET /products/:id/reviews
```

```sh
curl --request 'GET'  --url 'http://localhost:3000/products/mz2nk6csoc6p2mewmfoya8s4/reviews?pageIndex=0' --header 'Authorization: Bearer YOUR_TOKEN'
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
  "product": {
    "id": "…",
    "name": "…",
    "image": "…",
    "reviewsCount": 0,
    "ratingAvg": 0
  },
  "reviews": [
    {
      "id": "…",
      "userName": "…",
      "rating": 1,
      "comment": "…",
      "createdAt": "…"
    }
  ],
  "pageIndex": 0,
  "perPage": 10
}
```


### Reviews

#### Get User Reviews

<p>Get all reviews of a user</p>

##### Request

```http
GET /reviews/me
```

```sh
curl --request 'GET' --url 'http://localhost:3000/reviews/me?pageIndex=0' --header 'Authorization: Bearer YOUR_TOKEN'
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
  "reviews": [
    {
      "id": "…",
      "rating": 0,
      "comment": "…",
      "productName": "…",
      "createdAt": null,
      "productId": "…",
      "productImage": "…"
    }
  ],
  "pageIndex": 0,
  "perPage": 10,
  "totalCount": 1
}
```

#### Get Reviews Count

<p>Get the count of all reviews of a user</p>

##### Request

```http
GET /reviews/count
```

```sh
curl --request 'GET' --url 'http://localhost:3000/reviews/count' --header 'Authorization: Bearer YOUR_TOKEN'
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
  "count": 1
}
```

### Profile

#### Get User Profile

<p>Get the user profile</p>

##### Request

```http
GET /profile/
```

```sh
curl --request 'GET' --url 'http://localhost:3000/profile/' --header 'Authorization: Bearer YOUR_TOKEN'
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
  "id": "…",
  "name": "…",
  "imageUrl": null,
  "email": "…"
}
```

#### Update Profile

<p>Update the user profile</p>

##### Request

```http
PATCH /profile/
```

```sh
  curl --request 'PATCH' --url 'http://localhost:3000/profile/' --header 'Authorization: Bearer YOUR_TOKEN' --data '{ "name": "…", "imageUrl": "…" }'
```

##### Response

```http
HTTP/1.1 204 No Content
Access-Control-Allow-Headers: *
Access-Control-Allow-Credentials: true
Vary: *
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: PATCH
Access-Control-Exposed-Headers: *
Date: Sat, 23 Mar 2024 17:17:27 GMT
Content-Length: 0
```

### Upload

#### Upload Image

<p>Upload an image</p>

##### Request

```http
POST /upload
```

```sh
  curl --request 'POST' --url 'http://localhost:3000/upload' --header 'Authorization: Bearer YOUR_TOKEN' --header 'Content-Type: multipart/form-data' --form 'file=@path/to/file.jpg'
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
Date: Sat, 23 Mar 2024 17:17:27 GMT
Content-Length: 337

{
  "uuid": "…",
  imageUrl: "…"
}
```

### Payment

#### Create intents

<p>Create a payment intent</p>

##### Request

```http
  POST /payment/intents
```

```sh
curl --request 'POST' --url 'http://localhost:3000/payment/intents' --header 'Authorization: Bearer YOUR_TOKEN' --data '{ "amount": 100000 }'
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
Date: Sat, 23 Mar 2024 17:17:27 GMT
Content-Length: 337

{
  "paymentIntent": "…",
  "ephemeralKey": "…",
  "customerId": "…"
}
```


### Notifications

#### Get Notifications

<p>Get all notifications of a user</p>

##### Request

```http
GET /notifications
```

```sh
curl --request 'GET' --url 'http://localhost:3000/notifications?pageIndex=0' --header 'Authorization: Bearer YOUR_TOKEN'
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
  "notifications": [
    {
      "id": "…",
      "type": "…",
      "isOpened": null,
      "createdAt": null,
      "userId": null,
      "data": null
    }
  ],
  "pageIndex": 1,
  "perPage": 1,
  "totalCount": 1
}
```

### Checkout

#### Create Checkout

<p>Create a checkout </p>

##### Request

```http
POST /checkout
```

```sh
curl --request 'POST' --url 'http://localhost:3000/checkout' --header 'Authorization: Bearer YOUR_TOKEN'
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

### Categories

#### Get All Categories

<p>Get all categories</p>

##### Request

```http
GET /categories
```

```sh
curl --request 'GET' --url 'http://localhost:3000/categories'
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

[
  {
    "name": "…",
    "id": "…",
    "createdAt": null,
    "updatedAt": null,
    "slug": "…"
  }
]
```

## License

This project is under the MIT license. See the [LICENSE](LICENSE) file for more details.
<br/>

Made with :heart: por [Edlâneo Manuel](https://github.com/EdlanioJ) :wave:




[Elysia]: https://img.shields.io/badge/Elysia.js-7b85eb?style=for-the-badge&logo=elysia&logoColor=ffffff
[Elysia-url]: https://elysiajs.com/

[Drizzle-Orm]: https://img.shields.io/badge/Drizzle_orm-c5f74f?style=for-the-badge&logo=drizzle-orm&logoColor=ffffff
[Drizzle-Orm-url]: https://elysiajs.com/