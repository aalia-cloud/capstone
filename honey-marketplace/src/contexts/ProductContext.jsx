import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

// Extended product data with more fields for admin management
const initialProducts = [
  {
    id: 1,
    name: "Mint Blossom Honey",
    price: 25,
    image: "/src/assets/anNLvZ16TeG7.jpg",
    origin: "Al Dhafra Apiary",
    harvestSeason: "Spring 2024",
    quality: "Organic",
    description: "Refreshing minty flavor with delicate floral notes. Perfect for tea and desserts.",
    hasNFT: true,
    inStock: true,
    rating: 4.8,
    reviews: 124,
    category: "Floral",
    weight: "500g",
    pricePerKg: 50,
    sku: "MBH-001",
    barcode: "DEMO-123456789",
    stockQuantity: 45,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:22:00Z"
  },
  {
    id: 2,
    name: "Acacia Honey",
    price: 30,
    image: "/src/assets/D5ZGzxW0P3i3.jpg",
    origin: "Bee Farm #5",
    harvestSeason: "Summer 2024",
    quality: "Grade A",
    description: "Delicate, lightly sweet taste with subtle floral undertones.",
    hasNFT: true,
    inStock: true,
    rating: 4.9,
    reviews: 89,
    category: "Floral",
    weight: "500g",
    pricePerKg: 60,
    sku: "ACH-002",
    barcode: "DEMO-987654321",
    stockQuantity: 32,
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-18T16:45:00Z"
  },
  {
    id: 3,
    name: "Raw Honeycomb",
    price: 40,
    image: "/src/assets/UmwNcmqldblm.jpg",
    origin: "Al Dhafra Apiary",
    harvestSeason: "Spring 2024",
    quality: "Premium",
    description: "Rich floral aroma with natural caramel notes. Straight from the hive.",
    hasNFT: true,
    inStock: true,
    rating: 5.0,
    reviews: 67,
    category: "Raw",
    weight: "300g",
    pricePerKg: 133,
    sku: "RHC-003",
    barcode: "DEMO-456789123",
    stockQuantity: 18,
    createdAt: "2024-01-08T11:20:00Z",
    updatedAt: "2024-01-22T13:10:00Z"
  },
  {
    id: 4,
    name: "Wildflower Honey",
    price: 22,
    image: "/src/assets/aV3WMp6rvvkb.jpg",
    origin: "Mountain Meadows",
    harvestSeason: "Summer 2024",
    quality: "Organic",
    description: "Complex flavor profile from diverse wildflower sources.",
    hasNFT: true,
    inStock: true,
    rating: 4.7,
    reviews: 156,
    category: "Wildflower",
    weight: "500g",
    pricePerKg: 44,
    sku: "WFH-004",
    barcode: "DEMO-789123456",
    stockQuantity: 67,
    createdAt: "2024-01-12T14:30:00Z",
    updatedAt: "2024-01-19T10:15:00Z"
  },
  {
    id: 5,
    name: "Manuka Honey",
    price: 85,
    image: "/src/assets/CQt9kOxky7QR.jpg",
    origin: "New Zealand Farms",
    harvestSeason: "Spring 2024",
    quality: "Premium",
    description: "Rare Manuka honey with exceptional antibacterial properties.",
    hasNFT: true,
    inStock: true,
    rating: 4.9,
    reviews: 203,
    category: "Medicinal",
    weight: "250g",
    pricePerKg: 340,
    sku: "MKH-005",
    barcode: "DEMO-321654987",
    stockQuantity: 12,
    createdAt: "2024-01-05T08:45:00Z",
    updatedAt: "2024-01-21T15:30:00Z"
  },
  {
    id: 6,
    name: "Clover Honey",
    price: 18,
    image: "/src/assets/E09YjvUNs8AL.jpg",
    origin: "Prairie Bee Co.",
    harvestSeason: "Summer 2024",
    quality: "Grade A",
    description: "Classic mild and sweet clover honey, perfect for everyday use.",
    hasNFT: false,
    inStock: true,
    rating: 4.5,
    reviews: 98,
    category: "Floral",
    weight: "500g",
    pricePerKg: 36,
    sku: "CLH-006",
    barcode: "DEMO-654321789",
    stockQuantity: 89,
    createdAt: "2024-01-14T12:00:00Z",
    updatedAt: "2024-01-20T09:25:00Z"
  },
  {
    id: 7,
    name: "Lavender Honey",
    price: 35,
    image: "/src/assets/dxnCnOdsg3Id.jpg",
    origin: "Provence Fields",
    harvestSeason: "Summer 2024",
    quality: "Organic",
    description: "Aromatic lavender honey with calming floral notes.",
    hasNFT: true,
    inStock: false,
    rating: 4.8,
    reviews: 142,
    category: "Floral",
    weight: "350g",
    pricePerKg: 100,
    sku: "LVH-007",
    barcode: "DEMO-147258369",
    stockQuantity: 0,
    createdAt: "2024-01-07T16:20:00Z",
    updatedAt: "2024-01-23T11:40:00Z"
  },
  {
    id: 8,
    name: "Buckwheat Honey",
    price: 28,
    image: "/src/assets/pSpYZBrQtoC3.jpeg",
    origin: "Northern Harvest",
    harvestSeason: "Fall 2024",
    quality: "Grade A",
    description: "Dark, robust honey with molasses-like flavor and high antioxidants.",
    hasNFT: true,
    inStock: true,
    rating: 4.6,
    reviews: 87,
    category: "Dark",
    weight: "500g",
    pricePerKg: 56,
    sku: "BWH-008",
    barcode: "DEMO-963852741",
    stockQuantity: 23,
    createdAt: "2024-01-09T13:15:00Z",
    updatedAt: "2024-01-17T14:55:00Z"
  }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    // Load products from localStorage if available
    const stored = localStorage.getItem('beesure_products');
    return stored ? JSON.parse(stored) : initialProducts;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Save products to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem('beesure_products', JSON.stringify(products));
  }, [products]);

  const addProduct = async (productData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const newProduct = {
        ...productData,
        id: Math.max(...products.map(p => p.id)) + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        rating: 0,
        reviews: 0,
        pricePerKg: productData.weight ? 
          (productData.price / (parseInt(productData.weight) / 1000)) : 0
      };

      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProduct = async (id, productData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const updatedProduct = {
        ...productData,
        id,
        updatedAt: new Date().toISOString(),
        pricePerKg: productData.weight ? 
          (productData.price / (parseInt(productData.weight) / 1000)) : 0
      };

      setProducts(prev => 
        prev.map(product => 
          product.id === id ? { ...product, ...updatedProduct } : product
        )
      );

      return updatedProduct;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));

      setProducts(prev => prev.filter(product => product.id !== id));
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProducts = async (ids) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setProducts(prev => prev.filter(product => !ids.includes(product.id)));
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleProductStock = async (id) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    await updateProduct(id, { 
      ...product, 
      inStock: !product.inStock,
      stockQuantity: product.inStock ? 0 : 1
    });
  };

  const getProduct = (id) => {
    return products.find(product => product.id === parseInt(id));
  };

  const getProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
  };

  const searchProducts = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.origin.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    );
  };

  const value = {
    products,
    isLoading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    deleteProducts,
    toggleProductStock,
    getProduct,
    getProductsByCategory,
    searchProducts,
    setError
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
