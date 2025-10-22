import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { ChevronLeft, CreditCard, Plus, Trash2, Check } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAppContext } from '@/context/AppContext';

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'amex' | 'paypal' | 'apple_pay';
  lastFour?: string;
  expiryMonth?: number;
  expiryYear?: number;
  email?: string;
  isDefault: boolean;
  nickname?: string;
}

export default function PaymentMethodsScreen() {
  const { isSmallDevice, isMediumDevice } = useAppContext();
  
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'visa',
      lastFour: '1234',
      expiryMonth: 12,
      expiryYear: 2027,
      isDefault: true,
      nickname: 'Personal Card'
    },
    {
      id: '2',
      type: 'mastercard',
      lastFour: '5678',
      expiryMonth: 8,
      expiryYear: 2026,
      isDefault: false,
      nickname: 'Business Card'
    },
    {
      id: '3',
      type: 'paypal',
      email: 'john.doe@email.com',
      isDefault: false
    },
    {
      id: '4',
      type: 'apple_pay',
      isDefault: false
    }
  ]);

  const getCardIcon = (type: string) => {
    return <CreditCard size={24} color="#4B7BF5" />;
  };

  const getCardName = (type: string) => {
    switch (type) {
      case 'visa': return 'Visa';
      case 'mastercard': return 'Mastercard';
      case 'amex': return 'American Express';
      case 'paypal': return 'PayPal';
      case 'apple_pay': return 'Apple Pay';
      default: return 'Card';
    }
  };

  const handleAddPaymentMethod = () => {
    Alert.alert(
      'Add Payment Method',
      'Choose a payment method to add:',
      [
        { 
          text: 'Credit/Debit Card', 
          onPress: () => addCreditCard()
        },
        { 
          text: 'PayPal', 
          onPress: () => addPayPal()
        },
        { 
          text: 'Apple Pay', 
          onPress: () => addApplePay()
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const addCreditCard = () => {
    Alert.alert(
      'Add Credit Card',
      'Demo: Enter your card details\n\n• Card Number: •••• •••• •••• 9876\n• Expiry: 03/28\n• CVV: •••\n• Name: John Doe\n• Billing Address: Same as profile',
      [
        { 
          text: 'Add Card', 
          onPress: () => {
            const newCard: PaymentMethod = {
              id: Date.now().toString(),
              type: 'visa',
              lastFour: '9876',
              expiryMonth: 3,
              expiryYear: 2028,
              isDefault: false,
              nickname: 'New Card'
            };
            setPaymentMethods([...paymentMethods, newCard]);
            Alert.alert('Success!', 'Credit card added successfully.');
          }
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const addPayPal = () => {
    Alert.alert(
      'Add PayPal',
      'Demo: Link your PayPal account\n\n• Email: john.doe@email.com\n• Account Status: Verified\n• Balance: $1,234.56',
      [
        { 
          text: 'Link Account', 
          onPress: () => {
            Alert.alert('Success!', 'PayPal account linked successfully.');
          }
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const addApplePay = () => {
    Alert.alert(
      'Add Apple Pay',
      'Demo: Set up Apple Pay\n\n• Touch ID: Enabled\n• Face ID: Enabled\n• Default Card: Visa ••••1234',
      [
        { 
          text: 'Enable Apple Pay', 
          onPress: () => {
            Alert.alert('Success!', 'Apple Pay enabled successfully.');
          }
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleSetDefault = (methodId: string) => {
    setPaymentMethods(methods => 
      methods.map(method => ({
        ...method,
        isDefault: method.id === methodId
      }))
    );
    Alert.alert('Default Updated', 'Default payment method has been updated.');
  };

  const handleEditMethod = (method: PaymentMethod) => {
    if (method.type === 'paypal' || method.type === 'apple_pay') {
      Alert.alert(
        `Edit ${getCardName(method.type)}`,
        `Demo: ${getCardName(method.type)} settings\n\n• Account Status: Active\n• Security: Enabled\n• Notifications: On`,
        [
          { text: 'Update Settings', onPress: () => Alert.alert('Updated!', 'Settings updated successfully.') },
          { text: 'OK' }
        ]
      );
    } else {
      Alert.alert(
        'Edit Card',
        `Demo: Update card details\n\n• Card: ${getCardName(method.type)} ••••${method.lastFour}\n• Expiry: ${method.expiryMonth}/${method.expiryYear}\n• Nickname: ${method.nickname}`,
        [
          { text: 'Update Expiry', onPress: () => Alert.alert('Updated!', 'Card expiry updated successfully.') },
          { text: 'Change Nickname', onPress: () => Alert.alert('Updated!', 'Card nickname updated successfully.') },
          { text: 'OK' }
        ]
      );
    }
  };

  const handleDeleteMethod = (methodId: string) => {
    const method = paymentMethods.find(m => m.id === methodId);
    if (method?.isDefault) {
      Alert.alert('Cannot Delete', 'Cannot delete the default payment method. Please set another method as default first.');
      return;
    }

    Alert.alert(
      'Delete Payment Method',
      'Are you sure you want to delete this payment method?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            setPaymentMethods(methods => methods.filter(m => m.id !== methodId));
            Alert.alert('Deleted!', 'Payment method removed successfully.');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: isSmallDevice ? 16 : 20 }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontSize: isSmallDevice ? 18 : 20 }]}>
          Payment Methods
        </Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddPaymentMethod}
        >
          <Plus size={24} color="#4B7BF5" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionTitle, { 
          fontSize: isSmallDevice ? 14 : 16,
          marginHorizontal: isSmallDevice ? 16 : 20 
        }]}>
          Your Payment Methods
        </Text>

        {paymentMethods.map((method) => (
          <View 
            key={method.id} 
            style={[styles.paymentCard, { marginHorizontal: isSmallDevice ? 16 : 20 }]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.cardInfo}>
                {getCardIcon(method.type)}
                <View style={styles.cardDetails}>
                  <View style={styles.cardTitleRow}>
                    <Text style={[styles.cardTitle, { fontSize: isSmallDevice ? 14 : 16 }]}>
                      {getCardName(method.type)}
                      {method.lastFour && ` ••••${method.lastFour}`}
                    </Text>
                    {method.isDefault && (
                      <View style={styles.defaultBadge}>
                        <Check size={12} color="#FFF" />
                        <Text style={styles.defaultText}>Default</Text>
                      </View>
                    )}
                  </View>
                  <Text style={[styles.cardSubtitle, { fontSize: isSmallDevice ? 12 : 14 }]}>
                    {method.type === 'paypal' ? method.email :
                     method.type === 'apple_pay' ? 'Touch/Face ID enabled' :
                     method.nickname ? method.nickname : `Expires ${method.expiryMonth}/${method.expiryYear}`}
                  </Text>
                </View>
              </View>
              <View style={styles.cardActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleEditMethod(method)}
                >
                  <Text style={[styles.actionText, { fontSize: isSmallDevice ? 11 : 12 }]}>
                    Edit
                  </Text>
                </TouchableOpacity>
                {!method.isDefault && (
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDeleteMethod(method.id)}
                  >
                    <Trash2 size={16} color="#F44336" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {!method.isDefault && (
              <TouchableOpacity
                style={styles.setDefaultButton}
                onPress={() => handleSetDefault(method.id)}
              >
                <Text style={[styles.setDefaultText, { fontSize: isSmallDevice ? 12 : 14 }]}>
                  Set as Default
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {/* Add Payment Method Card */}
        <TouchableOpacity
          style={[styles.addMethodCard, { marginHorizontal: isSmallDevice ? 16 : 20 }]}
          onPress={handleAddPaymentMethod}
          activeOpacity={0.7}
        >
          <Plus size={32} color="#4B7BF5" />
          <Text style={[styles.addMethodText, { fontSize: isSmallDevice ? 14 : 16 }]}>
            Add New Payment Method
          </Text>
          <Text style={[styles.addMethodSubtext, { fontSize: isSmallDevice ? 12 : 14 }]}>
            Credit card, PayPal, or Apple Pay
          </Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    color: '#333',
  },
  addButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 12,
  },
  paymentCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  cardDetails: {
    marginLeft: 12,
    flex: 1,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    flex: 1,
  },
  defaultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    gap: 4,
  },
  defaultText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#FFF',
  },
  cardSubtitle: {
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#F5F5F7',
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    color: '#4B7BF5',
  },
  setDefaultButton: {
    marginTop: 12,
    paddingVertical: 8,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
  },
  setDefaultText: {
    fontFamily: 'Inter-Medium',
    color: '#4B7BF5',
  },
  addMethodCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 24,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E3F2FD',
    borderStyle: 'dashed',
  },
  addMethodText: {
    fontFamily: 'Inter-SemiBold',
    color: '#4B7BF5',
    marginTop: 8,
  },
  addMethodSubtext: {
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginTop: 4,
  },
});
