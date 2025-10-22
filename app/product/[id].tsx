import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView, Platform, Alert } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { Heart, Star, ChevronLeft, ShoppingCart, Plus, Minus } from 'lucide-react-native';
import { useAppContext } from '@/context/AppContext';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const { 
    getProductById, 
    addToCart, 
    isInWishlist, 
    addToWishlist, 
    removeFromWishlist, 
    isSmallDevice, 
    isMediumDevice, 
    isLargeDevice,
    dimensions 
  } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  
  const product = getProductById(id as string);
  
  if (!product) {
    return (
      <SafeAreaView style={styles.notFound}>
        <Text style={[
          styles.notFoundText,
          { fontSize: isSmallDevice ? 16 : isMediumDevice ? 18 : 20 }
        ]}>
          Product not found
        </Text>
        <TouchableOpacity 
          style={[
            styles.backButton,
            {
              paddingVertical: isSmallDevice ? 10 : 12,
              paddingHorizontal: isSmallDevice ? 16 : 20,
              borderRadius: isSmallDevice ? 8 : 10,
            }
          ]} 
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Text style={[
            styles.backButtonText,
            { fontSize: isSmallDevice ? 14 : 16 }
          ]}>
            Go Back
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  
  const isFavorite = isInWishlist(product.id);
  
  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    Alert.alert(
      'Added to Cart!',
      `${quantity} x ${product.name} added to cart\nTotal: $${(product.price * quantity).toFixed(2)}`,
      [
        { text: 'Continue Shopping', style: 'cancel' },
        { text: 'View Cart', onPress: () => router.push('/(tabs)/cart') }
      ]
    );
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };
  
  const increaseQuantity = () => setQuantity(quantity + 1);
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Responsive styling
  const getResponsiveStyles = () => {
    const { width } = dimensions;
    const imageHeight = isSmallDevice ? width * 0.6 : isMediumDevice ? width * 0.7 : width * 0.8;
    const padding = isSmallDevice ? 12 : isMediumDevice ? 16 : 20;
    const headerButtonSize = isSmallDevice ? 36 : isMediumDevice ? 40 : 44;
    const quantityButtonSize = isSmallDevice ? 32 : isMediumDevice ? 36 : 40;
    
    return {
      imageHeight,
      padding,
      headerButtonSize,
      quantityButtonSize,
    };
  };

  const responsiveStyles = getResponsiveStyles();
  
  return (
    <>
      <StatusBar style="light" />
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Product Image */}
          <View style={[
            styles.imageContainer,
            isSmallDevice && styles.imageContainerSmall
          ]}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <LinearGradient
              colors={['rgba(0,0,0,0.7)', 'transparent']}
              style={styles.gradient}
            />
            <TouchableOpacity 
              style={[
                styles.backButton,
                isSmallDevice && styles.backButtonSmall
              ]}
              onPress={() => router.back()}
            >
              <ChevronLeft size={isSmallDevice ? 20 : 24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.favoriteButton,
                isSmallDevice && styles.favoriteButtonSmall
              ]}
              onPress={handleToggleFavorite}
            >
              <Heart
                size={isSmallDevice ? 20 : 24}
                color={isFavorite ? '#FF4D67' : '#FFF'}
                fill={isFavorite ? '#FF4D67' : 'transparent'}
              />
            </TouchableOpacity>
          </View>
          
          {/* Product Info */}
          <View style={[
            styles.infoContainer,
            isSmallDevice && styles.infoContainerSmall
          ]}>
            <Text style={[
              styles.name,
              isSmallDevice && styles.nameSmall
            ]}>{product.name}</Text>
            
            <View style={styles.ratingContainer}>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={isSmallDevice ? 14 : 16}
                    color="#FFB800"
                    fill={star <= Math.floor(product.rating || 0) ? '#FFB800' : 'transparent'}
                  />
                ))}
              </View>
              <Text style={[
                styles.ratingText,
                isSmallDevice && styles.ratingTextSmall
              ]}>
                {product.rating} ({product.reviews} reviews)
              </Text>
            </View>
            
            <View style={styles.priceContainer}>
              <Text style={[
                styles.price,
                isSmallDevice && styles.priceSmall
              ]}>${product.price.toFixed(2)}</Text>
              <Text style={[
                styles.soldText,
                isSmallDevice && styles.soldTextSmall
              ]}>{product.sold} sold</Text>
            </View>
            
            <View style={styles.divider} />
            
            <Text style={[
              styles.descriptionTitle,
              isSmallDevice && styles.descriptionTitleSmall
            ]}>Description</Text>
            <Text style={[
              styles.description,
              isSmallDevice && styles.descriptionSmall
            ]}>
              {product.description || 'No description available for this product.'}
            </Text>
            
            <View style={styles.divider} />
            
            {/* Quantity Selector */}
            <View style={styles.quantityContainer}>
              <Text style={[
                styles.quantityTitle,
                isSmallDevice && styles.quantityTitleSmall
              ]}>Quantity</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity 
                  style={[
                    styles.quantityButton,
                    isSmallDevice && styles.quantityButtonSmall
                  ]}
                  onPress={decreaseQuantity}
                >
                  <Minus size={isSmallDevice ? 16 : 20} color="#333" />
                </TouchableOpacity>
                <Text style={[
                  styles.quantityText,
                  isSmallDevice && styles.quantityTextSmall
                ]}>{quantity}</Text>
                <TouchableOpacity 
                  style={[
                    styles.quantityButton,
                    isSmallDevice && styles.quantityButtonSmall
                  ]}
                  onPress={increaseQuantity}
                >
                  <Plus size={isSmallDevice ? 16 : 20} color="#333" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        
        {/* Bottom Action Bar */}
        <View style={[
          styles.actionBar,
          isSmallDevice && styles.actionBarSmall
        ]}>
          <View style={styles.totalContainer}>
            <Text style={[
              styles.totalLabel,
              isSmallDevice && styles.totalLabelSmall
            ]}>Total Price</Text>
            <Text style={[
              styles.totalPrice,
              isSmallDevice && styles.totalPriceSmall
            ]}>
              ${(product.price * quantity).toFixed(2)}
            </Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[
                styles.addToCartButton,
                isSmallDevice && styles.addToCartButtonSmall
              ]}
              onPress={handleAddToCart}
            >
              <ShoppingCart size={isSmallDevice ? 16 : 18} color="#FFF" />
              <Text style={[
                styles.addToCartText,
                isSmallDevice && styles.addToCartTextSmall
              ]}>Add to Cart</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.buyNowButton,
                isSmallDevice && styles.buyNowButtonSmall
              ]}
              onPress={handleBuyNow}
            >
              <Text style={[
                styles.buyNowText,
                isSmallDevice && styles.buyNowTextSmall
              ]}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notFoundText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: '#333',
    marginBottom: 16,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  imageContainerSmall: {
    height: 240,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonSmall: {
    top: 40,
    left: 12,
    width: 36,
    height: 36,
  },
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButtonSmall: {
    top: 40,
    right: 12,
    width: 36,
    height: 36,
  },
  infoContainer: {
    padding: 16,
  },
  infoContainerSmall: {
    padding: 12,
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#333',
    marginBottom: 8,
  },
  nameSmall: {
    fontSize: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  ratingTextSmall: {
    fontSize: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#333',
  },
  priceSmall: {
    fontSize: 20,
  },
  soldText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  soldTextSmall: {
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginVertical: 16,
  },
  descriptionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  descriptionTitleSmall: {
    fontSize: 16,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  descriptionSmall: {
    fontSize: 14,
    lineHeight: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#333',
  },
  quantityTitleSmall: {
    fontSize: 14,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonSmall: {
    width: 32,
    height: 32,
  },
  quantityText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#333',
    marginHorizontal: 16,
  },
  quantityTextSmall: {
    fontSize: 14,
  },
  actionBar: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
  },
  actionBarSmall: {
    padding: 12,
  },
  totalContainer: {
    flex: 1,
    marginRight: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  totalLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666',
  },
  totalLabelSmall: {
    fontSize: 10,
  },
  totalPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#333',
  },
  totalPriceSmall: {
    fontSize: 16,
  },
  addToCartButton: {
    flexDirection: 'row',
    backgroundColor: '#4B7BF5',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  addToCartButtonSmall: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addToCartText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFF',
    marginLeft: 8,
  },
  addToCartTextSmall: {
    fontSize: 14,
  },
  buyNowButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buyNowButtonSmall: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  buyNowText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFF',
  },
  buyNowTextSmall: {
    fontSize: 12,
  },
  backButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#4B7BF5',
  },
});
