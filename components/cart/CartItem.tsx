import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { CartItem as CartItemType } from '@/types/cart';
import { useAppContext } from '@/context/AppContext';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { 
    updateCartItemQuantity, 
    removeFromCart, 
    isSmallDevice,
    isMediumDevice,
    isLargeDevice
  } = useAppContext();

  const increaseQuantity = () => {
    updateCartItemQuantity(item.id, item.quantity + 1);
  };

  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      updateCartItemQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  // Responsive styling
  const getResponsiveStyles = () => {
    const imageSize = isSmallDevice ? 60 : isMediumDevice ? 70 : 80;
    const padding = isSmallDevice ? 8 : isMediumDevice ? 10 : 12;
    const borderRadius = isSmallDevice ? 8 : isMediumDevice ? 10 : 12;
    const marginLeft = isSmallDevice ? 8 : isMediumDevice ? 10 : 12;
    const buttonSize = isSmallDevice ? 24 : isMediumDevice ? 26 : 28;
    const removeButtonSize = isSmallDevice ? 32 : isMediumDevice ? 34 : 36;
    
    return {
      imageSize,
      padding,
      borderRadius,
      marginLeft,
      buttonSize,
      removeButtonSize,
    };
  };

  const responsiveStyles = getResponsiveStyles();
  const totalPrice = (item.price * item.quantity).toFixed(2);

  return (
    <View style={[
      styles.container,
      {
        padding: responsiveStyles.padding,
        borderRadius: responsiveStyles.borderRadius,
      }
    ]}>
      <Image
        source={{ uri: item.image }}
        style={[
          styles.image,
          {
            width: responsiveStyles.imageSize,
            height: responsiveStyles.imageSize,
            borderRadius: isSmallDevice ? 6 : 8,
          }
        ]}
        resizeMode="cover"
      />

      <View style={[
        styles.contentContainer,
        { marginLeft: responsiveStyles.marginLeft }
      ]}>
        <View style={styles.infoContainer}>
          <Text
            style={[
              styles.name,
              { 
                fontSize: isSmallDevice ? 12 : isMediumDevice ? 13 : 14,
                marginBottom: isSmallDevice ? 2 : 4,
              }
            ]}
            numberOfLines={2}
          >
            {item.name}
          </Text>
          
          <View style={styles.priceContainer}>
            <Text style={[
              styles.price,
              { fontSize: isSmallDevice ? 14 : isMediumDevice ? 15 : 16 }
            ]}>
              ${item.price.toFixed(2)}
            </Text>
            {item.quantity > 1 && (
              <Text style={[
                styles.quantityPrice,
                { fontSize: isSmallDevice ? 11 : 12 }
              ]}>
                × {item.quantity} = ${totalPrice}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <View style={[
            styles.quantityContainer,
            { 
              borderRadius: isSmallDevice ? 6 : 8,
              paddingVertical: isSmallDevice ? 2 : 4,
            }
          ]}>
            <TouchableOpacity
              style={[
                styles.quantityButton,
                {
                  width: responsiveStyles.buttonSize,
                  height: responsiveStyles.buttonSize,
                  opacity: item.quantity <= 1 ? 0.5 : 1,
                }
              ]}
              onPress={decreaseQuantity}
              disabled={item.quantity <= 1}
              activeOpacity={0.7}
            >
              <Minus 
                size={isSmallDevice ? 12 : isMediumDevice ? 14 : 16} 
                color="#666" 
              />
            </TouchableOpacity>
            
            <Text style={[
              styles.quantityText,
              { 
                fontSize: isSmallDevice ? 12 : isMediumDevice ? 13 : 14,
                minWidth: isSmallDevice ? 20 : 24,
              }
            ]}>
              {item.quantity}
            </Text>
            
            <TouchableOpacity
              style={[
                styles.quantityButton,
                {
                  width: responsiveStyles.buttonSize,
                  height: responsiveStyles.buttonSize,
                }
              ]}
              onPress={increaseQuantity}
              activeOpacity={0.7}
            >
              <Plus 
                size={isSmallDevice ? 12 : isMediumDevice ? 14 : 16} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.removeButton,
              {
                width: responsiveStyles.removeButtonSize,
                height: responsiveStyles.removeButtonSize,
                borderRadius: responsiveStyles.removeButtonSize / 2,
              }
            ]}
            onPress={handleRemove}
            activeOpacity={0.7}
          >
            <Trash2 
              size={isSmallDevice ? 14 : isMediumDevice ? 16 : 18} 
              color="#999" 
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F0F0F2',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  image: {
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  name: {
    fontFamily: 'Inter-Medium',
    color: '#333',
    lineHeight: 18,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  price: {
    fontFamily: 'Inter-SemiBold',
    color: '#4B7BF5',
    marginRight: 8,
  },
  quantityPrice: {
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    borderWidth: 1,
    borderColor: '#E8E8EA',
  },
  quantityButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  quantityText: {
    fontFamily: 'Inter-Medium',
    color: '#333',
    textAlign: 'center',
  },
  removeButton: {
    backgroundColor: '#F5F5F7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8EA',
  },
});
