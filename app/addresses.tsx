import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  Platform,
} from 'react-native';
import {
  ArrowLeft,
  Plus,
  MapPin,
  Home,
  Building,
  Edit3,
  Trash2,
  Check,
} from 'lucide-react-native';
import { router } from 'expo-router';
import { useAppContext } from '@/context/AppContext';

interface Address {
  id: string;
  label: string;
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
  type: 'home' | 'work' | 'other';
}

export default function AddressManagementScreen() {
  const { isSmallDevice, isMediumDevice } = useAppContext();

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      label: 'Home',
      fullName: 'John Doe',
      address: '123 Main Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      phone: '+1 (555) 123-4567',
      isDefault: true,
      type: 'home',
    },
    {
      id: '2',
      label: 'Work',
      fullName: 'John Doe',
      address: '456 Business Avenue, Suite 200',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'United States',
      phone: '+1 (555) 123-4567',
      isDefault: false,
      type: 'work',
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    label: '',
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    type: 'home' as 'home' | 'work' | 'other',
  });

  const getIconSize = () => {
    if (isSmallDevice) return 20;
    if (isMediumDevice) return 22;
    return 24;
  };

  const iconSize = getIconSize();

  const resetForm = () => {
    setFormData({
      label: '',
      fullName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phone: '',
      type: 'home',
    });
    setShowAddForm(false);
    setEditingAddress(null);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddAddress = () => {
    setShowAddForm(true);
    resetForm();
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      label: address.label,
      fullName: address.fullName,
      address: address.address,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      phone: address.phone,
      type: address.type,
    });
    setShowAddForm(true);
  };

  const handleSaveAddress = () => {
    // Validate required fields
    if (!formData.label || !formData.fullName || !formData.address || !formData.city) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    if (editingAddress) {
      // Update existing address
      setAddresses(prev =>
        prev.map(addr =>
          addr.id === editingAddress.id
            ? { ...addr, ...formData }
            : addr
        )
      );
      Alert.alert('Success', 'Address updated successfully!');
    } else {
      // Add new address
      const newAddress: Address = {
        id: Date.now().toString(),
        ...formData,
        isDefault: addresses.length === 0, // First address is default
      };
      setAddresses(prev => [...prev, newAddress]);
      Alert.alert('Success', 'Address added successfully!');
    }

    resetForm();
  };

  const handleDeleteAddress = (addressId: string) => {
    const addressToDelete = addresses.find(addr => addr.id === addressId);
    
    Alert.alert(
      'Delete Address',
      `Are you sure you want to delete "${addressToDelete?.label}" address?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setAddresses(prev => {
              const filtered = prev.filter(addr => addr.id !== addressId);
              
              // If deleted address was default and there are other addresses, make first one default
              if (addressToDelete?.isDefault && filtered.length > 0) {
                filtered[0].isDefault = true;
              }
              
              return filtered;
            });
            Alert.alert('Success', 'Address deleted successfully!');
          },
        },
      ]
    );
  };

  const handleSetDefault = (addressId: string) => {
    setAddresses(prev =>
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId,
      }))
    );
    Alert.alert('Success', 'Default address updated!');
  };

  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home':
        return <Home size={iconSize - 4} color="#4B7BF5" />;
      case 'work':
        return <Building size={iconSize - 4} color="#4B7BF5" />;
      default:
        return <MapPin size={iconSize - 4} color="#4B7BF5" />;
    }
  };

  if (showAddForm) {
    return (
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={[styles.header, { paddingHorizontal: isSmallDevice ? 16 : 20 }]}>
          <TouchableOpacity onPress={resetForm} style={styles.backButton}>
            <ArrowLeft size={iconSize} color="#333" />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { fontSize: isSmallDevice ? 16 : 18 }]}>
            {editingAddress ? 'Edit Address' : 'Add New Address'}
          </Text>
          <TouchableOpacity onPress={handleSaveAddress} style={styles.saveButton}>
            <Text style={[styles.saveButtonText, { fontSize: isSmallDevice ? 14 : 16 }]}>
              Save
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View style={[styles.formSection, { marginHorizontal: isSmallDevice ? 16 : 20 }]}>
            {/* Address Type */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { fontSize: isSmallDevice ? 14 : 16 }]}>
                Address Type *
              </Text>
              <View style={styles.typeRow}>
                {[
                  { key: 'home', label: 'Home', icon: Home },
                  { key: 'work', label: 'Work', icon: Building },
                  { key: 'other', label: 'Other', icon: MapPin },
                ].map(({ key, label, icon: Icon }) => (
                  <TouchableOpacity
                    key={key}
                    style={[
                      styles.typeButton,
                      formData.type === key && styles.typeButtonActive,
                    ]}
                    onPress={() => handleInputChange('type', key)}
                  >
                    <Icon 
                      size={iconSize - 4} 
                      color={formData.type === key ? '#FFF' : '#4B7BF5'} 
                    />
                    <Text
                      style={[
                        styles.typeButtonText,
                        { fontSize: isSmallDevice ? 12 : 14 },
                        formData.type === key && styles.typeButtonTextActive,
                      ]}
                    >
                      {label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Address Label */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { fontSize: isSmallDevice ? 14 : 16 }]}>
                Address Label *
              </Text>
              <TextInput
                style={[styles.textInput, { fontSize: isSmallDevice ? 14 : 16 }]}
                value={formData.label}
                onChangeText={(value) => handleInputChange('label', value)}
                placeholder="e.g., Home, Office, Mom's House"
                placeholderTextColor="#999"
              />
            </View>

            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { fontSize: isSmallDevice ? 14 : 16 }]}>
                Full Name *
              </Text>
              <TextInput
                style={[styles.textInput, { fontSize: isSmallDevice ? 14 : 16 }]}
                value={formData.fullName}
                onChangeText={(value) => handleInputChange('fullName', value)}
                placeholder="Enter full name"
                placeholderTextColor="#999"
              />
            </View>

            {/* Address */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { fontSize: isSmallDevice ? 14 : 16 }]}>
                Street Address *
              </Text>
              <TextInput
                style={[styles.textInput, { fontSize: isSmallDevice ? 14 : 16 }]}
                value={formData.address}
                onChangeText={(value) => handleInputChange('address', value)}
                placeholder="Enter street address"
                placeholderTextColor="#999"
                multiline
              />
            </View>

            {/* City and State */}
            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 2, marginRight: 8 }]}>
                <Text style={[styles.inputLabel, { fontSize: isSmallDevice ? 14 : 16 }]}>
                  City *
                </Text>
                <TextInput
                  style={[styles.textInput, { fontSize: isSmallDevice ? 14 : 16 }]}
                  value={formData.city}
                  onChangeText={(value) => handleInputChange('city', value)}
                  placeholder="Enter city"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={[styles.inputLabel, { fontSize: isSmallDevice ? 14 : 16 }]}>
                  State
                </Text>
                <TextInput
                  style={[styles.textInput, { fontSize: isSmallDevice ? 14 : 16 }]}
                  value={formData.state}
                  onChangeText={(value) => handleInputChange('state', value)}
                  placeholder="State"
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            {/* ZIP Code and Country */}
            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={[styles.inputLabel, { fontSize: isSmallDevice ? 14 : 16 }]}>
                  ZIP Code
                </Text>
                <TextInput
                  style={[styles.textInput, { fontSize: isSmallDevice ? 14 : 16 }]}
                  value={formData.zipCode}
                  onChangeText={(value) => handleInputChange('zipCode', value)}
                  placeholder="ZIP"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>

              <View style={[styles.inputGroup, { flex: 2, marginLeft: 8 }]}>
                <Text style={[styles.inputLabel, { fontSize: isSmallDevice ? 14 : 16 }]}>
                  Country
                </Text>
                <TextInput
                  style={[styles.textInput, { fontSize: isSmallDevice ? 14 : 16 }]}
                  value={formData.country}
                  onChangeText={(value) => handleInputChange('country', value)}
                  placeholder="Enter country"
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            {/* Phone */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { fontSize: isSmallDevice ? 14 : 16 }]}>
                Phone Number
              </Text>
              <TextInput
                style={[styles.textInput, { fontSize: isSmallDevice ? 14 : 16 }]}
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                placeholder="Enter phone number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: isSmallDevice ? 16 : 20 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={iconSize} color="#333" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontSize: isSmallDevice ? 16 : 18 }]}>
          My Addresses
        </Text>
        <TouchableOpacity onPress={handleAddAddress} style={styles.addButton}>
          <Plus size={iconSize} color="#4B7BF5" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {addresses.length === 0 ? (
          <View style={[styles.emptyState, { marginHorizontal: isSmallDevice ? 16 : 20 }]}>
            <MapPin size={48} color="#CCC" />
            <Text style={[styles.emptyTitle, { fontSize: isSmallDevice ? 16 : 18 }]}>
              No Addresses Yet
            </Text>
            <Text style={[styles.emptyText, { fontSize: isSmallDevice ? 14 : 16 }]}>
              Add your first address to make checkout faster
            </Text>
            <TouchableOpacity style={styles.emptyButton} onPress={handleAddAddress}>
              <Text style={[styles.emptyButtonText, { fontSize: isSmallDevice ? 14 : 16 }]}>
                Add Address
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ marginHorizontal: isSmallDevice ? 16 : 20 }}>
            {addresses.map((address, index) => (
              <View
                key={address.id}
                style={[
                  styles.addressCard,
                  { marginBottom: index === addresses.length - 1 ? 0 : 12 },
                ]}
              >
                <View style={styles.addressHeader}>
                  <View style={styles.addressLabelContainer}>
                    {getAddressIcon(address.type)}
                    <Text style={[styles.addressLabel, { fontSize: isSmallDevice ? 16 : 18 }]}>
                      {address.label}
                    </Text>
                    {address.isDefault && (
                      <View style={styles.defaultBadge}>
                        <Text style={[styles.defaultText, { fontSize: isSmallDevice ? 10 : 11 }]}>
                          Default
                        </Text>
                      </View>
                    )}
                  </View>
                  
                  <View style={styles.addressActions}>
                    <TouchableOpacity
                      style={[styles.actionButton, { marginRight: 8 }]}
                      onPress={() => handleEditAddress(address)}
                    >
                      <Edit3 size={iconSize - 6} color="#4B7BF5" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleDeleteAddress(address.id)}
                    >
                      <Trash2 size={iconSize - 6} color="#EA4335" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.addressDetails}>
                  <Text style={[styles.addressName, { fontSize: isSmallDevice ? 14 : 16 }]}>
                    {address.fullName}
                  </Text>
                  <Text style={[styles.addressText, { fontSize: isSmallDevice ? 13 : 14 }]}>
                    {address.address}
                  </Text>
                  <Text style={[styles.addressText, { fontSize: isSmallDevice ? 13 : 14 }]}>
                    {address.city}, {address.state} {address.zipCode}
                  </Text>
                  {address.country && (
                    <Text style={[styles.addressText, { fontSize: isSmallDevice ? 13 : 14 }]}>
                      {address.country}
                    </Text>
                  )}
                  {address.phone && (
                    <Text style={[styles.addressPhone, { fontSize: isSmallDevice ? 13 : 14 }]}>
                      {address.phone}
                    </Text>
                  )}
                </View>

                {!address.isDefault && (
                  <TouchableOpacity
                    style={styles.setDefaultButton}
                    onPress={() => handleSetDefault(address.id)}
                  >
                    <Check size={iconSize - 6} color="#4B7BF5" />
                    <Text style={[styles.setDefaultText, { fontSize: isSmallDevice ? 13 : 14 }]}>
                      Set as Default
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        )}
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
    borderBottomColor: '#E5E5E7',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  addButton: {
    padding: 8,
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  saveButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: '#4B7BF5',
  },
  content: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginTop: 20,
  },
  emptyTitle: {
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#4B7BF5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: '#FFF',
  },
  addressCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
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
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addressLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  addressLabel: {
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginLeft: 8,
  },
  defaultBadge: {
    backgroundColor: '#4B7BF5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  defaultText: {
    fontFamily: 'Inter-Medium',
    color: '#FFF',
  },
  addressActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
  },
  addressDetails: {
    marginBottom: 12,
  },
  addressName: {
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 4,
  },
  addressText: {
    fontFamily: 'Inter-Regular',
    color: '#666',
    lineHeight: 20,
  },
  addressPhone: {
    fontFamily: 'Inter-Medium',
    color: '#4B7BF5',
    marginTop: 4,
  },
  setDefaultButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#4B7BF5',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  setDefaultText: {
    fontFamily: 'Inter-Medium',
    color: '#4B7BF5',
    marginLeft: 4,
  },
  formSection: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
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
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: 'Inter-Medium',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E5E7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontFamily: 'Inter-Regular',
    color: '#333',
    backgroundColor: '#FAFAFA',
  },
  row: {
    flexDirection: 'row',
  },
  typeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#4B7BF5',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  typeButtonActive: {
    backgroundColor: '#4B7BF5',
  },
  typeButtonText: {
    fontFamily: 'Inter-Medium',
    color: '#4B7BF5',
    marginTop: 4,
  },
  typeButtonTextActive: {
    color: '#FFF',
  },
});
