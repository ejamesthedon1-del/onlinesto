// Mock product data structure mirroring expected API response
export const products = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    description: 'A timeless classic white t-shirt made from 100% organic cotton. Perfect for everyday wear with a comfortable fit and durable construction.',
    price: 29.99,
    images: [
      '/images/products/tshirt-white-1.jpg',
      '/images/products/tshirt-white-2.jpg',
      '/images/products/tshirt-white-3.jpg',
    ],
    category: 'Tops',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White'],
    stock: 45,
    featured: true,
  },
  {
    id: '2',
    name: 'Slim Fit Denim Jeans',
    description: 'Modern slim-fit jeans crafted from premium denim. Features a comfortable stretch blend and classic five-pocket styling.',
    price: 79.99,
    images: [
      '/images/products/jeans-blue-1.jpg',
      '/images/products/jeans-blue-2.jpg',
    ],
    category: 'Bottoms',
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Blue', 'Black'],
    stock: 32,
    featured: true,
  },
  {
    id: '3',
    name: 'Wool Blend Sweater',
    description: 'Cozy wool blend sweater perfect for cooler weather. Soft to the touch with a relaxed fit and ribbed cuffs.',
    price: 89.99,
    images: [
      '/images/products/sweater-gray-1.jpg',
      '/images/products/sweater-gray-2.jpg',
    ],
    category: 'Tops',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Gray', 'Navy', 'Cream'],
    stock: 28,
    featured: true,
  },
  {
    id: '4',
    name: 'Leather Jacket',
    description: 'Premium genuine leather jacket with a classic biker style. Features multiple pockets and a comfortable lining.',
    price: 299.99,
    images: [
      '/images/products/jacket-leather-1.jpg',
      '/images/products/jacket-leather-2.jpg',
      '/images/products/jacket-leather-3.jpg',
    ],
    category: 'Outerwear',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Brown'],
    stock: 15,
    featured: false,
  },
  {
    id: '5',
    name: 'Cotton Chino Shorts',
    description: 'Versatile chino shorts made from breathable cotton. Perfect for warm weather with a modern fit and clean lines.',
    price: 39.99,
    images: [
      '/images/products/shorts-khaki-1.jpg',
      '/images/products/shorts-khaki-2.jpg',
    ],
    category: 'Bottoms',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Khaki', 'Navy', 'Olive'],
    stock: 52,
    featured: false,
  },
  {
    id: '6',
    name: 'Hooded Sweatshirt',
    description: 'Comfortable hooded sweatshirt with a relaxed fit. Made from soft cotton blend with a cozy fleece interior.',
    price: 59.99,
    images: [
      '/images/products/hoodie-black-1.jpg',
      '/images/products/hoodie-black-2.jpg',
    ],
    category: 'Tops',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Gray', 'Navy'],
    stock: 38,
    featured: true,
  },
  {
    id: '7',
    name: 'Tailored Blazer',
    description: 'Elegant tailored blazer perfect for business or casual occasions. Features a modern cut and premium fabric.',
    price: 149.99,
    images: [
      '/images/products/blazer-navy-1.jpg',
      '/images/products/blazer-navy-2.jpg',
    ],
    category: 'Outerwear',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy', 'Black', 'Gray'],
    stock: 22,
    featured: false,
  },
  {
    id: '8',
    name: 'Cargo Pants',
    description: 'Functional cargo pants with multiple pockets. Made from durable cotton twill with a relaxed fit.',
    price: 69.99,
    images: [
      '/images/products/pants-cargo-1.jpg',
      '/images/products/pants-cargo-2.jpg',
    ],
    category: 'Bottoms',
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Olive', 'Black', 'Khaki'],
    stock: 41,
    featured: false,
  },
  {
    id: '9',
    name: 'Polo Shirt',
    description: 'Classic polo shirt with a refined collar and three-button placket. Made from pique cotton for comfort.',
    price: 49.99,
    images: [
      '/images/products/polo-blue-1.jpg',
      '/images/products/polo-blue-2.jpg',
    ],
    category: 'Tops',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy', 'White', 'Gray'],
    stock: 35,
    featured: false,
  },
  {
    id: '10',
    name: 'Trench Coat',
    description: 'Timeless trench coat with a classic double-breasted design. Water-resistant fabric with a sophisticated silhouette.',
    price: 199.99,
    images: [
      '/images/products/coat-trench-1.jpg',
      '/images/products/coat-trench-2.jpg',
    ],
    category: 'Outerwear',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Beige', 'Black', 'Navy'],
    stock: 18,
    featured: true,
  },
  {
    id: '11',
    name: 'Athletic Joggers',
    description: 'Comfortable athletic joggers with an elastic waistband and tapered fit. Perfect for workouts or casual wear.',
    price: 54.99,
    images: [
      '/images/products/joggers-black-1.jpg',
      '/images/products/joggers-black-2.jpg',
    ],
    category: 'Bottoms',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Gray', 'Navy'],
    stock: 47,
    featured: false,
  },
  {
    id: '12',
    name: 'Flannel Shirt',
    description: 'Classic flannel shirt with a relaxed fit. Made from soft brushed cotton in timeless plaid patterns.',
    price: 44.99,
    images: [
      '/images/products/flannel-red-1.jpg',
      '/images/products/flannel-red-2.jpg',
    ],
    category: 'Tops',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red Plaid', 'Blue Plaid', 'Black Plaid'],
    stock: 29,
    featured: false,
  },
]

// Helper function to get product by ID
export function getProductById(id) {
  return products.find(product => product.id === id)
}

// Helper function to get products by category
export function getProductsByCategory(category) {
  return products.filter(product => product.category === category)
}

// Helper function to get featured products
export function getFeaturedProducts() {
  return products.filter(product => product.featured)
}

