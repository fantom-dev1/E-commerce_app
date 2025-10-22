import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { ChevronLeft, CreditCard, MapPin, Truck, Check } from 'lucide-react-native';
import { useAppContext } from '@/context/AppContext';

type PaymentMethod = 'credit_card' | 'paypal' | 'apple_pay';
type DeliveryMethod = 'standard' | 'express' | 'same_day';

export default function CheckoutScreen() {
  const { cartItems, cartTotal, clearCart, isSmallDevice, isMediumDevice } = useAppContext();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('standard');
  const [address, setAddress] = useState({
    fullName: 'John Doe',
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
  });
  
  const deliveryFee = deliveryMethod === 'standard' ? 5 : deliveryMethod === 'express' ? 15 : 25;
  const totalAmount = cartTotal + deliveryFee;
  
  const handlePlaceOrder = () => {
    // Simulate order processing
    Alert.alert(
      'Order Placed Successfully!',
      `Thank you for your order!\n\nOrder Details:\n• ${cartItems.length} item${cartItems.length !== 1 ? 's' : ''}\n• Total: $${totalAmount.toFixed(2)}\n• Payment: ${paymentMethod.replace('_', ' ').toUpperCase()}\n• Delivery: ${deliveryMethod.replace('_', ' ')} delivery\n\nYour order will be processed and shipped to:\n${address.fullName}\n${address.street}\n${address.city}, ${address.state} ${address.zipCode}`,
      [
        {
          text: 'Continue Shopping',
          onPress: () => {
            // Clear cart and navigate to home
            clearCart();
            router.replace('/(tabs)');
          },
        },
        {
          text: 'View Order',
          onPress: () => {
            // Show order confirmation
            Alert.alert(
              'Order Confirmation',
              'Your order has been confirmed and will be tracked via email notifications.',
              [{ text: 'OK', onPress: () => {
                clearCart();
                router.replace('/(tabs)');
              }}]
            );
          },
        },
      ]
    );
  };
  
  return (
    <>
      <Stack.Screen options={{ 
        headerTitle: 'Checkout',
        headerShown: true,
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={24} color="#333" />
          </TouchableOpacity>
        ),
      }} />
      
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Shipping Address */}
          <View style={[
            styles.section,
            isSmallDevice && styles.sectionSmall
          ]}>
            <View style={styles.sectionHeader}>
              <MapPin size={isSmallDevice ? 18 : 20} color="#4B7BF5" />
              <Text style={[
                styles.sectionTitle,
                isSmallDevice && styles.sectionTitleSmall
              ]}>Shipping Address</Text>
            </View>
            
            <View style={styles.addressForm}>
              <View style={styles.inputGroup}>
                <Text style={[
                  styles.inputLabel,
                  isSmallDevice && styles.inputLabelSmall
                ]}>Full Name</Text>
                <TextInput
                  style={[
                    styles.input,
                    isSmallDevice && styles.inputSmall
                  ]}
                  value={address.fullName}
                  onChangeText={(text) => setAddress({ ...address, fullName: text })}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={[
                  styles.inputLabel,
                  isSmallDevice && styles.inputLabelSmall
                ]}>Street Address</Text>
                <TextInput
                  style={[
                    styles.input,
                    isSmallDevice && styles.inputSmall
                  ]}
                  value={address.street}
                  onChangeText={(text) => setAddress({ ...address, street: text })}
                />
              </View>
              
              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={[
                    styles.inputLabel,
                    isSmallDevice && styles.inputLabelSmall
                  ]}>City</Text>
                  <TextInput
                    style={[
                      styles.input,
                      isSmallDevice && styles.inputSmall
                    ]}
                    value={address.city}
                    onChangeText={(text) => setAddress({ ...address, city: text })}
                  />
                </View>
                
                <View style={[styles.inputGroup, { width: 80 }]}>
                  <Text style={[
                    styles.inputLabel,
                    isSmallDevice && styles.inputLabelSmall
                  ]}>State</Text>
                  <TextInput
                    style={[
                      styles.input,
                      isSmallDevice && styles.inputSmall
                    ]}
                    value={address.state}
                    onChangeText={(text) => setAddress({ ...address, state: text })}
                  />
                </View>
              </View>
              
              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { width: 120 }]}>
                  <Text style={[
                    styles.inputLabel,
                    isSmallDevice && styles.inputLabelSmall
                  ]}>Zip Code</Text>
                  <TextInput
                    style={[
                      styles.input,
                      isSmallDevice && styles.inputSmall
                    ]}
                    value={address.zipCode}
                    onChangeText={(text) => setAddress({ ...address, zipCode: text })}
                  />
                </View>
                
                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={[
                    styles.inputLabel,
                    isSmallDevice && styles.inputLabelSmall
                  ]}>Country</Text>
                  <TextInput
                    style={[
                      styles.input,
                      isSmallDevice && styles.inputSmall
                    ]}
                    value={address.country}
                    onChangeText={(text) => setAddress({ ...address, country: text })}
                  />
                </View>
              </View>
            </View>
          </View>
          
          {/* Payment Method */}
          <View style={[
            styles.section,
            isSmallDevice && styles.sectionSmall
          ]}>
            <View style={styles.sectionHeader}>
              <CreditCard size={isSmallDevice ? 18 : 20} color="#4B7BF5" />
              <Text style={[
                styles.sectionTitle,
                isSmallDevice && styles.sectionTitleSmall
              ]}>Payment Method</Text>
            </View>
            
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[
                  styles.optionCard,
                  isSmallDevice && styles.optionCardSmall,
                  paymentMethod === 'credit_card' && styles.selectedOption,
                ]}
                onPress={() => setPaymentMethod('credit_card')}
              >
                <View style={styles.optionContent}>
                  <Text style={[
                    styles.optionTitle,
                    isSmallDevice && styles.optionTitleSmall
                  ]}>Credit Card</Text>
                  <Text style={[
                    styles.optionSubtitle,
                    isSmallDevice && styles.optionSubtitleSmall
                  ]}>Visa, Mastercard, Amex</Text>
                </View>
                {paymentMethod === 'credit_card' && (
                  <View style={[
                    styles.checkmark,
                    isSmallDevice && styles.checkmarkSmall
                  ]}>
                    <Check size={isSmallDevice ? 14 : 16} color="#FFF" />
                  </View>
                )}
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.optionCard,
                  isSmallDevice && styles.optionCardSmall,
                  paymentMethod === 'paypal' && styles.selectedOption,
                ]}
                onPress={() => setPaymentMethod('paypal')}
              >
                <View style={styles.optionContent}>
                  <Text style={[
                    styles.optionTitle,
                    isSmallDevice && styles.optionTitleSmall
                  ]}>PayPal</Text>
                  <Text style={[
                    styles.optionSubtitle,
                    isSmallDevice && styles.optionSubtitleSmall
                  ]}>Pay with your PayPal account</Text>
                </View>
                {paymentMethod === 'paypal' && (
                  <View style={[
                    styles.checkmark,
                    isSmallDevice && styles.checkmarkSmall
                  ]}>
                    <Check size={isSmallDevice ? 14 : 16} color="#FFF" />
                  </View>
                )}
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.optionCard,
                  isSmallDevice && styles.optionCardSmall,
                  paymentMethod === 'apple_pay' && styles.selectedOption,
                ]}
                onPress={() => setPaymentMethod('apple_pay')}
              >
                <View style={styles.optionContent}>
                  <Text style={[
                    styles.optionTitle,
                    isSmallDevice && styles.optionTitleSmall
                  ]}>Apple Pay</Text>
                  <Text style={[
                    styles.optionSubtitle,
                    isSmallDevice && styles.optionSubtitleSmall
                  ]}>Pay with Apple Pay</Text>
                </View>
                {paymentMethod === 'apple_pay' && (
                  <View style={[
                    styles.checkmark,
                    isSmallDevice && styles.checkmarkSmall
                  ]}>
                    <Check size={isSmallDevice ? 14 : 16} color="#FFF" />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Delivery Method */}
          <View style={[
            styles.section,
            isSmallDevice && styles.sectionSmall
          ]}>
            <View style={styles.sectionHeader}>
              <Truck size={isSmallDevice ? 18 : 20} color="#4B7BF5" />
              <Text style={[
                styles.sectionTitle,
                isSmallDevice && styles.sectionTitleSmall
              ]}>Delivery Method</Text>
            </View>
            
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[
                  styles.optionCard,
                  isSmallDevice && styles.optionCardSmall,
                  deliveryMethod === 'standard' && styles.selectedOption,
                ]}
                onPress={() => setDeliveryMethod('standard')}
              >
                <View style={styles.optionContent}>
                  <Text style={[
                    styles.optionTitle,
                    isSmallDevice && styles.optionTitleSmall
                  ]}>Standard Delivery</Text>
                  <Text style={[
                    styles.optionSubtitle,
                    isSmallDevice && styles.optionSubtitleSmall
                  ]}>3-5 business days</Text>
                </View>
                <Text style={[
                  styles.optionPrice,
                  isSmallDevice && styles.optionPriceSmall
                ]}>$5.00</Text>
                {deliveryMethod === 'standard' && (
                  <View style={[
                    styles.checkmark,
                    isSmallDevice && styles.checkmarkSmall
                  ]}>
                    <Check size={isSmallDevice ? 14 : 16} color="#FFF" />
                  </View>
                )}
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.optionCard,
                  isSmallDevice && styles.optionCardSmall,
                  deliveryMethod === 'express' && styles.selectedOption,
                ]}
                onPress={() => setDeliveryMethod('express')}
              >
                <View style={styles.optionContent}>
                  <Text style={[
                    styles.optionTitle,
                    isSmallDevice && styles.optionTitleSmall
                  ]}>Express Delivery</Text>
                  <Text style={[
                    styles.optionSubtitle,
                    isSmallDevice && styles.optionSubtitleSmall
                  ]}>1-2 business days</Text>
                </View>
                <Text style={[
                  styles.optionPrice,
                  isSmallDevice && styles.optionPriceSmall
                ]}>$15.00</Text>
                {deliveryMethod === 'express' && (
                  <View style={[
                    styles.checkmark,
                    isSmallDevice && styles.checkmarkSmall
                  ]}>
                    <Check size={isSmallDevice ? 14 : 16} color="#FFF" />
                  </View>
                )}
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.optionCard,
                  isSmallDevice && styles.optionCardSmall,
                  deliveryMethod === 'same_day' && styles.selectedOption,
                ]}
                onPress={() => setDeliveryMethod('same_day')}
              >
                <View style={styles.optionContent}>
                  <Text style={[
                    styles.optionTitle,
                    isSmallDevice && styles.optionTitleSmall
                  ]}>Same Day Delivery</Text>
                  <Text style={[
                    styles.optionSubtitle,
                    isSmallDevice && styles.optionSubtitleSmall
                  ]}>Within 24 hours</Text>
                </View>
                <Text style={[
                  styles.optionPrice,
                  isSmallDevice && styles.optionPriceSmall
                ]}>$25.00</Text>
                {deliveryMethod === 'same_day' && (
                  <View style={[
                    styles.checkmark,
                    isSmallDevice && styles.checkmarkSmall
                  ]}>
                    <Check size={isSmallDevice ? 14 : 16} color="#FFF" />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Order Summary */}
          <View style={[
            styles.section,
            isSmallDevice && styles.sectionSmall
          ]}>
            <Text style={[
              styles.sectionTitle,
              isSmallDevice && styles.sectionTitleSmall
            ]}>Order Summary</Text>
            
            <View style={styles.summaryRow}>
              <Text style={[
                styles.summaryLabel,
                isSmallDevice && styles.summaryLabelSmall
              ]}>Subtotal</Text>
              <Text style={[
                styles.summaryValue,
                isSmallDevice && styles.summaryValueSmall
              ]}>${cartTotal.toFixed(2)}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={[
                styles.summaryLabel,
                isSmallDevice && styles.summaryLabelSmall
              ]}>Shipping</Text>
              <Text style={[
                styles.summaryValue,
                isSmallDevice && styles.summaryValueSmall
              ]}>${deliveryFee.toFixed(2)}</Text>
            </View>
            
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={[
                styles.totalLabel,
                isSmallDevice && styles.totalLabelSmall
              ]}>Total</Text>
              <Text style={[
                styles.totalValue,
                isSmallDevice && styles.totalValueSmall
              ]}>${totalAmount.toFixed(2)}</Text>
            </View>
          </View>
        </ScrollView>
        
        <View style={[
          styles.footer,
          isSmallDevice && styles.footerSmall
        ]}>
          <TouchableOpacity 
            style={[
              styles.placeOrderButton,
              isSmallDevice && styles.placeOrderButtonSmall
            ]} 
            onPress={handlePlaceOrder}
          >
            <Text style={[
              styles.placeOrderButtonText,
              isSmallDevice && styles.placeOrderButtonTextSmall
            ]}>Place Order</Text>
          </TouchableOpacity>
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
  section: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionSmall: {
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#333',
    marginLeft: 8,
  },
  sectionTitleSmall: {
    fontSize: 16,
    marginLeft: 6,
  },
  addressForm: {
    marginTop: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  inputLabelSmall: {
    fontSize: 12,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F5F5F7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#333',
  },
  inputSmall: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  optionsContainer: {
    marginTop: 8,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionCardSmall: {
    padding: 12,
    marginBottom: 10,
  },
  selectedOption: {
    borderColor: '#4B7BF5',
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  optionTitleSmall: {
    fontSize: 14,
    marginBottom: 2,
  },
  optionSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  optionSubtitleSmall: {
    fontSize: 12,
  },
  optionPrice: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333',
    marginRight: 16,
  },
  optionPriceSmall: {
    fontSize: 14,
    marginRight: 12,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4B7BF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkSmall: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
  },
  summaryLabelSmall: {
    fontSize: 14,
  },
  summaryValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#333',
  },
  summaryValueSmall: {
    fontSize: 14,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
  },
  totalLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#333',
  },
  totalLabelSmall: {
    fontSize: 16,
  },
  totalValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#333',
  },
  totalValueSmall: {
    fontSize: 18,
  },
  footer: {
    backgroundColor: '#FFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
  },
  footerSmall: {
    padding: 12,
  },
  placeOrderButton: {
    backgroundColor: '#4B7BF5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  placeOrderButtonSmall: {
    paddingVertical: 12,
  },
  placeOrderButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FFF',
  },
  placeOrderButtonTextSmall: {
    fontSize: 16,
  },
});
