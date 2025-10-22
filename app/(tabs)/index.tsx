import React from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Platform, Image } from 'react-native';
import { Search, ShoppingBag } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import CategorySection from '@/components/home/CategorySection';
import FlashSellSection from '@/components/home/FlashSellSection';
import { useAppContext } from '@/context/AppContext';
import { router } from 'expo-router';

export default function HomeScreen() {
  const { searchQuery, setSearchQuery, cartItems } = useAppContext();
  const insets = useSafeAreaInsets();
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim().length > 0) {
      router.push({
        pathname: '/(tabs)/products',
        params: { search: text.trim() }
      });
    }
  };

  const handleBannerPress = () => {
    router.push({
      pathname: '/(tabs)/products',
      params: { category: 'Fashion' }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >        {/* Header with Search and Cart */}
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Search size={20} color="#999" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search product"
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={handleSearch}
                returnKeyType="search"
                onSubmitEditing={() => {
                  if (searchQuery.trim().length > 0) {
                    handleSearch(searchQuery);
                  }
                }}
              />
            </View>
            
            {/* Cart Button */}
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => router.push('/(tabs)/cart')}
              activeOpacity={0.8}
            >
              <ShoppingBag size={24} color="#333" />
              {cartItems.length > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>
                    {cartItems.length > 99 ? '99+' : cartItems.length}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>        {/* Main Banner */}
        <TouchableOpacity 
          style={styles.bannerContainer}
          onPress={() => router.push({
            pathname: '/(tabs)/products',
            params: { category: 'Fashion' }
          })}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['rgba(245,245,247,1)', 'rgba(248,249,250,1)']}
            style={styles.bannerGradient}
          >
            <View style={styles.bannerContent}>
              <View style={styles.bannerTextSection}>
                <Text style={styles.bannerSubtitle}>New Arrivals</Text>
                <Text style={styles.bannerTitle}>BIG SALE</Text>
                <Text style={styles.bannerDiscount}>70% OFF</Text>
                <TouchableOpacity style={styles.buyNowButton}>
                  <Text style={styles.buyNowText}>BUY NOW</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.bannerImageSection}>
                <Image
                  source={{
                    uri: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg'
                  }}
                  style={styles.bannerImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Popular Categories */}
        <CategorySection />

        {/* Flash Sale */}
        <FlashSellSection />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontFamily: 'Inter-Regular',
    color: '#333',
    fontSize: 16,
  },
  cartButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F7',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#FF4D67',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  cartBadgeText: {
    color: '#FFF',
    fontFamily: 'Inter-Bold',
    fontSize: 10,
  },
  bannerContainer: {
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  bannerGradient: {
    padding: 24,
    minHeight: 180,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  bannerTextSection: {
    flex: 1,
    paddingRight: 20,
  },
  bannerSubtitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  bannerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    color: '#1A1A1A',
    marginBottom: 2,
    lineHeight: 40,
  },
  bannerDiscount: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#FF4D67',
    marginBottom: 20,
    lineHeight: 36,
  },
  buyNowButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buyNowText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#1A1A1A',
    letterSpacing: 0.5,
  },
  bannerImageSection: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
});
