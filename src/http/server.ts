import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'
import { Elysia } from 'elysia'

import { login } from './routes/login'
import { upload } from './routes/upload'
import { getCart } from './routes/get-cart'
import { checkout } from './routes/checkout'
import { register } from './routes/register'
import { getOrders } from './routes/get-orders'
import { addAdress } from './routes/add-address'
import { getProfile } from './routes/get-profile'
import { getProducts } from './routes/get-products'
import { addCartItems } from './routes/add-cart-items'
import { getFavorites } from './routes/get-favorites'
import { updateProfile } from './routes/update-profile'
import { addOrderItems } from './routes/add-order-items'
import { getCategories } from './routes/get-categories'
import { getOrderCount } from './routes/get-order-count'
import { removeFavorite } from './routes/remove-favorite'
import { getUserReviews } from './routes/get-user-reviews'
import { updateCartItem } from './routes/update-cart-item'
import { removeCartItem } from './routes/remove-cart-item'
import { getReviewsCount } from './routes/get-reviews-count'
import { getUserAddresses } from './routes/get-user-addresses'
import { getProductDetails } from './routes/get-product-details'
import { getAddressesCount } from './routes/get-addresses-count'
import { getProductReviews } from './routes/get-product-reviews'
import { getCartTotalPrice } from './routes/get-cart-total-price'
import { addFavoriteProduct } from './routes/add-favorite-product'
import { addFavoritesToCart } from './routes/add-favorites-to-cart'
import { createPaymentIntent } from './routes/create-payment-intent'
import { getUserNotifications } from './routes/get-user-notifications'
import { getUserShippingAddress } from './routes/get-user-shipping-address'
import { updateUserShippingAddress } from './routes/update-user-shipping-address'
import { env } from '@/env'

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      documentation: {
        info: {
          title: 'Shopping API Documentation',
          version: '1.0.0',
        },
      },
      path: '/docs',
    }),
  )
  .group('/auth', (router) => router.use(login).use(register))
  .group('/addresses', (router) =>
    router
      .use(addAdress)
      .use(getUserAddresses)
      .use(getAddressesCount)
      .use(getUserShippingAddress)
      .use(updateUserShippingAddress),
  )
  .group('/cart', (router) =>
    router
      .use(getCart)
      .use(addCartItems)
      .use(updateCartItem)
      .use(removeCartItem)
      .use(getCartTotalPrice),
  )
  .group('/favorites', (router) =>
    router
      .use(getFavorites)
      .use(removeFavorite)
      .use(addFavoriteProduct)
      .use(addFavoritesToCart),
  )
  .group('/orders', (router) =>
    router.use(getOrders).use(addOrderItems).use(getOrderCount),
  )
  .group('/products', (router) =>
    router.use(getProducts).use(getProductDetails).use(getProductReviews),
  )
  .group('/reviews', (router) =>
    router.use(getUserReviews).use(getReviewsCount),
  )
  .group('/profile', (router) => router.use(getProfile).use(updateProfile))
  .use(upload)
  .use(checkout)
  .use(getCategories)
  .use(createPaymentIntent)
  .use(getUserNotifications)

const port = env.PORT
app.listen(port)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
