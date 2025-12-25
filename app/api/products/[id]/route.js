import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const productsFilePath = path.join(process.cwd(), 'data', 'products.json')

function readProducts() {
  try {
    if (fs.existsSync(productsFilePath)) {
      const fileData = fs.readFileSync(productsFilePath, 'utf8')
      return JSON.parse(fileData)
    }
    const { products } = require('@/data/products')
    return products
  } catch (error) {
    console.error('Error reading products:', error)
    const { products } = require('@/data/products')
    return products
  }
}

function writeProducts(products) {
  try {
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

// GET - Get single product by ID
export async function GET(request, { params }) {
  try {
    const products = readProducts()
    const product = products.find(p => p.id === params.id)
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

// PUT - Update product
export async function PUT(request, { params }) {
  try {
    const body = await request.json()
    const products = readProducts()
    const index = products.findIndex(p => p.id === params.id)
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    products[index] = {
      ...products[index],
      ...body,
      id: params.id, // Ensure ID doesn't change
    }
    
    const success = writeProducts(products)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update product' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(products[index])
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE - Delete product
export async function DELETE(request, { params }) {
  try {
    const products = readProducts()
    const filteredProducts = products.filter(p => p.id !== params.id)
    
    if (products.length === filteredProducts.length) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    const success = writeProducts(filteredProducts)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete product' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}

