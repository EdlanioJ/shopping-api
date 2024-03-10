import { createId } from '@paralleldrive/cuid2'
import { pgTable, text } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { products } from './products'
import { categories } from './categories'

export const productCategories = pgTable('product_categories', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),

  productId: text('product_id')
    .notNull()
    .references(() => products.id, {
      onDelete: 'cascade',
    }),

  categoryId: text('category_id')
    .notNull()
    .references(() => categories.id, {
      onDelete: 'cascade',
    }),
})

export const productCategoriesRelations = relations(
  productCategories,
  ({ one }) => ({
    category: one(categories, {
      fields: [productCategories.categoryId],
      references: [categories.id],
    }),
    product: one(products, {
      fields: [productCategories.productId],
      references: [products.id],
    }),
  }),
)
