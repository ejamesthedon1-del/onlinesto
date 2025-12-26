'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/navigation'

const AdminContainer = styled.div`
  min-height: 100vh;
  padding: ${props => props.theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
`

const AdminHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`

const Title = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['4xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`

const Label = styled.label`
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
`

const Input = styled.input`
  padding: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.typography.fontSize.base};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
  }
`

const TextArea = styled.textarea`
  padding: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.typography.fontSize.base};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  min-height: 100px;
  resize: vertical;
  font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
  }
`

const Select = styled.select`
  padding: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.typography.fontSize.base};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
  }
`

const TagInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  min-height: 50px;
`

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.text};
  color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
`

const RemoveTag = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.background};
  cursor: pointer;
  font-size: ${props => props.theme.typography.fontSize.sm};
  padding: 0;
  margin-left: ${props => props.theme.spacing.xs};
  
  &:hover {
    opacity: 0.7;
  }
`

const TagInputField = styled.input`
  border: none;
  outline: none;
  flex: 1;
  min-width: 100px;
  font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`

const Button = styled.button`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.background};
  background-color: ${props => props.theme.colors.text};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: all ${props => props.theme.transitions.normal} ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const Message = styled.div`
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.type === 'success' ? props.theme.colors.success : props.theme.colors.error};
  color: ${props => props.theme.colors.background};
  font-size: ${props => props.theme.typography.fontSize.base};
`

const ImageInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`

const ImageUrl = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  align-items: center;
`

const RemoveImage = styled.button`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.error};
  color: ${props => props.theme.colors.background};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  font-size: ${props => props.theme.typography.fontSize.sm};
  
  &:hover {
    opacity: 0.8;
  }
`

const FileInput = styled.input`
  display: none;
`

const FileInputLabel = styled.label`
  padding: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.background};
  background-color: ${props => props.theme.colors.text};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: all ${props => props.theme.transitions.normal} ease;
  text-align: center;
  display: inline-block;
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const ImagePreview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.sm};
`

const PreviewImage = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.border};
`

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
`

const LoginBox = styled.div`
  background: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  max-width: 400px;
  width: 100%;
`

const LoginTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
`

const ErrorMessage = styled.div`
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.error};
  color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
`

const ProductListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
`

const ProductListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`

const ProductListTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
`

const ProductListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.theme.colors.border};
  gap: ${props => props.theme.spacing.md};
`

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  flex: 1;
`

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.sm};
  background: white;
`

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
  flex: 1;
`

const ProductName = styled.div`
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
`

const ProductMeta = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
`

const ProductActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`

const EditButton = styled(Button)`
  background-color: ${props => props.theme.colors.text};
  color: ${props => props.theme.colors.background};
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
  }
`

const CancelButton = styled(Button)`
  background-color: ${props => props.theme.colors.textSecondary};
  color: ${props => props.theme.colors.background};
  
  &:hover {
    opacity: 0.8;
  }
`

const EmptyState = styled.div`
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.md};
`

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  
  // Form state - must be declared before conditional return
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Tops',
    stock: '',
    featured: false,
    images: [],
    sizes: [],
    colors: [],
  })
  
  const [currentImageUrl, setCurrentImageUrl] = useState('')
  const [currentSize, setCurrentSize] = useState('')
  const [currentColor, setCurrentColor] = useState('')
  const [uploadingImage, setUploadingImage] = useState(false)
  const [products, setProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [editingProductId, setEditingProductId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  
  // Check if already authenticated
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_authenticated')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  // Fetch products when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts()
    }
  }, [isAuthenticated])

  const fetchProducts = async () => {
    setLoadingProducts(true)
    try {
      const response = await fetch('/api/products', { cache: 'no-store' })
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoadingProducts(false)
    }
  }

  const handleEdit = (product) => {
    setEditingProductId(product.id)
    setFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price?.toString() || '',
      category: product.category || 'Tops',
      stock: product.stock?.toString() || '',
      featured: product.featured || false,
      images: product.images || [],
      sizes: product.sizes || [],
      colors: product.colors || [],
    })
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAddNew = () => {
    setEditingProductId(null)
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'Tops',
      stock: '',
      featured: false,
      images: [],
      sizes: [],
      colors: [],
    })
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingProductId(null)
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'Tops',
      stock: '',
      featured: false,
      images: [],
      sizes: [],
      colors: [],
    })
  }
  
  const handleLogin = (e) => {
    e.preventDefault()
    // Simple password check - in production, use proper authentication
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'
    
    if (password === adminPassword) {
      setIsAuthenticated(true)
      sessionStorage.setItem('admin_authenticated', 'true')
      setLoginError('')
    } else {
      setLoginError('Incorrect password')
    }
  }
  
  if (!isAuthenticated) {
    return (
      <LoginContainer>
        <LoginBox>
          <LoginTitle>Admin Login</LoginTitle>
          {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
          <Form onSubmit={handleLogin}>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
              />
            </FormGroup>
            <Button type="submit">Login</Button>
          </Form>
        </LoginBox>
      </LoginContainer>
    )
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type - accept PNG and JPG/JPEG
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    const allowedExtensions = ['png', 'jpg', 'jpeg', 'webp']
    
    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      setMessage({ type: 'error', text: 'Please upload a PNG or JPG image file' })
      return
    }

    setUploadingImage(true)
    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      })

      const data = await response.json()

      if (response.ok) {
        setFormData(prev => ({
          ...prev,
          images: Array.isArray(prev.images) ? [...prev.images, data.url] : [data.url]
        }))
        setMessage({ type: 'success', text: 'Image uploaded successfully!' })
        setTimeout(() => setMessage(null), 3000)
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to upload image' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error uploading image: ' + error.message })
    } finally {
      setUploadingImage(false)
      // Reset file input
      e.target.value = ''
    }
  }

  const addImage = () => {
    if (currentImageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: Array.isArray(prev.images) ? [...prev.images, currentImageUrl.trim()] : [currentImageUrl.trim()]
      }))
      setCurrentImageUrl('')
    }
  }

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: Array.isArray(prev.images) ? prev.images.filter((_, i) => i !== index) : []
    }))
  }

  const addSize = () => {
    if (currentSize.trim()) {
      setFormData(prev => ({
        ...prev,
        sizes: Array.isArray(prev.sizes) ? [...prev.sizes, currentSize.trim()] : [currentSize.trim()]
      }))
      setCurrentSize('')
    }
  }

  const removeSize = (index) => {
    setFormData(prev => ({
      ...prev,
      sizes: Array.isArray(prev.sizes) ? prev.sizes.filter((_, i) => i !== index) : []
    }))
  }

  const addColor = () => {
    if (currentColor.trim()) {
      setFormData(prev => ({
        ...prev,
        colors: Array.isArray(prev.colors) ? [...prev.colors, currentColor.trim()] : [currentColor.trim()]
      }))
      setCurrentColor('')
    }
  }

  const removeColor = (index) => {
    setFormData(prev => ({
      ...prev,
      colors: Array.isArray(prev.colors) ? prev.colors.filter((_, i) => i !== index) : []
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        images: Array.isArray(formData.images) ? formData.images : [],
        sizes: Array.isArray(formData.sizes) ? formData.sizes : [],
        colors: Array.isArray(formData.colors) ? formData.colors : [],
      }

      let response
      if (editingProductId) {
        // Update existing product
        response = await fetch(`/api/products/${editingProductId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        })
      } else {
        // Create new product
        response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        })
      }

      const data = await response.json()

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: editingProductId ? 'Product updated successfully!' : 'Product added successfully!' 
        })
        // Reset form and refresh product list
        setFormData({
          name: '',
          description: '',
          price: '',
          category: 'Tops',
          stock: '',
          featured: false,
          images: [],
          sizes: [],
          colors: [],
        })
        setEditingProductId(null)
        setShowForm(false)
        fetchProducts()
      } else {
        setMessage({ 
          type: 'error', 
          text: data.error || (editingProductId ? 'Failed to update product' : 'Failed to add product') 
        })
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Error ' + (editingProductId ? 'updating' : 'adding') + ' product: ' + error.message 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminContainer>
      <AdminHeader>
        <Title>Admin Panel</Title>
      </AdminHeader>

      {message && (
        <Message type={message.type}>
          {message.text}
        </Message>
      )}

      <ProductListContainer>
        <ProductListHeader>
          <ProductListTitle>Products</ProductListTitle>
          <Button type="button" onClick={handleAddNew}>
            Add New Product
          </Button>
        </ProductListHeader>

        {loadingProducts ? (
          <EmptyState>Loading products...</EmptyState>
        ) : products.length === 0 ? (
          <EmptyState>No products found. Click "Add New Product" to create one.</EmptyState>
        ) : (
          products.map((product) => (
            <ProductListItem key={product.id}>
              <ProductInfo>
                <ProductImage 
                  src={product.images?.[0] || '/images/products/placeholder.jpg'} 
                  alt={product.name}
                />
                <ProductDetails>
                  <ProductName>{product.name}</ProductName>
                  <ProductMeta>
                    {product.category} • ${product.price} • Stock: {product.stock}
                    {product.featured && ' • Featured'}
                  </ProductMeta>
                </ProductDetails>
              </ProductInfo>
              <ProductActions>
                <EditButton type="button" onClick={() => handleEdit(product)}>
                  Edit
                </EditButton>
              </ProductActions>
            </ProductListItem>
          ))
        )}
      </ProductListContainer>

      {showForm && (
        <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Product Name *</Label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="e.g., Classic White T-Shirt"
          />
        </FormGroup>

        <FormGroup>
          <Label>Description *</Label>
          <TextArea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            placeholder="Product description..."
          />
        </FormGroup>

        <FormGroup>
          <Label>Price *</Label>
          <Input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
            placeholder="29.99"
          />
        </FormGroup>

        <FormGroup>
          <Label>Category *</Label>
          <Select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          >
            <option value="Tops">Tops</option>
            <option value="Bottoms">Bottoms</option>
            <option value="Outerwear">Outerwear</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Stock Quantity *</Label>
          <Input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            required
            placeholder="45"
          />
        </FormGroup>

        <FormGroup>
          <Label>Images</Label>
          <ImageInputGroup>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <FileInputLabel htmlFor="file-upload" style={{ margin: 0 }}>
                {uploadingImage ? 'Uploading...' : 'Upload PNG/JPG/Image'}
                <FileInput
                  id="file-upload"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleFileUpload}
                  disabled={uploadingImage}
                />
              </FileInputLabel>
              <div style={{ display: 'flex', gap: '8px', flex: 1, minWidth: '200px' }}>
                <Input
                  type="text"
                  value={currentImageUrl}
                  onChange={(e) => setCurrentImageUrl(e.target.value)}
                  placeholder="Or enter image URL"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addImage()
                    }
                  }}
                />
                <Button type="button" onClick={addImage}>Add URL</Button>
              </div>
            </div>
            {formData.images.length > 0 && (
              <ImagePreview>
                {formData.images.map((url, index) => (
                  <PreviewImage key={index}>
                    <PreviewImg src={url} alt={`Preview ${index + 1}`} />
                    <RemoveImage 
                      type="button" 
                      onClick={() => removeImage(index)}
                      style={{ 
                        position: 'absolute', 
                        top: '4px', 
                        right: '4px',
                        padding: '4px 8px',
                        fontSize: '12px'
                      }}
                    >
                      ×
                    </RemoveImage>
                  </PreviewImage>
                ))}
              </ImagePreview>
            )}
          </ImageInputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Sizes</Label>
          <TagInput>
            {formData.sizes.map((size, index) => (
              <Tag key={index}>
                {size}
                <RemoveTag type="button" onClick={() => removeSize(index)}>×</RemoveTag>
              </Tag>
            ))}
            <TagInputField
              type="text"
              value={currentSize}
              onChange={(e) => setCurrentSize(e.target.value)}
              placeholder="Add size (e.g., S, M, L)"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addSize()
                }
              }}
            />
          </TagInput>
        </FormGroup>

        <FormGroup>
          <Label>Colors</Label>
          <TagInput>
            {formData.colors.map((color, index) => (
              <Tag key={index}>
                {color}
                <RemoveTag type="button" onClick={() => removeColor(index)}>×</RemoveTag>
              </Tag>
            ))}
            <TagInputField
              type="text"
              value={currentColor}
              onChange={(e) => setCurrentColor(e.target.value)}
              placeholder="Add color (e.g., Black, White)"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addColor()
                }
              }}
            />
          </TagInput>
        </FormGroup>

        <CheckboxGroup>
          <Checkbox
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          />
          <Label>Featured Product</Label>
        </CheckboxGroup>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <CancelButton type="button" onClick={handleCancel} disabled={loading}>
              Cancel
            </CancelButton>
            <Button type="submit" disabled={loading}>
              {loading 
                ? (editingProductId ? 'Updating Product...' : 'Adding Product...') 
                : (editingProductId ? 'Update Product' : 'Add Product')
              }
            </Button>
          </div>
        </Form>
      )}
    </AdminContainer>
  )
}

