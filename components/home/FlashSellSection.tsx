import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { Heart, Plus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import SectionHeader from '@/components/common/SectionHeader';
import { flashSaleProducts } from '@/data/products';
import { useAppContext } from '@/context/AppContext';
import { router } from 'expo-router';

export default function FlashSellSection() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 25,
    seconds: 37
  });
  const { isSmallDevice, isMediumDevice, isLargeDevice, addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useAppContext();

  const toggleFavorite = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleAddToCart = (product: any) => {
    console.log('handleAddToCart called with:', product);
    addToCart(product);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getCardWidth = () => {
    if (isSmallDevice) return 140;
    if (isMediumDevice) return 160;
    return 180;
  };

  const getCardHeight = () => {
    if (isSmallDevice) return 250;
    if (isMediumDevice) return 240;
    return 260;
  };

  const getPadding = () => {
    if (isSmallDevice) return 12;
    if (isMediumDevice) return 16;
    return 20;
  };

  const cardWidth = getCardWidth();
  const cardHeight = getCardHeight();
  const padding = getPadding();

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  return (
    <View style={styles.container}>
      {/* SectionHeader removed for error isolation */}
      <View style={[styles.timerContainer, { paddingHorizontal: padding }]}>
        <LinearGradient
          colors={['#FF6B6B', '#FF8E8E']}
          style={styles.timerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={[
            styles.timerLabel,
            { fontSize: isSmallDevice ? 14 : isLargeDevice ? 18 : 16 }
          ]}>🔥 Flash Sale ends in</Text>
          <View style={styles.timerBoxesContainer}>
            <View style={[styles.timerBox, { minWidth: isSmallDevice ? 32 : 40 }]}>
              <Text style={[styles.timerValue, { fontSize: isSmallDevice ? 14 : 16 }]}>{formatTime(timeLeft.hours)}</Text>
              <Text style={[styles.timerUnit, { fontSize: isSmallDevice ? 8 : 10 }]}>HRS</Text>
            </View>
            <Text style={[styles.timerSeparator, { fontSize: isSmallDevice ? 16 : 20 }]}>:</Text>
            <View style={[styles.timerBox, { minWidth: isSmallDevice ? 32 : 40 }]}>
              <Text style={[styles.timerValue, { fontSize: isSmallDevice ? 14 : 16 }]}>{formatTime(timeLeft.minutes)}</Text>
              <Text style={[styles.timerUnit, { fontSize: isSmallDevice ? 8 : 10 }]}>MIN</Text>
            </View>
            <Text style={[styles.timerSeparator, { fontSize: isSmallDevice ? 16 : 20 }]}>:</Text>
            <View style={[styles.timerBox, { minWidth: isSmallDevice ? 32 : 40 }]}>
              <Text style={[styles.timerValue, { fontSize: isSmallDevice ? 14 : 16 }]}>{formatTime(timeLeft.seconds)}</Text>
              <Text style={[styles.timerUnit, { fontSize: isSmallDevice ? 8 : 10 }]}>SEC</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.productsScroll, { paddingHorizontal: padding }]}
        decelerationRate="fast"
      >
        {flashSaleProducts.map((product, index) => (
          <TouchableOpacity
            key={product.id}
            style={[
              styles.productCard,
              {
                width: cardWidth,
                height: cardHeight,
                marginRight: index === flashSaleProducts.length - 1 ? 0 : 12,
              }
            ]}
            onPress={() => handleProductPress(product.id)}
            activeOpacity={0.9}
          >
            <View style={styles.discountBadge}>
              <Text style={[styles.discountText, { fontSize: isSmallDevice ? 10 : 12 }]}>
                -{Math.round((1 - product.price / (product.price * 1.3)) * 100)}%
              </Text>
            </View>
            <View style={[
              styles.productImageContainer,
              { height: isSmallDevice ? cardHeight * 0.55 : cardHeight * 0.6 }
            ]}>
              <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="cover" />
              <TouchableOpacity
                onPress={() => toggleFavorite(product.id)}
                style={[
                  styles.favoriteButton,
                  {
                    width: isSmallDevice ? 28 : 32,
                    height: isSmallDevice ? 28 : 32,
                    borderRadius: isSmallDevice ? 14 : 16,
                  }
                ]}
                activeOpacity={0.8}
              >
                <Heart
                  size={isSmallDevice ? 14 : 16}
                  color={isInWishlist(product.id) ? '#FF3040' : '#666'}
                  fill={isInWishlist(product.id) ? '#FF3040' : 'transparent'}
                />
              </TouchableOpacity>
            </View>
            <View style={[
              styles.productInfo,
              {
                padding: isSmallDevice ? 8 : 12,
                height: isSmallDevice ? cardHeight * 0.45 : cardHeight * 0.4,
              }
            ]}>
              <Text style={[
                styles.productName,
                { fontSize: isSmallDevice ? 12 : isLargeDevice ? 16 : 14 }
              ]} numberOfLines={2}>
                {product.name}
              </Text>
              <View style={styles.priceRow}>
                <Text style={[
                  styles.productPrice,
                  { fontSize: isSmallDevice ? 14 : isLargeDevice ? 18 : 16 }
                ]}>
                  ${product.price}
                </Text>
                <Text style={[
                  styles.originalPrice,
                  { fontSize: isSmallDevice ? 10 : 12 }
                ]}>
                  ${(product.price * 1.3).toFixed(2)}
                </Text>
              </View>
              <View style={styles.bottomRow}>
                <View style={styles.stockInfo}>
                  <Text style={[
                    styles.soldBadge,
                    { fontSize: isSmallDevice ? 9 : 10 }
                  ]}>
                    {product.sold} sold
                  </Text>
                  {product.onStock && product.onStock < 10 && (
                    <Text style={[
                      styles.stockBadge,
                      { fontSize: isSmallDevice ? 9 : 10 }
                    ]}>
                      {product.onStock} left
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  style={[
                    styles.addButton,
                    {
                      width: isSmallDevice ? 24 : 28,
                      height: isSmallDevice ? 24 : 28,
                      borderRadius: isSmallDevice ? 12 : 14,
                    }
                  ]}
                  onPress={() => handleAddToCart(product)}
                  activeOpacity={0.8}
                >
                  <Plus size={isSmallDevice ? 12 : 14} color="#FFF" strokeWidth={2.5} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingBottom: 20,
  },
  timerContainer: {
    marginBottom: 16,
  },
  timerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  timerLabel: {
    fontFamily: 'Inter-Bold',
    color: '#FFF',
    flex: 1,
  },
  timerBoxesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  timerValue: {
    fontFamily: 'Inter-Bold',
    color: '#FFF',
    lineHeight: 18,
  },
  timerUnit: {
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: -2,
  },
  timerSeparator: {
    fontFamily: 'Inter-Bold',
    color: '#FFF',
    marginHorizontal: 4,
  },
  productsScroll: {
    // Dynamic padding applied inline
  },
  productCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF3040',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 10,
  },
  discountText: {
    fontFamily: 'Inter-Bold',
    color: '#FFF',
  },
  productImageContainer: {
    position: 'relative',
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
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
        elevation: 4,
      },
    }),
  },
  productInfo: {
    justifyContent: 'space-between',
    flex: 1,
  },
  productName: {
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 4,
    lineHeight: 16,
    flex: 1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  productPrice: {
    fontFamily: 'Inter-Bold',
    color: '#FF3040',
    marginRight: 8,
  },
  originalPrice: {
    fontFamily: 'Inter-Regular',
    color: '#999',
    textDecorationLine: 'line-through',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 4,
  },
  stockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  soldBadge: {
    fontFamily: 'Inter-Regular',
    color: '#666',
    backgroundColor: '#F0F0F2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 6,
  },
  stockBadge: {
    fontFamily: 'Inter-Regular',
    color: '#FF3040',
    backgroundColor: '#FFE5E5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  addButton: {
    backgroundColor: '#4B7BF5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
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
});
