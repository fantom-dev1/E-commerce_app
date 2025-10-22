import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cartItems as initialCartItems } from '@/data/cart';
import { featuredProducts, wishlistProducts as initialWishlistProducts } from '@/data/products';
import { Product } from '@/types/product';
import { CartItem } from '@/types/cart';
import { Alert, Dimensions } from 'react-native';

interface AppContextType {
  // Cart
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  
  // Wishlist
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Products
  products: Product[];
  getProductById: (id: string) => Product | undefined;
  
  // Responsive design
  dimensions: { width: number; height: number };
  isSmallDevice: boolean;
  isMediumDevice: boolean;
  isLargeDevice: boolean;
  
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Product[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  
  // Wishlist state
  const [wishlistItems, setWishlistItems] = useState<Product[]>(initialWishlistProducts);
  
  // Products state
  const [products, setProducts] = useState<Product[]>(featuredProducts);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  
  // Responsive design
  const [dimensions, setDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  // Calculate device size with better breakpoints
  const isSmallDevice = dimensions.width < 390;  // iPhone SE and similar small devices
  const isMediumDevice = dimensions.width >= 390 && dimensions.width < 768;  // Most phones
  const isLargeDevice = dimensions.width >= 768;  // Tablets and larger devices

  // Update dimensions on window resize
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({
        width: window.width,
        height: window.height,
      });
    });

    return () => subscription.remove();
  }, []);

  // Calculate cart total
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Add item to cart
  const addToCart = (product: Product, quantity: number = 1) => {
    console.log('addToCart called with:', product);
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      updateCartItemQuantity(product.id, existingItem.quantity + quantity);
      Alert.alert('Success', `Updated ${product.name} quantity in cart (${existingItem.quantity + quantity} total)`);
    } else {
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      };

      setCartItems([...cartItems, newItem]);
      Alert.alert('Added to Cart!', `${product.name} has been added to your cart.`, [
        { text: 'Continue Shopping', style: 'cancel' },
        { text: 'View Cart', onPress: () => {} }
      ]);
    }
  };

  // Remove item from cart
  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Update cart item quantity
  const updateCartItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(
      cartItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Add product to wishlist
  const addToWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      setWishlistItems([...wishlistItems, { ...product, isFavorite: true }]);
      Alert.alert('Added to Wishlist!', `${product.name} has been saved to your wishlist.`, [
        { text: 'Continue', style: 'cancel' },
        { text: 'View Wishlist', onPress: () => {} }
      ]);
    }
  };

  // Remove product from wishlist
  const removeFromWishlist = (productId: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== productId));
  };

  // Check if product is in wishlist
  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.id === productId);
  };

  // Get product by ID
  const getProductById = (id: string) => {
    // Search all product arrays for the given ID
    const allProducts = [
      ...products,
      ...require('@/data/products').flashSaleProducts,
      ...require('@/data/products').wishlistProducts
    ];
    return allProducts.find(product => product.id === id);
  };

  // Update search results when query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    const filteredResults = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(filteredResults);
  }, [searchQuery, products]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    cartTotal,
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    products,
    getProductById,
    dimensions,
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    searchQuery,
    setSearchQuery,
    searchResults
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
