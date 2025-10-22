import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Platform, Alert } from 'react-native';
import { Search, Filter, Grid3x3, LayoutList } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import ProductGrid from '@/components/products/ProductGrid';
import SectionHeader from '@/components/common/SectionHeader';
import { featuredProducts } from '@/data/products';
import { useAppContext } from '@/context/AppContext';

export default function ProductsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  
  const { isSmallDevice, isMediumDevice, isLargeDevice } = useAppContext();
  const insets = useSafeAreaInsets();
  const { category, search, filter } = useLocalSearchParams();

  // Set active filter based on category parameter
  useEffect(() => {
    if (category && typeof category === 'string') {
      const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
      setActiveFilter(categoryName);
      setShowFilters(true);
    }
  }, [category]);

  // Set search query from params
  useEffect(() => {
    if (search && typeof search === 'string') {
      setSearchQuery(search);
    }
  }, [search]);

  // Set filter from params
  useEffect(() => {
    if (filter && typeof filter === 'string') {
      if (filter === 'flash-sale') {
        setActiveFilter('Electronics'); // Flash sale items are mostly electronics
        setShowFilters(true);
      } else if (filter === 'featured') {
        setActiveFilter('All');
        setShowFilters(false);
      }
    }
  }, [filter]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleFilterPress = () => {
    setShowFilters(!showFilters);
    if (!showFilters) {
      Alert.alert(
        'Filters',
        'Demo filter options:\n• Price Range\n• Category\n• Brand\n• Rating\n• Availability',
        [{ text: 'OK' }]
      );
    }
  };

  const handleFilterSelect = (filter: string) => {
    setActiveFilter(filter);
    setSearchQuery(''); // Clear search when selecting filter
    Alert.alert('Filter Applied', `Now showing products in: ${filter}`, [{ text: 'OK' }]);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setActiveFilter('All');
    setShowFilters(false);
  };

  const getPadding = () => {
    if (isSmallDevice) return 12;
    if (isMediumDevice) return 16;
    return 20;
  };

  const padding = getPadding();

  const filteredProducts = searchQuery
    ? featuredProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : activeFilter === 'All' 
      ? featuredProducts 
      : featuredProducts.filter(product => 
          product.category?.toLowerCase() === activeFilter.toLowerCase()
        );

  return (
    <View style={styles.container}>
      {/* Enhanced Header */}
      <View style={[
        styles.header,
        {
          paddingTop: insets.top + padding,
          paddingHorizontal: padding,
          paddingBottom: padding,
        }
      ]}>
        <Text style={[
          styles.headerTitle,
          { fontSize: isSmallDevice ? 24 : isLargeDevice ? 32 : 28 }
        ]}>
          Products
        </Text>
        <Text style={[
          styles.headerSubtitle,
          { fontSize: isSmallDevice ? 14 : isLargeDevice ? 18 : 16 }
        ]}>
          Discover amazing products
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {/* Enhanced Search and Filter Bar */}
        <View style={[styles.searchSection, { paddingHorizontal: padding }]}>
          <View style={[
            styles.searchBar,
            {
              borderRadius: isLargeDevice ? 28 : 24,
              paddingHorizontal: isSmallDevice ? 12 : isLargeDevice ? 20 : 16,
              paddingVertical: isSmallDevice ? 10 : isLargeDevice ? 14 : 12,
            }
          ]}>
            <Search
              size={isSmallDevice ? 18 : isLargeDevice ? 24 : 20}
              color="#777"
            />
            <TextInput
              style={[
                styles.searchInput,
                { fontSize: isSmallDevice ? 12 : isLargeDevice ? 16 : 14 }
              ]}
              placeholder="Search for products..."
              placeholderTextColor="#777"
              value={searchQuery}
              onChangeText={handleSearch}
              returnKeyType="search"
            />
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                {
                  width: isSmallDevice ? 40 : isLargeDevice ? 48 : 44,
                  height: isSmallDevice ? 40 : isLargeDevice ? 48 : 44,
                }
              ]}
              onPress={() => setShowFilters(!showFilters)}
              activeOpacity={0.8}
            >
              <Filter
                size={isSmallDevice ? 18 : isLargeDevice ? 22 : 20}
                color="#333"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionButton,
                {
                  width: isSmallDevice ? 40 : isLargeDevice ? 48 : 44,
                  height: isSmallDevice ? 40 : isLargeDevice ? 48 : 44,
                }
              ]}
              onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              activeOpacity={0.8}
            >
              {viewMode === 'grid' ? (
                <LayoutList
                  size={isSmallDevice ? 18 : isLargeDevice ? 22 : 20}
                  color="#333"
                />
              ) : (
                <Grid3x3
                  size={isSmallDevice ? 18 : isLargeDevice ? 22 : 20}
                  color="#333"
                />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Results Count */}
        {searchQuery && (
          <View style={[styles.resultsContainer, { paddingHorizontal: padding }]}>
            <Text style={[
              styles.resultsText,
              { fontSize: isSmallDevice ? 12 : 14 }
            ]}>
              {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} found
            </Text>
          </View>
        )}

        {/* Filter Pills (if shown) */}
        {showFilters && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersContainer}
            contentContainerStyle={{ paddingHorizontal: padding }}
          >
            {['All', 'Electronics', 'Fashion', 'Home', 'Beauty', 'Sports'].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterPill,
                  filter === activeFilter && styles.filterPillActive
                ]}
                onPress={() => handleFilterSelect(filter)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.filterText,
                  filter === activeFilter && styles.filterTextActive,
                  { fontSize: isSmallDevice ? 11 : 12 }
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Enhanced Sections */}
        <View style={[styles.section, { paddingHorizontal: padding }]}>
          <SectionHeader
            title={searchQuery ? `Search Results (${filteredProducts.length})` : activeFilter !== 'All' ? `${activeFilter} Products` : 'Featured Products'}
            actionLabel={filteredProducts.length > 8 ? "See all" : undefined}
            onActionPress={() => {
              if (filteredProducts.length > 8) {
                Alert.alert(
                  'All Products',
                  `Showing all ${filteredProducts.length} products in this section.`,
                  [{ text: 'OK' }]
                );
              }
            }}
          />
          <ProductGrid products={filteredProducts} viewMode={viewMode} />
        </View>

        {!searchQuery && activeFilter === 'All' && (
          <>
            <View style={[styles.section, { paddingHorizontal: padding }]}>
              <SectionHeader 
                title="Recently Viewed" 
                actionLabel="Clear history"
                onActionPress={() => Alert.alert('History Cleared', 'Your recently viewed items have been cleared.')}
              />
              <ProductGrid products={featuredProducts.slice(0, 4)} viewMode={viewMode} />
            </View>

            <View style={[styles.section, { paddingHorizontal: padding }]}>
              <SectionHeader 
                title="Trending Now" 
                actionLabel="See trending"
                onActionPress={() => {
                  setActiveFilter('Electronics');
                  setShowFilters(true);
                }}
              />
              <ProductGrid products={featuredProducts.slice(2, 6)} viewMode={viewMode} />
            </View>

            <View style={[styles.section, { paddingHorizontal: padding }]}>
              <SectionHeader 
                title="Recommended for You" 
                actionLabel="Update preferences"
                onActionPress={() => Alert.alert('Recommendations', 'Based on your browsing history and preferences. Update your interests in Profile > Settings.')}
              />
              <ProductGrid products={featuredProducts.slice(1, 5)} viewMode={viewMode} />
            </View>
          </>
        )}
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  searchSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
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
    paddingVertical: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    borderRadius: 22,
    backgroundColor: '#F5F5F7',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  resultsContainer: {
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  resultsText: {
    fontFamily: 'Inter-Medium',
    color: '#666',
  },
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F2',
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F5F5F7',
    borderRadius: 20,
    marginRight: 8,
  },
  filterPillActive: {
    backgroundColor: '#4B7BF5',
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    color: '#666',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#F8F9FA',
  },
});
