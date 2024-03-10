import chalk from 'chalk'
import { db } from './connection'
import { categories, productCategories, products } from './schema'

await db.delete(productCategories)
await db.delete(categories)
await db.delete(products)
console.log(chalk.yellow('✔ Database reset'))

const cats = await db
  .insert(categories)
  .values([
    { name: 'Popular', slug: 'popular' },
    { name: 'Chair', slug: 'chair' },
    { name: 'Table', slug: 'table' },
    { name: 'Armchair', slug: 'armchair' },
    { name: 'Bed', slug: 'bed' },
    { name: 'Lamp', slug: 'lamp' },
  ])
  .returning()

console.log(chalk.yellow('✔ Created categories'))

const armchairProducts = await db
  .insert(products)
  .values([
    {
      name: 'Mid-Century Modern Sleeper Sofa',
      image:
        'https://ucarecdn.com/ade17e3a-8e91-492f-970d-7b6036f10810/armchair.jpg',
      description:
        'Retro-inspired design with a fold-down back for overnight guests.',
      stock: 12,
      priceInCents: 2799900,
    },
    {
      name: 'Microfiber Reclining Sofa',
      image:
        'https://ucarecdn.com/6328ea67-e60f-44eb-8a70-763c6bc935f3/armchair2.jpg',
      description:
        'Plush microfiber upholstery with reclining seats for ultimate relaxation.',
      stock: 6,
      priceInCents: 2999900,
    },
    {
      name: 'Futon Sofa with Storage',
      image:
        'https://ucarecdn.com/ec38263b-54c5-484f-9d38-a9e5dd6639e5/sofa4.jpg',
      description:
        'Space-saving futon design with built-in storage compartments.',
      stock: 14,
      priceInCents: 1699900,
    },
    {
      name: 'Sectional Sofa with Ottoman',
      image:
        'https://ucarecdn.com/1830d196-6783-443a-b3aa-93f887d9da6a/sofa9.jpg',
      description:
        'Versatile sectional design with a matching ottoman for added comfort.',
      stock: 10,
      priceInCents: 2499900,
    },
    {
      name: 'Modern Gray Sofa',
      image:
        'https://ucarecdn.com/530c1ac7-5fc9-4757-af57-7acd83d218e6/sofa7.jpg',
      description:
        'Contemporary design with comfortable cushions and sleek lines.',
      stock: 25,
      priceInCents: 1299900,
    },
    {
      name: 'Linen Convertible Sofa Bed',
      image:
        'https://ucarecdn.com/d76ea4b3-fc74-4550-a1e3-14fe2e6a40b9/sofa5.jpg',
      description:
        'Multifunctional sofa that transforms into a comfortable bed.',
      stock: 8,
      priceInCents: 2199900,
    },
    {
      name: 'Velvet Loveseat',
      image:
        'https://ucarecdn.com/e4b52df0-1679-41a2-8e13-39fa70602d00/Downloaderla65cd12d7e4bc8.jpg',
      description: 'Luxurious velvet upholstery perfect for cozy evenings.',
      stock: 20,
      priceInCents: 1599900,
    },
    {
      name: 'Classic Leather Sofa',
      image:
        'https://ucarecdn.com/65abd4e2-beb4-41f3-84c8-00eca5be8f7d/Downloaderla65d4eda296893.jpg',
      description: 'Timeless elegance with genuine leather upholstery.',
      stock: 15,
      priceInCents: 1899900,
    },
    {
      name: 'Tufted Chesterfield Sofa',
      image:
        'https://ucarecdn.com/d7d210d5-6058-4757-8c46-d34fbd508ee8/Downloaderla65d4ee1f82ece.jpg',
      description:
        'Classic tufted design with rolled arms for a sophisticated look.',
      stock: 18,
      priceInCents: 1999900,
    },
  ])
  .returning()

console.log(chalk.yellow('✔ Created armmchair products'))

const chairProducts = await db
  .insert(products)
  .values([
    {
      name: 'Eames Style Lounge Chair',
      image:
        'https://ucarecdn.com/c9ed7262-80b4-4d36-8d35-7dda1fabb7d8/styledchair.jpg',
      description:
        'Iconic mid-century modern design with premium leather upholstery.',
      priceInCents: 2499900,
      stock: 10,
    },
    {
      name: 'Scandinavian Dining Chair',
      image:
        'https://ucarecdn.com/09b1f701-51ac-4189-8354-7c0d2d392343/chair9.jpg',
      description: 'Minimalist yet stylish chair crafted from solid wood.',
      priceInCents: 1199900,
      stock: 15,
    },
    {
      name: 'Velvet Accent Chair',
      image:
        'https://ucarecdn.com/1494be5b-b692-4455-bd66-c773eb49ba7e/velvet.jpg',
      description:
        'Plush velvet chair with a modern design, perfect for any room.',
      priceInCents: 899900,
      stock: 20,
    },
    {
      name: 'Leather Recliner Chair',
      image:
        'https://ucarecdn.com/a275d9e4-e3ed-4700-90c6-fc0073d87e49/leatherchair.jpg',
      description:
        'Luxurious recliner chair with genuine leather upholstery for ultimate comfort.',
      priceInCents: 3199900,
      stock: 8,
    },
    {
      name: 'Wicker Patio Chair Set',
      image:
        'https://ucarecdn.com/06b4751e-5a5d-40be-9194-98c0a4ed8c5a/wickerpatiochair.jpg',
      description: 'Durable outdoor chairs made from weather-resistant wicker.',
      priceInCents: 1999900,
      stock: 12,
    },
  ])
  .returning()

console.log(chalk.yellow('✔ Created chair products'))

const tableProducts = await db
  .insert(products)
  .values([
    {
      name: 'Wooden Dining Table',
      image:
        'https://ucarecdn.com/30b58abf-e7b6-4f96-8ed2-b250fdcfb068/woodentable.jpg',
      description: 'Solid wood dining table suitable for family gatherings.',
      priceInCents: 8999900,
      stock: 15,
    },
    {
      name: 'Glass Coffee Table',
      image:
        'https://ucarecdn.com/b9438b87-a932-4f49-8199-d4cf755d0603/glasstable.jpg',
      description: 'Sleek glass coffee table with a modern design.',
      priceInCents: 4999900,
      stock: 10,
    },
    {
      name: 'Marble Console Table',
      image:
        'https://ucarecdn.com/27224dfc-a9e8-4c5f-90b8-9e1d8b86c4c2/marbletable.jpg',
      description:
        'Luxurious marble console table ideal for entryways or living rooms.',
      priceInCents: 14999900,
      stock: 5,
    },
    {
      name: 'Folding Outdoor Table',
      image:
        'https://ucarecdn.com/aa258ac5-f9b2-4f48-8e95-af4a7ab7ef2d/foldingtable.jpg',
      description:
        'Portable outdoor table perfect for picnics or camping trips.',
      priceInCents: 799900,
      stock: 20,
    },
  ])
  .returning()

console.log(chalk.yellow('✔ Created table products'))

const bedProducts = await db
  .insert(products)
  .values([
    {
      name: 'King Size Upholstered Bed',
      image:
        'https://ucarecdn.com/95dc784e-ed28-4ae0-bc34-299f8589994c/KingSizebed.jpg',
      description:
        'Elegant king-size bed with luxurious upholstery for added comfort.',
      priceInCents: 18999900,
      stock: 8,
    },
    {
      name: 'Queen Platform Bed',
      image:
        'https://ucarecdn.com/24ecd944-9501-4730-a402-f8d4eb1a0ef9/QueenPlatformBed.jpg',
      description:
        'Modern queen-size platform bed with sleek lines and built-in storage.',
      priceInCents: 13999900,
      stock: 12,
    },
    {
      name: 'Twin Trundle Bed',
      image:
        'https://ucarecdn.com/29aa12f5-7bf0-417d-a821-a48292a70836/TwinTrundleBed.jpg',
      description:
        "Space-saving twin-size trundle bed perfect for kids' rooms or guest rooms.",
      priceInCents: 9999000,
      stock: 15,
    },
    {
      name: 'Canopy Bed with Curtains',
      image:
        'https://ucarecdn.com/b81588a1-3ea4-4398-bcdd-b0cd1d9dfcba/CanopyBedwithCurtains.jpg',
      description:
        'Romantic canopy bed with flowing curtains for a dreamy atmosphere.',
      priceInCents: 22999900,
      stock: 6,
    },
    {
      name: 'Storage Loft Bed',
      image:
        'https://ucarecdn.com/6d452eb3-8928-4a5f-9f67-fa8ac08582b6/StorageLoftBed.jpg',
      description:
        'Versatile loft bed with built-in storage drawers and shelves underneath.',
      priceInCents: 17999900,
      stock: 10,
    },
  ])
  .returning()

console.log(chalk.yellow('✔ Created bed products'))

const lampProducts = await db
  .insert(products)
  .values([
    {
      name: 'Modern Desk Lamp',
      image:
        'https://ucarecdn.com/d2b066bd-e9b8-4adc-b0fe-779e192511cf/ModernDeskLamp.jpg',
      description:
        'Sleek and minimalist desk lamp with adjustable brightness settings.',
      priceInCents: 499900,
      stock: 20,
    },
    {
      name: 'Tiffany Style Table Lamp',
      image:
        'https://ucarecdn.com/27a27f1b-7733-41f4-ad40-d37c4231ff40/TiffanyStyleTableLamp.jpg',
      description:
        'Stained glass table lamp inspired by the Art Nouveau movement.',
      priceInCents: 999900,
      stock: 15,
    },
    {
      name: 'Floor Lamp with Reading Light',
      image:
        'https://ucarecdn.com/b6d6ba6e-21e8-4781-9ffa-5249341267a1/FloorLampwithReadingLight.jpg',
      description:
        'Versatile floor lamp with an adjustable reading light for added functionality.',
      priceInCents: 1299900,
      stock: 10,
    },
    {
      name: 'Industrial Pendant Lamp',
      image:
        'https://ucarecdn.com/3363a09f-9f41-4585-a0e7-6a935d7f2d33/IndustrialPendantLamp.jpg',
      description:
        'Rustic pendant lamp with an industrial design, perfect for kitchens or dining areas.',
      priceInCents: 899900,
      stock: 12,
    },
    {
      name: 'Crystal Chandelier',
      image:
        'https://ucarecdn.com/99060cf3-49f8-4542-b766-ad047d181279/CrystalChandelier.jpg',
      description:
        'Elegant crystal chandelier with sparkling prisms for a touch of luxury.',
      priceInCents: 2499900,
      stock: 8,
    },
    {
      name: 'Adjustable LED Floor Lamp',
      image:
        'https://ucarecdn.com/7a7d8882-7855-4c34-b81c-031c82c6696c/AdjustableLEDFloorLamp.jpg',
      description:
        'Energy-efficient LED floor lamp with adjustable height and brightness levels.',
      priceInCents: 1699900,
      stock: 10,
    },
    {
      name: 'Himalayan Salt Lamp',
      image:
        'https://ucarecdn.com/b6163856-882c-4d3c-9cf0-c417e3774288/HimalayanSaltLamp.jpg',
      description:
        'Natural Himalayan salt lamp that emits a warm and soothing glow.',
      priceInCents: 799900,
      stock: 20,
    },
  ])
  .returning()

console.log(chalk.yellow('✔ Created lamp products'))

const popularCategoryId = cats.find(
  (category) => category.slug === 'popular',
)?.id
const armchairCategoryId = cats.find(
  (category) => category.slug === 'armchair',
)?.id
const chairCategoryId = cats.find((category) => category.slug === 'chair')?.id
const tableCategoryId = cats.find((category) => category.slug === 'table')?.id
const bedCategoryId = cats.find((category) => category.slug === 'bed')?.id
const lampCategoryId = cats.find((category) => category.slug === 'lamp')?.id

if (armchairCategoryId) {
  await db.insert(productCategories).values(
    armchairProducts.map((product) => ({
      productId: product.id,
      categoryId: armchairCategoryId,
    })),
  )

  console.log(chalk.yellow('✔ Created link armchair to category'))
}

if (chairCategoryId) {
  await db.insert(productCategories).values(
    chairProducts.map((product) => ({
      productId: product.id,
      categoryId: chairCategoryId,
    })),
  )
  console.log(chalk.yellow('✔ Created link chair products to category'))
}

if (tableCategoryId) {
  await db.insert(productCategories).values(
    tableProducts.map((product) => ({
      productId: product.id,
      categoryId: tableCategoryId,
    })),
  )

  console.log(chalk.yellow('✔ Created link table to category'))
}

if (bedCategoryId) {
  await db.insert(productCategories).values(
    bedProducts.map((product) => ({
      productId: product.id,
      categoryId: bedCategoryId,
    })),
  )

  console.log(chalk.yellow('✔ Created link bed products to category'))
}

if (lampCategoryId) {
  await db.insert(productCategories).values(
    lampProducts.map((product) => ({
      productId: product.id,
      categoryId: lampCategoryId,
    })),
  )

  console.log(chalk.yellow('✔ Created link lamp products to category'))
}

if (popularCategoryId) {
  await db.insert(productCategories).values([
    { productId: armchairProducts[0].id, categoryId: popularCategoryId },
    { productId: lampProducts[2].id, categoryId: popularCategoryId },
    { productId: chairProducts[0].id, categoryId: popularCategoryId },
    { productId: tableProducts[0].id, categoryId: popularCategoryId },
    { productId: armchairProducts[1].id, categoryId: popularCategoryId },
    { productId: chairProducts[2].id, categoryId: popularCategoryId },
    { productId: bedProducts[0].id, categoryId: popularCategoryId },
    { productId: tableProducts[3].id, categoryId: popularCategoryId },
    { productId: lampProducts[4].id, categoryId: popularCategoryId },
    { productId: bedProducts[3].id, categoryId: popularCategoryId },
    { productId: armchairProducts[3].id, categoryId: popularCategoryId },
    { productId: lampProducts[0].id, categoryId: popularCategoryId },
  ])

  console.log(
    chalk.yellow('✔ Created popular products link to popular category'),
  )
}

console.log(chalk.greenBright('Database seeded successfully!'))
process.exit()
