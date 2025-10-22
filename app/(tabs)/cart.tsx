import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { ShoppingBag } from 'lucide-react-native';
import CartItem from '@/components/cart/CartItem';
import { useAppContext } from '@/context/AppContext';
import { router } from 'expo-router';

export default function CartScreen() {
  const { 
    cartItems, 
    cartTotal, 
    isSmallDevice, 
    isMediumDevice, 
    isLargeDevice 
  } = useAppContext();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to your cart before proceeding to checkout.');
      return;
    }
    
    // Navigate to checkout screen
    router.push('/checkout');
  };

  const handleShopNow = () => {
    router.push('/(tabs)/products');
  };

  // Calculate shipping cost
  const shippingCost = cartTotal > 50 ? 0 : 5.00;
  const totalAmount = cartTotal + shippingCost;

  // Responsive styling
  const getResponsiveStyles = () => {
    const headerPadding = isSmallDevice ? 12 : isMediumDevice ? 16 : 20;
    const listPadding = isSmallDevice ? 8 : isMediumDevice ? 12 : 16;
    const footerPadding = isSmallDevice ? 12 : isMediumDevice ? 16 : 20;
    const emptyIconSize = isSmallDevice ? 48 : isMediumDevice ? 56 : 64;
    
    return {
      headerPadding,
      listPadding,
      footerPadding,
      emptyIconSize,
    };
  };

  const responsiveStyles = getResponsiveStyles();

  return (
    <SafeAreaView style={styles.container}>
      <View style={[
        styles.header,
        { padding: responsiveStyles.headerPadding }
      ]}>
        <Text style={[
          styles.headerTitle,
          { fontSize: isSmallDevice ? 16 : isMediumDevice ? 18 : 20 }
        ]}>
          Shopping Cart
        </Text>
        {cartItems.length > 0 && (
          <Text style={[
            styles.itemCount,
            { fontSize: isSmallDevice ? 12 : 14 }
          ]}>
            {cartItems.length} item{cartItems.length === 1 ? '' : 's'}
          </Text>
        )}
      </View>

      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <CartItem item={item} />}
            contentContainerStyle={[
              styles.cartList,
              { padding: responsiveStyles.listPadding }
            ]}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View style={{ height: isSmallDevice ? 8 : 12 }} />
            )}
          />

          <View style={[
            styles.footer,
            { 
              paddingHorizontal: responsiveStyles.footerPadding,
              paddingVertical: isSmallDevice ? 16 : 20 
            }
          ]}>
            <View style={styles.totalRow}>
              <Text style={[
                styles.totalLabel,
                { fontSize: isSmallDevice ? 13 : 14 }
              ]}>
                Subtotal
              </Text>
              <Text style={[
                styles.totalAmount,
                { fontSize: isSmallDevice ? 13 : 14 }
              ]}>
                ${cartTotal.toFixed(2)}
              </Text>
            </View>
            
            <View style={styles.totalRow}>
              <Text style={[
                styles.totalLabel,
                { fontSize: isSmallDevice ? 13 : 14 }
              ]}>
                Shipping
              </Text>
              <Text style={[
                styles.totalAmount,
                { fontSize: isSmallDevice ? 13 : 14 }
              ]}>
                {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
              </Text>
            </View>
            
            {cartTotal < 50 && shippingCost > 0 && (
              <Text style={[
                styles.freeShippingText,
                { fontSize: isSmallDevice ? 11 : 12 }
              ]}>
                Add ${(50 - cartTotal).toFixed(2)} more for free shipping
              </Text>
            )}
            
            <View style={[styles.totalRow, styles.finalRow]}>
              <Text style={[
                styles.grandTotalLabel,
                { fontSize: isSmallDevice ? 15 : isMediumDevice ? 16 : 18 }
              ]}>
                Total
              </Text>
              <Text style={[
                styles.grandTotalAmount,
                { fontSize: isSmallDevice ? 17 : isMediumDevice ? 18 : 20 }
              ]}>
                ${totalAmount.toFixed(2)}
              </Text>
            </View>
            
            <TouchableOpacity
              style={[
                styles.checkoutButton,
                {
                  paddingVertical: isSmallDevice ? 12 : 14,
                  borderRadius: isSmallDevice ? 10 : 12,
                }
              ]}
              onPress={handleCheckout}
              activeOpacity={0.9}
            >
              <Text style={[
                styles.checkoutButtonText,
                { fontSize: isSmallDevice ? 14 : 16 }
              ]}>
                Proceed to Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={[
          styles.emptyCart,
          { paddingHorizontal: responsiveStyles.headerPadding }
        ]}>
          <ShoppingBag 
            size={responsiveStyles.emptyIconSize} 
            color="#CCCCCC" 
            style={styles.emptyCartIcon} 
          />
          <Text style={[
            styles.emptyCartText,
            { fontSize: isSmallDevice ? 15 : isMediumDevice ? 16 : 18 }
          ]}>
            Your cart is empty
          </Text>
          <Text style={[
            styles.emptyCartSubtext,
            { fontSize: isSmallDevice ? 13 : 14 }
          ]}>
            Browse our products and add items to your cart
          </Text>
          <TouchableOpacity
            style={[
              styles.shopNowButton,
              {
                paddingVertical: isSmallDevice ? 10 : 12,
                paddingHorizontal: isSmallDevice ? 20 : 24,
                borderRadius: isSmallDevice ? 10 : 12,
              }
            ]}
            onPress={handleShopNow}
            activeOpacity={0.9}
          >
            <Text style={[
              styles.shopNowButtonText,
              { fontSize: isSmallDevice ? 13 : 14 }
            ]}>
              Start Shopping
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  header: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    color: '#333',
  },
  itemCount: {
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  cartList: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  totalLabel: {
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  totalAmount: {
    fontFamily: 'Inter-Medium',
    color: '#333',
  },
  freeShippingText: {
    fontFamily: 'Inter-Regular',
    color: '#4B7BF5',
    textAlign: 'center',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  finalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
    marginBottom: 16,
  },
  grandTotalLabel: {
    fontFamily: 'Inter-SemiBold',
    color: '#333',
  },
  grandTotalAmount: {
    fontFamily: 'Inter-Bold',
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#4B7BF5',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minHeight: 44, // Accessibility minimum touch target
  },
  checkoutButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: '#FFF',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyCartIcon: {
    marginBottom: 16,
  },
  emptyCartText: {
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyCartSubtext: {
    fontFamily: 'Inter-Regular',
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  shopNowButton: {
    backgroundColor: '#4B7BF5',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minHeight: 44, // Accessibility minimum touch target
  },
  shopNowButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: '#FFF',
  },
});
