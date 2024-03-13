import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'
import { Elysia } from 'elysia'

import { login } from './routes/login'
import { getCart } from './routes/get-cart'
import { checkout } from './routes/checkout'
import { register } from './routes/register'
import { getOrders } from './routes/get-orders'
import { addAdress } from './routes/add-address'
import { getProfile } from './routes/get-profile'
import { getProducts } from './routes/get-products'
import { addCartItems } from './routes/add-cart-items'
import { getFavorites } from './routes/get-favorites'
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

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      documentation: {
        info: {
          title: 'Shopping Documentation',
          version: '1.0.0',
        },
      },
    }),
  )
  .use(login)
  .use(getCart)
  .use(checkout)
  .use(register)
  .use(getOrders)
  .use(addAdress)
  .use(getProfile)
  .use(getProducts)
  .use(addCartItems)
  .use(getFavorites)
  .use(addOrderItems)
  .use(getCategories)
  .use(getOrderCount)
  .use(getUserReviews)
  .use(removeFavorite)
  .use(updateCartItem)
  .use(removeCartItem)
  .use(getReviewsCount)
  .use(getUserAddresses)
  .use(getCartTotalPrice)
  .use(getProductDetails)
  .use(getProductReviews)
  .use(getAddressesCount)
  .use(addFavoriteProduct)
  .use(addFavoritesToCart)
  .use(createPaymentIntent)
  .use(getUserNotifications)
  .use(getUserShippingAddress)
  .use(updateUserShippingAddress)

app.listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
