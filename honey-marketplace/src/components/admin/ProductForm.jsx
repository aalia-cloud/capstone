import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../../contexts/ProductContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  ArrowLeft,
  Save,
  Loader2,
  Upload,
  X,
  AlertCircle,
  FileText,
  Shield,
  Package,
  Scale,
  DollarSign,
  Eye,
  Download
} from 'lucide-react';

const ProductForm = ({ mode = 'create' }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addProduct, updateProduct, getProduct, isLoading, error } = useProducts();
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    origin: '',
    harvestSeason: '',
    quality: '',
    category: '',
    image: '',
    hasNFT: false,
    inStock: true,
    // New lab test field
    labTestFile: null,
    // New selling type fields
    sellingType: 'jar', // 'jar' or 'kilo'
    // For jar selling
    weightPerJar: '',
    weightUnit: 'grams',
    availableQuantity: '',
    // For kilo selling
    weightPerUnit: '',
    minOrderValue: '',
    maxOrderValue: ''
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock producer data (in real app, this would come from user context or API)
  const producerInfo = {
    name: 'Golden Valley Honey Farm',
    licenseNumber: 'HNY-2024-001234',
    licensePdfName: 'golden_valley_license.pdf'
  };

  // Handle lab test file upload
  const handleLabTestUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setValidationErrors(prev => ({
          ...prev,
          labTestFile: 'Please upload a PDF, JPG, or PNG file'
        }));
        return;
      }

      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        setValidationErrors(prev => ({
          ...prev,
          labTestFile: 'File size must be less than 10MB'
        }));
        return;
      }

      setFormData(prev => ({ ...prev, labTestFile: file }));
      setValidationErrors(prev => ({ ...prev, labTestFile: '' }));
    }
  };

  // Remove lab test file
  const removeLabTestFile = () => {
    setFormData(prev => ({ ...prev, labTestFile: null }));
    setValidationErrors(prev => ({ ...prev, labTestFile: '' }));
  };

  // Load product data for edit mode
  useEffect(() => {
    if (mode === 'edit' && id) {
      const product = getProduct(id);
      if (product) {
        setFormData({
          name: product.name || '',
          price: product.price?.toString() || '',
          description: product.description || '',
          origin: product.origin || '',
          harvestSeason: product.harvestSeason || '',
          quality: product.quality || '',
          category: product.category || '',
          weight: product.weight || '',
          sku: product.sku || '',
          barcode: product.barcode || '',
          stockQuantity: product.stockQuantity?.toString() || '',
          image: product.image || '',
          hasNFT: product.hasNFT || false,
          inStock: product.inStock || true
        });
      } else {
        navigate('/admin/products');
      }
    }
  }, [mode, id, getProduct, navigate]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Product name is required';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      errors.price = 'Valid price is required';
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }

    if (!formData.origin.trim()) {
      errors.origin = 'Origin is required';
    }

    if (!formData.harvestSeason.trim()) {
      errors.harvestSeason = 'Harvest season is required';
    }

    if (!formData.quality) {
      errors.quality = 'Quality grade is required';
    }

    if (!formData.category) {
      errors.category = 'Category is required';
    }

    // Lab test file validation
    if (!formData.labTestFile) {
      errors.labTestFile = 'Lab test result file is required';
    }

    // Selling type specific validations
    if (formData.sellingType === 'jar') {
      if (!formData.weightPerJar || parseFloat(formData.weightPerJar) <= 0) {
        errors.weightPerJar = 'Valid weight per jar is required';
      }
      if (!formData.availableQuantity || parseInt(formData.availableQuantity) <= 0) {
        errors.availableQuantity = 'Valid available quantity is required';
      }
    } else if (formData.sellingType === 'kilo') {
      if (!formData.weightPerUnit || parseFloat(formData.weightPerUnit) <= 0) {
        errors.weightPerUnit = 'Valid weight per unit is required';
      }
      if (!formData.minOrderValue || parseFloat(formData.minOrderValue) <= 0) {
        errors.minOrderValue = 'Valid minimum order value is required';
      }
      if (!formData.maxOrderValue || parseFloat(formData.maxOrderValue) <= 0) {
        errors.maxOrderValue = 'Valid maximum order value is required';
      }
      if (formData.minOrderValue && formData.maxOrderValue &&
          parseFloat(formData.minOrderValue) >= parseFloat(formData.maxOrderValue)) {
        errors.maxOrderValue = 'Maximum order value must be greater than minimum';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity)
      };

      if (mode === 'create') {
        await addProduct(productData);
      } else {
        await updateProduct(parseInt(id), productData);
      }

      navigate('/admin/products');
    } catch (error) {
      console.error('Failed to save product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload to a server or cloud storage
      // For now, we'll use a placeholder URL
      const imageUrl = `/src/assets/${file.name}`;
      handleInputChange('image', imageUrl);
    }
  };

  const categories = ['Floral', 'Raw', 'Wildflower', 'Medicinal', 'Dark'];
  const qualityGrades = ['Organic', 'Premium', 'Grade A', 'Grade B'];
  const seasons = ['Spring 2024', 'Summer 2024', 'Fall 2024', 'Winter 2024'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin/products')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {mode === 'create' ? 'Add New Product' : 'Edit Product'}
          </h1>
          <p className="text-muted-foreground">
            {mode === 'create' 
              ? 'Create a new honey product for your marketplace'
              : 'Update product information and settings'
            }
          </p>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Product Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="e.g., Wildflower Honey"
                      className={validationErrors.name ? 'border-destructive' : ''}
                    />
                    {validationErrors.name && (
                      <p className="text-sm text-destructive">{validationErrors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="25.00"
                      className={validationErrors.price ? 'border-destructive' : ''}
                    />
                    {validationErrors.price && (
                      <p className="text-sm text-destructive">{validationErrors.price}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe the honey's flavor, aroma, and characteristics..."
                    rows={4}
                    className={validationErrors.description ? 'border-destructive' : ''}
                  />
                  {validationErrors.description && (
                    <p className="text-sm text-destructive">{validationErrors.description}</p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="origin">Origin/Apiary *</Label>
                    <Input
                      id="origin"
                      value={formData.origin}
                      onChange={(e) => handleInputChange('origin', e.target.value)}
                      placeholder="e.g., Mountain Meadows Apiary"
                      className={validationErrors.origin ? 'border-destructive' : ''}
                    />
                    {validationErrors.origin && (
                      <p className="text-sm text-destructive">{validationErrors.origin}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="harvestSeason">Harvest Season *</Label>
                    <Select
                      value={formData.harvestSeason}
                      onValueChange={(value) => handleInputChange('harvestSeason', value)}
                    >
                      <SelectTrigger className={validationErrors.harvestSeason ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Select season" />
                      </SelectTrigger>
                      <SelectContent>
                        {seasons.map(season => (
                          <SelectItem key={season} value={season}>{season}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {validationErrors.harvestSeason && (
                      <p className="text-sm text-destructive">{validationErrors.harvestSeason}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="quality">Quality Grade *</Label>
                    <Select
                      value={formData.quality}
                      onValueChange={(value) => handleInputChange('quality', value)}
                    >
                      <SelectTrigger className={validationErrors.quality ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Select quality" />
                      </SelectTrigger>
                      <SelectContent>
                        {qualityGrades.map(grade => (
                          <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {validationErrors.quality && (
                      <p className="text-sm text-destructive">{validationErrors.quality}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleInputChange('category', value)}
                    >
                      <SelectTrigger className={validationErrors.category ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {validationErrors.category && (
                      <p className="text-sm text-destructive">{validationErrors.category}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Producer License Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-600" />
                  Producer License Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-gray-600">Producer Name</Label>
                      <p className="text-sm font-semibold text-gray-900">{producerInfo.name}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-gray-600">License Number</Label>
                      <p className="text-sm font-semibold text-gray-900">{producerInfo.licenseNumber}</p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Label className="text-sm font-medium text-gray-600">License PDF</Label>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <p className="text-sm text-gray-700">{producerInfo.licensePdfName}</p>
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3 italic">
                    This information is automatically pulled from the producer's registration details
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Lab Test Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Upload Lab Test Result
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="labTest">Lab Test File *</Label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="labTest"
                      className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                        validationErrors.labTestFile ? 'border-red-500' : 'border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> lab test results
                        </p>
                        <p className="text-xs text-gray-500">PDF, JPG, PNG (MAX. 10MB)</p>
                      </div>
                      <input
                        id="labTest"
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleLabTestUpload}
                      />
                    </label>
                  </div>

                  {formData.labTestFile && (
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">
                          {formData.labTestFile.name}
                        </span>
                        <span className="text-xs text-blue-600">
                          ({(formData.labTestFile.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={removeLabTestFile}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  {validationErrors.labTestFile && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {validationErrors.labTestFile}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Selling Type */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-green-600" />
                  Selling Type
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label className="text-base font-medium">How do you want to sell this product?</Label>
                  <RadioGroup
                    value={formData.sellingType}
                    onValueChange={(value) => handleInputChange('sellingType', value)}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className={`flex items-center space-x-2 p-4 border-2 rounded-lg transition-all duration-200 cursor-pointer ${
                      formData.sellingType === 'jar'
                        ? 'border-green-400 bg-green-50 shadow-sm'
                        : 'border-gray-200 hover:border-green-300'
                    }`}>
                      <RadioGroupItem value="jar" id="jar" className="text-green-600" />
                      <Label htmlFor="jar" className="flex items-center gap-2 cursor-pointer font-medium">
                        <Package className="w-4 h-4 text-green-600" />
                        By Jar
                      </Label>
                    </div>
                    <div className={`flex items-center space-x-2 p-4 border-2 rounded-lg transition-all duration-200 cursor-pointer ${
                      formData.sellingType === 'kilo'
                        ? 'border-green-400 bg-green-50 shadow-sm'
                        : 'border-gray-200 hover:border-green-300'
                    }`}>
                      <RadioGroupItem value="kilo" id="kilo" className="text-green-600" />
                      <Label htmlFor="kilo" className="flex items-center gap-2 cursor-pointer font-medium">
                        <Scale className="w-4 h-4 text-green-600" />
                        By Kilo
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Jar Selling Fields */}
                {formData.sellingType === 'jar' && (
                  <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Jar Selling Details
                    </h4>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="weightPerJar">Weight per Jar *</Label>
                        <div className="flex gap-2">
                          <Input
                            id="weightPerJar"
                            type="number"
                            min="0"
                            step="0.1"
                            value={formData.weightPerJar}
                            onChange={(e) => handleInputChange('weightPerJar', e.target.value)}
                            placeholder="500"
                            className={validationErrors.weightPerJar ? 'border-destructive' : ''}
                          />
                          <Select
                            value={formData.weightUnit}
                            onValueChange={(value) => handleInputChange('weightUnit', value)}
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="grams">g</SelectItem>
                              <SelectItem value="ml">ml</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {validationErrors.weightPerJar && (
                          <p className="text-sm text-destructive">{validationErrors.weightPerJar}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="availableQuantity">Available Quantity *</Label>
                        <Input
                          id="availableQuantity"
                          type="number"
                          min="1"
                          value={formData.availableQuantity}
                          onChange={(e) => handleInputChange('availableQuantity', e.target.value)}
                          placeholder="50"
                          className={validationErrors.availableQuantity ? 'border-destructive' : ''}
                        />
                        {validationErrors.availableQuantity && (
                          <p className="text-sm text-destructive">{validationErrors.availableQuantity}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Kilo Selling Fields */}
                {formData.sellingType === 'kilo' && (
                  <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 flex items-center gap-2">
                      <Scale className="w-4 h-4" />
                      Bulk Selling Details
                    </h4>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="weightPerUnit">Weight per Unit (kg) *</Label>
                        <Input
                          id="weightPerUnit"
                          type="number"
                          min="0"
                          step="0.1"
                          value={formData.weightPerUnit}
                          onChange={(e) => handleInputChange('weightPerUnit', e.target.value)}
                          placeholder="1.0"
                          className={validationErrors.weightPerUnit ? 'border-destructive' : ''}
                        />
                        {validationErrors.weightPerUnit && (
                          <p className="text-sm text-destructive">{validationErrors.weightPerUnit}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="minOrderValue">Min Order Value *</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            id="minOrderValue"
                            type="number"
                            min="0"
                            step="0.01"
                            value={formData.minOrderValue}
                            onChange={(e) => handleInputChange('minOrderValue', e.target.value)}
                            placeholder="100.00"
                            className={`pl-10 ${validationErrors.minOrderValue ? 'border-destructive' : ''}`}
                          />
                        </div>
                        {validationErrors.minOrderValue && (
                          <p className="text-sm text-destructive">{validationErrors.minOrderValue}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxOrderValue">Max Order Value *</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            id="maxOrderValue"
                            type="number"
                            min="0"
                            step="0.01"
                            value={formData.maxOrderValue}
                            onChange={(e) => handleInputChange('maxOrderValue', e.target.value)}
                            placeholder="1000.00"
                            className={`pl-10 ${validationErrors.maxOrderValue ? 'border-destructive' : ''}`}
                          />
                        </div>
                        {validationErrors.maxOrderValue && (
                          <p className="text-sm text-destructive">{validationErrors.maxOrderValue}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Product Image */}
            <Card>
              <CardHeader>
                <CardTitle>Product Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.image && (
                  <div className="relative">
                    <Avatar className="w-full h-48 rounded-lg">
                      <AvatarImage src={formData.image} alt="Product" className="object-cover" />
                      <AvatarFallback className="rounded-lg">No Image</AvatarFallback>
                    </Avatar>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => handleInputChange('image', '')}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                )}
                
                <div>
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload image
                      </p>
                    </div>
                  </Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Product Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Product Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inStock"
                    checked={formData.inStock}
                    onCheckedChange={(checked) => handleInputChange('inStock', checked)}
                  />
                  <Label htmlFor="inStock">Product is in stock</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasNFT"
                    checked={formData.hasNFT}
                    onCheckedChange={(checked) => handleInputChange('hasNFT', checked)}
                  />
                  <Label htmlFor="hasNFT">Enable NFT certification</Label>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting || isLoading}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {mode === 'create' ? 'Creating...' : 'Updating...'}
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        {mode === 'create' ? 'Create Product' : 'Update Product'}
                      </>
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate('/admin/products')}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
