import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  SafeAreaView,
  Platform,
} from 'react-native';
import { ArrowLeft, Camera, Eye, EyeOff, User, Mail, Phone, MapPin, Calendar } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAppContext } from '@/context/AppContext';

export default function EditProfileScreen() {
  const { isSmallDevice, isMediumDevice } = useAppContext();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-01-15',
    address: '123 Main Street',
    city: 'New York',
    zipCode: '10001',
    country: 'United States',
  });

  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const getIconSize = () => {
    if (isSmallDevice) return 20;
    if (isMediumDevice) return 22;
    return 24;
  };

  const iconSize = getIconSize();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    Alert.alert(
      'Profile Updated',
      'Your profile information has been successfully updated.',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const handleChangePassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      Alert.alert('Error', 'Please fill in all password fields.');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Alert.alert('Error', 'New password and confirmation do not match.');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      Alert.alert('Error', 'New password must be at least 8 characters long.');
      return;
    }

    Alert.alert(
      'Password Changed',
      'Your password has been successfully updated.',
      [{ text: 'OK', onPress: () => {
        setShowPasswordSection(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }}]
    );
  };

  const handleChangePhoto = () => {
    Alert.alert(
      'Change Profile Photo',
      'Choose how you want to update your profile photo',
      [
        { text: 'Take Photo', onPress: () => Alert.alert('Demo', 'Camera functionality would open here') },
        { text: 'Choose from Gallery', onPress: () => Alert.alert('Demo', 'Photo gallery would open here') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: isSmallDevice ? 16 : 20 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={iconSize} color="#333" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontSize: isSmallDevice ? 16 : 18 }]}>
          Edit Profile
        </Text>
        <TouchableOpacity onPress={handleSaveProfile} style={styles.saveButton}>
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
        {/* Profile Photo Section */}
        <View style={[styles.photoSection, { paddingHorizontal: isSmallDevice ? 16 : 20 }]}>
          <View style={styles.photoContainer}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }} 
              style={[styles.profilePhoto, {
                width: isSmallDevice ? 80 : 100,
                height: isSmallDevice ? 80 : 100,
                borderRadius: isSmallDevice ? 40 : 50,
              }]} 
              resizeMode="cover"
            />
            <TouchableOpacity 
              style={[styles.cameraButton, {
                width: isSmallDevice ? 28 : 32,
                height: isSmallDevice ? 28 : 32,
                borderRadius: isSmallDevice ? 14 : 16,
              }]}
              onPress={handleChangePhoto}
            >
              <Camera size={isSmallDevice ? 14 : 16} color="#FFF" />
            </TouchableOpacity>
          </View>
          <Text style={[styles.changePhotoText, { fontSize: isSmallDevice ? 14 : 16 }]}>
            Tap to change photo
          </Text>
        </View>

        {/* Personal Information */}
        <View style={[styles.section, { marginHorizontal: isSmallDevice ? 16 : 20 }]}>
          <Text style={[styles.sectionTitle, { fontSize: isSmallDevice ? 16 : 18 }]}>
            Personal Information
          </Text>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { fontSize: isSmallDevice ? 14 : 16 }]}>
              First Name *
            </Text>
            <View style={styles.inputContainer}>
              <User size={iconSize - 4} color="#666" style={styles.inputIcon} />
              <TextInput
                style={[styles.textInput, { fontSize: isSmallDevice ? 14 : 16 }]}
                value={formData.firstName}
                onChangeText={(value) => handleInputChange('firstName', value)}
                placeholder="Enter first name"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { fontSize: isSmallDevice ? 14 : 16 }]}>
              Last Name *
            </Text>
            <View style={styles.inputContainer}>
              <User size={iconSize - 4} color="#666" style={styles.inputIcon} />
              <TextInput
                style={[styles.textInput, { fontSize: isSmallDevice ? 14 : 16 }]}
                value={formData.lastName}
                onChangeText={(value) => handleInputChange('lastName', value)}
                placeholder="Enter last name"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { fontSize: isSmallDevice ? 14 : 16 }]}>
              Email Address *
            </Text>
            <View style={styles.inputContainer}>
              <Mail size={iconSize - 4} color="#666" style={styles.inputIcon} />
              <TextInput
                style={[styles.textInput, { fontSize: isSmallDevice ? 14 : 16 }]}
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                placeholder="Enter email address"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { fontSize: isSmallDevice ? 14 : 16 }]}>
              Phone Number
            </Text>
            <View style={styles.inputContainer}>
              <Phone size={iconSize - 4} color="#666" style={styles.inputIcon} />
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

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { fontSize: isSmallDevice ? 14 : 16 }]}>
              Date of Birth
            </Text>
            <View style={styles.inputContainer}>
              <Calendar size={iconSize - 4} color="#666" style={styles.inputIcon} />
              <TextInput
                style={[styles.textInput, { fontSize: isSmallDevice ? 14 : 16 }]}
                value={formData.dateOfBirth}
                onChangeText={(value) => handleInputChange('dateOfBirth', value)}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#999"
              />
            </View>
          </View>
        </View>

        {/* Address Information */}
        <View style={[styles.section, { marginHorizontal: isSmallDevice ? 16 : 20 }]}>
          <Text style={[styles.sectionTitle, { fontSize: isSmallDevice ? 16 : 18 }]}>
            Address Information
          </Text>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { fontSize: isSmallDevice ? 14 : 16 }]}>
              Street Address
            </Text>
            <View style={styles.inputContainer}>
              <MapPin size={iconSize - 4} color="#666" style={styles.inputIcon} />
              <TextInput
                style={[styles.textInput, { fontSize: isSmallDevice ? 14 : 16 }]}
                value={formData.address}
                onChangeText={(value) => handleInputChange('address', value)}
                placeholder="Enter street address"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 2, marginRight: 8 }]}>
              <Text style={[styles.inputLabel, { fontSize: isSmallDevice ? 14 : 16 }]}>
                City
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.textInput, { fontSize: isSmallDevice ? 14 : 16 }]}
                  value={formData.city}
                  onChangeText={(value) => handleInputChange('city', value)}
                  placeholder="Enter city"
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={[styles.inputLabel, { fontSize: isSmallDevice ? 14 : 16 }]}>
                ZIP Code
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.textInput, { fontSize: isSmallDevice ? 14 : 16 }]}
                  value={formData.zipCode}
                  onChangeText={(value) => handleInputChange('zipCode', value)}
                  placeholder="ZIP"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { fontSize: isSmallDevice ? 14 : 16 }]}>
              Country
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.textInput, { fontSize: isSmallDevice ? 14 : 16 }]}
                value={formData.country}
                onChangeText={(value) => handleInputChange('country', value)}
                placeholder="Enter country"
                placeholderTextColor="#999"
              />
            </View>
          </View>
        </View>

        {/* Password Section */}
        <View style={[styles.section, { marginHorizontal: isSmallDevice ? 16 : 20 }]}>  
          <TouchableOpacity 
            style={styles.passwordToggle}
            onPress={() => setShowPasswordSection(!showPasswordSection)}
          >
            <Text style={[styles.sectionTitle, { fontSize: isSmallDevice ? 16 : 18 }]}>Change Password</Text>
            <Text style={[styles.toggleText, { fontSize: isSmallDevice ? 14 : 16 }]}>
              {showPasswordSection ? 'Cancel' : 'Change'}
            </Text>
          </TouchableOpacity>
          {showPasswordSection && (
            <View style={{ padding: 16 }}>
              {/* Password fields go here */}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    elevation: 4,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    color: '#333',
  },
  saveButton: {
    padding: 8,
  },
  saveButtonText: {
    fontWeight: '500',
    color: '#007BFF',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  photoSection: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  photoContainer: {
    position: 'relative',
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    elevation: 2,
  },
  changePhotoText: {
    marginTop: 8,
    fontSize: 16,
    color: '#007BFF',
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    padding: 16,
    fontWeight: '600',
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  inputGroup: {
    padding: 16,
  },
  inputLabel: {
    marginBottom: 8,
    fontWeight: '500',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  passwordToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  toggleText: {
    fontWeight: '500',
    color: '#007BFF',
  },
});
