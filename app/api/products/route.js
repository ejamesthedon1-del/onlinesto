import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const productsFilePath = path.join(process.cwd(), 'data', 'products.json')

// Helper function to read products from file
function readProducts() {
  try {
    if (fs.existsSync(productsFilePath)) {
      const fileData = fs.readFileSync(productsFilePath, 'utf8')
      return JSON.parse(fileData)
    }
    // Fallback to original products if file doesn't exist
    const { products } = require('@/data/products')
    return products
  } catch (error) {
    console.error('Error reading products:', error)
    const { products } = require('@/data/products')
    return products
  }
}

// Helper function to write products to file
function writeProducts(products) {
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(productsFilePath)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf8')
    return true
  } catch (error) {
    console.error('Error writing products:', error)
    return false
  }
}

// GET - Fetch all products
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    
    let products = readProducts()
    
    if (category) {
      products = products.filter(p => p.category === category)
    }
    
    if (featured === 'true') {
      products = products.filter(p => p.featured === true)
    }
    
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST - Create a new product
export async function POST(request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'description', 'price', 'category', 'stock']
    for (const field of requiredFields) {
      if (!body[field] && body[field] !== 0) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }
    
    // Read existing products
    const products = readProducts()
    
    // Generate new ID
    const maxId = products.length > 0 
      ? Math.max(...products.map(p => parseInt(p.id) || 0))
      : 0
    const newId = (maxId + 1).toString()
    
    // Create new product
    const newProduct = {
      id: newId,
      name: body.name,
      description: body.description,
      price: parseFloat(body.price),
      category: body.category,
      stock: parseInt(body.stock),
      images: body.images || [],
      sizes: body.sizes || [],
      colors: body.colors || [],
      featured: body.featured || false,
    }
    
    // Add to products array
    products.push(newProduct)
    
    // Write back to file
    const success = writeProducts(products)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to save product' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product: ' + error.message },
      { status: 500 }
    )
  }
}

