import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { Heart, Plus } from 'lucide-react-native';
import { Product } from '@/types/product';
import { router } from 'expo-router';
import { useAppContext } from '@/context/AppContext';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
  isLast?: boolean;
  onPress?: () => void;
}

export default function ProductCard({
  product,
  viewMode = 'grid',
  isLast = false,
  onPress
}: ProductCardProps) {
  const {
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    addToCart,
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    dimensions
  } = useAppContext();
  
  const isFavorite = isInWishlist(product.id);

  const toggleFavorite = (e: any) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/product/${product.id}`);
    }
  };

  // Responsive sizing
  const getCardWidth = () => {
    if (viewMode === 'list') return '100%';
    
    const horizontalPadding = isSmallDevice ? 24 : isLargeDevice ? 40 : 32;
    const gap = isSmallDevice ? 8 : isMediumDevice ? 12 : 16;
    const numColumns = isSmallDevice ? 2 : isMediumDevice ? 2 : 3;
    
    return (dimensions.width - horizontalPadding - (gap * (numColumns - 1))) / numColumns;
  };

  const getImageHeight = () => {
    if (viewMode === 'list') return isSmallDevice ? 80 : isLargeDevice ? 100 : 90;
    return isSmallDevice ? 120 : isLargeDevice ? 180 : 150;
  };

  const cardWidth = getCardWidth();
  const imageHeight = getImageHeight();

  if (viewMode === 'list') {
    return (
      <TouchableOpacity
        style={[
          styles.listContainer,
          { marginBottom: isLast ? 0 : 12 },
          { height: isSmallDevice ? 120 : isLargeDevice ? 140 : 130 }
        ]}
        onPress={handlePress}
        activeOpacity={0.9}
      >
        <View style={[styles.listImageContainer, { height: imageHeight, width: imageHeight }]}>
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
          <TouchableOpacity
            style={[
              styles.favoriteButton,
              {
                width: isSmallDevice ? 24 : 28,
                height: isSmallDevice ? 24 : 28,
                borderRadius: isSmallDevice ? 12 : 14,
              }
            ]}
            onPress={toggleFavorite}
            activeOpacity={0.8}
          >
            <Heart
              size={isSmallDevice ? 12 : 14}
              color={isFavorite ? '#FF4D67' : '#666'}
              fill={isFavorite ? '#FF4D67' : 'transparent'}
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.listInfoContainer}>
          <Text
            style={[
              styles.listName,
              { fontSize: isSmallDevice ? 14 : isLargeDevice ? 18 : 16 }
            ]}
            numberOfLines={2}
          >
            {product.name}
          </Text>
          <View style={styles.listPriceRow}>
            <Text style={[
              styles.listPrice,
              { fontSize: isSmallDevice ? 16 : isLargeDevice ? 20 : 18 }
            ]}>
              ${product.price.toFixed(2)}
            </Text>
            <Text style={[
              styles.listSoldText,
              { fontSize: isSmallDevice ? 11 : 12 }
            ]}>
              {product.sold} sold
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.listAddButton,
            {
              width: isSmallDevice ? 32 : 36,
              height: isSmallDevice ? 32 : 36,
              borderRadius: isSmallDevice ? 16 : 18,
            }
          ]}
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <Plus size={isSmallDevice ? 16 : 18} color="#FFF" strokeWidth={2.5} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.gridContainer,
        {
          width: cardWidth,
          marginBottom: 12,
        }
      ]}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={[styles.gridImageContainer, { height: imageHeight }]}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
        <TouchableOpacity
          style={[
            styles.favoriteButton,
            {
              width: isSmallDevice ? 28 : 32,
              height: isSmallDevice ? 28 : 32,
              borderRadius: isSmallDevice ? 14 : 16,
            }
          ]}
          onPress={toggleFavorite}
          activeOpacity={0.8}
        >
          <Heart
            size={isSmallDevice ? 14 : 16}
            color={isFavorite ? '#FF4D67' : '#666'}
            fill={isFavorite ? '#FF4D67' : 'transparent'}
          />
        </TouchableOpacity>
      </View>
      
      <View style={[
        styles.gridInfoContainer,
        { padding: isSmallDevice ? 8 : isLargeDevice ? 16 : 12 }
      ]}>
        <Text
          style={[
            styles.gridName,
            {
              fontSize: isSmallDevice ? 12 : isLargeDevice ? 16 : 14,
              marginBottom: isSmallDevice ? 6 : 8,
            }
          ]}
          numberOfLines={2}
        >
          {product.name}
        </Text>
        
        <View style={styles.gridBottomRow}>
          <View>
            <Text style={[
              styles.gridPrice,
              { fontSize: isSmallDevice ? 14 : isLargeDevice ? 18 : 16 }
            ]}>
              ${product.price.toFixed(2)}
            </Text>
            <Text style={[
              styles.gridSoldText,
              { fontSize: isSmallDevice ? 10 : 11 }
            ]}>
              {product.sold} sold
            </Text>
          </View>
          
          <TouchableOpacity
            style={[
              styles.gridAddButton,
              {
                width: isSmallDevice ? 28 : 32,
                height: isSmallDevice ? 28 : 32,
                borderRadius: isSmallDevice ? 14 : 16,
              }
            ]}
            onPress={handleAddToCart}
            activeOpacity={0.8}
          >
            <Plus size={isSmallDevice ? 12 : 14} color="#FFF" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Grid View Styles
  gridContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EEE',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  gridImageContainer: {
    position: 'relative',
    width: '100%',
  },
  gridInfoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  gridName: {
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    lineHeight: 20,
  },
  gridBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  gridPrice: {
    fontFamily: 'Inter-Bold',
    color: '#4B7BF5',
    marginBottom: 2,
  },
  gridSoldText: {
    fontFamily: 'Inter-Regular',
    color: '#999',
  },
  gridAddButton: {
    backgroundColor: '#4B7BF5',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#4B7BF5',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  // List View Styles
  listContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  listImageContainer: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  listInfoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  listName: {
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 8,
    lineHeight: 22,
  },
  listPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listPrice: {
    fontFamily: 'Inter-Bold',
    color: '#4B7BF5',
  },
  listSoldText: {
    fontFamily: 'Inter-Regular',
    color: '#999',
  },
  listAddButton: {
    backgroundColor: '#4B7BF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#4B7BF5',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  // Shared Styles
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});
