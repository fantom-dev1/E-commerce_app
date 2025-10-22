import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Search, Heart, Grid, List } from 'lucide-react-native';
import ProductGrid from '@/components/products/ProductGrid';
import SectionHeader from '@/components/common/SectionHeader';
import { useAppContext } from '@/context/AppContext';

export default function WishlistScreen() {
  const { 
    wishlistItems, 
    searchQuery, 
    setSearchQuery, 
    isSmallDevice, 
    isMediumDevice, 
    isLargeDevice,
    dimensions,
    addToCart,
    removeFromWishlist
  } = useAppContext();
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleMoveToCart = (product: any) => {
    addToCart(product);
    removeFromWishlist(product.id);
    Alert.alert(
      'Moved to Cart!',
      `${product.name} has been moved from wishlist to cart.`,
      [{ text: 'OK' }]
    );
  };

  const handleRemoveFromWishlist = (product: any) => {
    Alert.alert(
      'Remove from Wishlist',
      `Remove ${product.name} from your wishlist?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => removeFromWishlist(product.id)
        }
      ]
    );
  };

  // Filter wishlist items based on search query
  const filteredWishlistItems = useMemo(() => {
    if (!searchQuery.trim()) return wishlistItems;
    
    return wishlistItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [wishlistItems, searchQuery]);

  // Responsive styling values
  const getResponsiveStyles = () => {
    const horizontalPadding = isSmallDevice ? 12 : isMediumDevice ? 16 : 20;
    const searchIconSize = isSmallDevice ? 18 : 20;
    const searchPadding = isSmallDevice ? 12 : 16;
    const emptyIconSize = isSmallDevice ? 48 : isMediumDevice ? 56 : 64;
    
    return {
      horizontalPadding,
      searchIconSize,
      searchPadding,
      emptyIconSize,
    };
  };

  const responsiveStyles = getResponsiveStyles();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          filteredWishlistItems.length === 0 && styles.scrollContentCentered
        ]}
      >
        {/* Header with Search and View Toggle */}
        <View style={[
          styles.headerContainer,
          { paddingHorizontal: responsiveStyles.horizontalPadding }
        ]}>
          {/* Search Bar */}
          <View style={[
            styles.searchBar,
            { paddingHorizontal: responsiveStyles.searchPadding }
          ]}>
            <Search size={responsiveStyles.searchIconSize} color="#777" />
            <TextInput
              style={[
                styles.searchInput,
                { fontSize: isSmallDevice ? 13 : 14 }
              ]}
              placeholder="Search your wishlist..."
              placeholderTextColor="#777"
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
            />
          </View>

          {/* View Mode Toggle - Only show if there are items */}
          {filteredWishlistItems.length > 0 && (
            <View style={styles.viewToggle}>
              <TouchableOpacity
                style={[
                  styles.viewButton,
                  viewMode === 'grid' && styles.viewButtonActive
                ]}
                onPress={() => setViewMode('grid')}
                activeOpacity={0.7}
              >
                <Grid 
                  size={isSmallDevice ? 16 : 18} 
                  color={viewMode === 'grid' ? '#FFF' : '#666'} 
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.viewButton,
                  viewMode === 'list' && styles.viewButtonActive
                ]}
                onPress={() => setViewMode('list')}
                activeOpacity={0.7}
              >
                <List 
                  size={isSmallDevice ? 16 : 18} 
                  color={viewMode === 'list' ? '#FFF' : '#666'} 
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {filteredWishlistItems.length > 0 ? (
          <View style={[
            styles.section,
            { paddingHorizontal: responsiveStyles.horizontalPadding }
          ]}>
            <SectionHeader 
              title="My Wishlist" 
              actionLabel={`${filteredWishlistItems.length} item${filteredWishlistItems.length === 1 ? '' : 's'}`} 
            />
            <ProductGrid products={filteredWishlistItems} viewMode={viewMode} />
          </View>
        ) : (
          <View style={[
            styles.emptyWishlist,
            { paddingHorizontal: responsiveStyles.horizontalPadding }
          ]}>
            <Heart 
              size={responsiveStyles.emptyIconSize} 
              color="#CCCCCC" 
              style={styles.emptyIcon} 
            />
            <Text style={[
              styles.emptyText,
              { fontSize: isSmallDevice ? 16 : isMediumDevice ? 18 : 20 }
            ]}>
              {searchQuery.trim() ? 'No items found' : 'Your wishlist is empty'}
            </Text>
            <Text style={[
              styles.emptySubtext,
              { fontSize: isSmallDevice ? 13 : 14 }
            ]}>
              {searchQuery.trim() 
                ? 'Try searching for something else' 
                : 'Items added to your wishlist will appear here'
              }
            </Text>
            {searchQuery.trim() && (
              <TouchableOpacity
                style={styles.clearSearchButton}
                onPress={() => setSearchQuery('')}
                activeOpacity={0.8}
              >
                <Text style={styles.clearSearchText}>Clear Search</Text>
              </TouchableOpacity>
            )}
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
  scrollContent: {
    flexGrow: 1,
  },
  scrollContentCentered: {
    justifyContent: 'center',
  },
  headerContainer: {
    paddingTop: 8,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    borderRadius: 24,
    paddingVertical: 10,
    minHeight: 44, // Accessibility minimum touch target
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
    color: '#333',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#EAEAEA',
    borderRadius: 20,
    padding: 2,
  },
  viewButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 18,
    minWidth: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButtonActive: {
    backgroundColor: '#4B7BF5',
  },
  section: {
    flex: 1,
    paddingBottom: 24,
  },
  emptyWishlist: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    minHeight: 300,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontFamily: 'Inter-Regular',
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  clearSearchButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#4B7BF5',
    borderRadius: 20,
  },
  clearSearchText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFF',
  },
});
