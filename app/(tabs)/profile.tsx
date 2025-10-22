import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, Platform, Alert } from 'react-native';
import { Settings, CreditCard, Package, Heart, LogOut, ChevronRight, User, Edit, MapPin, HelpCircle } from 'lucide-react-native';
import { useAppContext } from '@/context/AppContext';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { isSmallDevice, isMediumDevice, isLargeDevice, wishlistItems, cartItems } = useAppContext();
  
  // Responsive icon sizes
  const getIconSize = () => {
    if (isSmallDevice) return 18;
    if (isMediumDevice) return 20;
    return 22;
  };

  const iconSize = getIconSize();  // Handle profile option navigation
  const handleProfileOptionPress = (option: string) => {
    switch (option) {
      case 'My Orders':
        router.push('/orders');
        break;
      case 'Payment Methods':
        router.push('/payment-methods');
        break;
      case 'My Addresses':
        router.push('/addresses');
        break;
      case 'My Wishlist':
        router.push('/(tabs)/wishlist');
        break;
      case 'Settings':
        router.push('/settings');
        break;
      case 'Help & Support':
        router.push('/help-support');
        break;
      case 'Logout':
        Alert.alert(
          'Logout',
          'Are you sure you want to logout?',
          [
            { text: 'Logout', style: 'destructive', onPress: () => handleLogout() },
            { text: 'Cancel', style: 'cancel' }
          ]
        );
        break;
      default:
        break;
    }
  };
  const handleEditProfile = () => {
    router.push('/edit-profile');
  };

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out? You will need to sign in again to access your account.',
      [
        { 
          text: 'Cancel', 
          style: 'cancel' 
        },
        { 
          text: 'Logout', 
          style: 'destructive', 
          onPress: () => {
            Alert.alert(
              'Logged Out Successfully',
              'You have been securely logged out. Thank you for using our app!',
              [{ text: 'OK' }]
            );
          }
        }
      ]
    );
  };  const profileOptions = [
    { 
      title: 'My Orders',
      icon: <Package size={iconSize} color="#333" />,
      subtitle: 'Track, return, or buy things again',
      onPress: () => handleProfileOptionPress('My Orders')
    },
    { 
      title: 'Payment Methods',
      icon: <CreditCard size={iconSize} color="#333" />,
      subtitle: 'Add or remove payment methods',
      onPress: () => handleProfileOptionPress('Payment Methods')
    },
    { 
      title: 'My Addresses',
      icon: <MapPin size={iconSize} color="#333" />,
      subtitle: 'Manage shipping and billing addresses',
      onPress: () => handleProfileOptionPress('My Addresses')
    },
    { 
      title: 'My Wishlist',
      icon: <Heart size={iconSize} color="#333" />,
      subtitle: 'Your saved products',
      onPress: () => handleProfileOptionPress('My Wishlist'),
      badge: wishlistItems.length > 0 ? wishlistItems.length.toString() : undefined
    },
    { 
      title: 'Settings',
      icon: <Settings size={iconSize} color="#333" />,
      subtitle: 'Notifications, password, language',
      onPress: () => handleProfileOptionPress('Settings')
    },
    { 
      title: 'Help & Support',
      icon: <HelpCircle size={iconSize} color="#333" />,
      subtitle: 'FAQ, contact us, send feedback',
      onPress: () => handleProfileOptionPress('Help & Support')
    },
    { 
      title: 'Logout',
      icon: <LogOut size={iconSize} color="#EA4335" />,
      subtitle: 'Log out from your account',
      isDanger: true,
      onPress: () => handleProfileOptionPress('Logout')
    },
  ];

  // Responsive styling
  const getResponsiveStyles = () => {
    const padding = isSmallDevice ? 12 : isMediumDevice ? 16 : 20;
    const profileImageSize = isSmallDevice ? 48 : isMediumDevice ? 56 : 64;
    const optionIconSize = isSmallDevice ? 32 : isMediumDevice ? 36 : 40;
    
    return {
      padding,
      profileImageSize,
      optionIconSize,
    };
  };

  const responsiveStyles = getResponsiveStyles();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Profile Header */}
        <View style={[
          styles.header,
          { 
            paddingHorizontal: responsiveStyles.padding,
            paddingVertical: isSmallDevice ? 16 : isMediumDevice ? 20 : 24 
          }
        ]}>
          <View style={styles.profileSection}>
            <View style={[
              styles.profileImageContainer,
              {
                width: responsiveStyles.profileImageSize,
                height: responsiveStyles.profileImageSize,
                borderRadius: responsiveStyles.profileImageSize / 2,
              }
            ]}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }} 
                style={[
                  styles.profileImage,
                  {
                    width: responsiveStyles.profileImageSize,
                    height: responsiveStyles.profileImageSize,
                    borderRadius: responsiveStyles.profileImageSize / 2,
                  }
                ]} 
              />
            </View>
            
            <View style={[
              styles.profileInfo,
              { marginLeft: isSmallDevice ? 12 : 16 }
            ]}>
              <Text style={[
                styles.profileName,
                { fontSize: isSmallDevice ? 16 : isMediumDevice ? 18 : 20 }
              ]}>
                John Doe
              </Text>
              <Text style={[
                styles.profileEmail,
                { fontSize: isSmallDevice ? 12 : isMediumDevice ? 13 : 14 }
              ]}>
                johndoe@example.com
              </Text>
              <View style={styles.membershipBadge}>
                <Text style={[
                  styles.membershipText,
                  { fontSize: isSmallDevice ? 10 : 11 }
                ]}>
                  Premium Member
                </Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={[
                styles.editButton,
                {
                  paddingVertical: isSmallDevice ? 6 : 8,
                  paddingHorizontal: isSmallDevice ? 10 : 12,
                  borderRadius: isSmallDevice ? 6 : 8,
                }
              ]}
              onPress={handleEditProfile}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.editButtonText,
                { fontSize: isSmallDevice ? 12 : 13 }
              ]}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Options */}
        <View style={[
          styles.optionsContainer,
          { 
            marginHorizontal: responsiveStyles.padding,
            borderRadius: isSmallDevice ? 8 : 12 
          }
        ]}>
          {profileOptions.map((option, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.optionItem,
                {
                  paddingVertical: isSmallDevice ? 12 : isMediumDevice ? 14 : 16,
                  paddingHorizontal: responsiveStyles.padding,
                },
                index === profileOptions.length - 1 && styles.lastOptionItem
              ]}
              onPress={option.onPress}
              activeOpacity={0.8}
            >
              <View style={[
                styles.optionIconContainer,
                {
                  width: responsiveStyles.optionIconSize,
                  height: responsiveStyles.optionIconSize,
                  borderRadius: responsiveStyles.optionIconSize / 2,
                  marginRight: isSmallDevice ? 10 : 12,
                }
              ]}>
                {option.icon}
              </View>
              
              <View style={styles.optionContent}>
                <Text style={[
                  styles.optionTitle, 
                  { 
                    fontSize: isSmallDevice ? 14 : isMediumDevice ? 15 : 16,
                    marginBottom: isSmallDevice ? 2 : 4,
                  },
                  option.isDanger && styles.dangerText
                ]}>
                  {option.title}
                </Text>
                <Text style={[
                  styles.optionSubtitle,
                  { 
                    fontSize: isSmallDevice ? 11 : isMediumDevice ? 12 : 13,
                    lineHeight: isSmallDevice ? 14 : 16,
                  }
                ]}>
                  {option.subtitle}
                </Text>
              </View>
              
              {!option.isDanger && (
                <ChevronRight 
                  size={isSmallDevice ? 16 : 18} 
                  color="#999" 
                />
              )}
            </TouchableOpacity>
          ))}
        </View>        {/* Stats Section */}
        <View style={[
          styles.statsContainer,
          { 
            marginHorizontal: responsiveStyles.padding,
            borderRadius: isSmallDevice ? 8 : 12,
            paddingVertical: isSmallDevice ? 16 : 20,
          }
        ]}>
          <Text style={[
            styles.statsTitle,
            { 
              fontSize: isSmallDevice ? 15 : isMediumDevice ? 16 : 18,
              marginBottom: isSmallDevice ? 12 : 16,
            }
          ]}>
            Your Activity
          </Text>
          
          <View style={styles.statsRow}>
            <TouchableOpacity 
              style={styles.statItem}
              onPress={() => router.push('/orders')}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.statNumber,
                { fontSize: isSmallDevice ? 18 : isMediumDevice ? 20 : 22 }
              ]}>
                12
              </Text>
              <Text style={[
                styles.statLabel,
                { fontSize: isSmallDevice ? 11 : 12 }
              ]}>
                Orders
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.statItem}
              onPress={() => router.push('/(tabs)/wishlist')}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.statNumber,
                { fontSize: isSmallDevice ? 18 : isMediumDevice ? 20 : 22 }
              ]}>
                {wishlistItems.length}
              </Text>
              <Text style={[
                styles.statLabel,
                { fontSize: isSmallDevice ? 11 : 12 }
              ]}>
                Wishlist
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.statItem}
              onPress={() => router.push('/(tabs)/cart')}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.statNumber,
                { fontSize: isSmallDevice ? 18 : isMediumDevice ? 20 : 22 }
              ]}>
                {cartItems.length}
              </Text>
              <Text style={[
                styles.statLabel,
                { fontSize: isSmallDevice ? 11 : 12 }
              ]}>
                Cart Items
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* App Version */}
        <View style={[
          styles.versionContainer,
          { paddingVertical: isSmallDevice ? 16 : 20 }
        ]}>
          <Text style={[
            styles.versionText,
            { fontSize: isSmallDevice ? 12 : 13 }
          ]}>
            App Version 1.0.0
          </Text>
        </View>
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
    backgroundColor: '#FFF',
    marginBottom: 16,
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
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
  profileImage: {
    resizeMode: 'cover',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 6,
  },
  membershipBadge: {
    backgroundColor: '#4B7BF5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  membershipText: {
    fontFamily: 'Inter-Medium',
    color: '#FFF',
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#4B7BF5',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 32,
  },
  editButtonText: {
    fontFamily: 'Inter-Medium',
    color: '#4B7BF5',
  },
  optionsContainer: {
    backgroundColor: '#FFF',
    marginBottom: 16,
    overflow: 'hidden',
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
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F2',
    minHeight: 56,
  },
  lastOptionItem: {
    borderBottomWidth: 0,
  },
  optionIconContainer: {
    backgroundColor: '#F5F5F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontFamily: 'Inter-Medium',
    color: '#333',
  },
  optionSubtitle: {
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  dangerText: {
    color: '#EA4335',
  },
  statsContainer: {
    backgroundColor: '#FFF',
    marginBottom: 16,
    paddingHorizontal: 20,
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
  statsTitle: {
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontFamily: 'Inter-Bold',
    color: '#4B7BF5',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    color: '#666',
    textAlign: 'center',
  },
  versionContainer: {
    alignItems: 'center',
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    color: '#999',
  },
});
