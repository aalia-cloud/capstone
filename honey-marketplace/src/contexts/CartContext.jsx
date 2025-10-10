import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Tax and shipping constants
  const TAX_RATE = 0.05; // 5% VAT in UAE
  const SHIPPING_COST = 25.00; // AED 25 flat shipping
  const FREE_SHIPPING_THRESHOLD = 200.00; // Free shipping over AED 200

  // Load cart from localStorage on initialization
  useEffect(() => {
    const loadCart = () => {
      try {
        const storedCart = localStorage.getItem('beesure_cart');
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);
          setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        setCartItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  // Save cart to localStorage whenever cartItems change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('beesure_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item to cart
        return [...prev, {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          producer: product.origin || product.producer,
          image: product.image,
          stockQuantity: product.stockQuantity || 99,
          weight: product.weight,
          category: product.category
        }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  // Update item quantity
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity: Math.min(newQuantity, item.stockQuantity || 99) }
          : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate totals
  const calculateTotals = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * TAX_RATE;
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotal + tax + shipping;

    return { subtotal, tax, shipping, total };
  };

  // Get cart item count
  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Check if item is in cart
  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  // Get item quantity in cart
  const getItemQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Format currency as AED
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED'
    }).format(amount);
  };

  const value = {
    cartItems,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    calculateTotals,
    getCartItemCount,
    isInCart,
    getItemQuantity,
    formatCurrency,
    TAX_RATE,
    SHIPPING_COST,
    FREE_SHIPPING_THRESHOLD
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
