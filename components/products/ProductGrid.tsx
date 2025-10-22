import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';
import { useAppContext } from '@/context/AppContext';

interface ProductGridProps {
  products: Product[];
  viewMode?: 'grid' | 'list';
}

export default function ProductGrid({ products, viewMode = 'grid' }: ProductGridProps) {
  const { isSmallDevice, isMediumDevice, isLargeDevice, dimensions } = useAppContext();
  
  // Responsive column calculation
  const getNumColumns = () => {
    if (viewMode === 'list') return 1;
    if (isSmallDevice) return 2;
    if (isMediumDevice) return 2;
    return 3; // Large devices
  };

  // Calculate responsive spacing
  const getItemSpacing = () => {
    if (viewMode === 'list') return isSmallDevice ? 8 : 12;
    return isSmallDevice ? 8 : isMediumDevice ? 12 : 16;
  };

  const numColumns = getNumColumns();
  const itemSpacing = getItemSpacing();

  const renderItem = ({ item, index }: { item: Product; index: number }) => (
    <ProductCard
      product={item}
      viewMode={viewMode}
      isLast={viewMode === 'list' && index === products.length - 1}
    />
  );

  const getItemLayout = (_: any, index: number) => {
    if (viewMode === 'list') {
      const itemHeight = isSmallDevice ? 120 : isLargeDevice ? 140 : 130;
      const spacing = itemSpacing;
      return {
        length: itemHeight + spacing,
        offset: (itemHeight + spacing) * index,
        index,
      };
    }
    return { length: 0, offset: 0, index };
  };

  // Calculate item separator for list view
  const ItemSeparator = () => (
    <View style={{ height: viewMode === 'list' ? itemSpacing : 0 }} />
  );

  // Custom column wrapper style for grid
  const getColumnWrapperStyle = () => {
    if (viewMode !== 'grid' || numColumns <= 1) return undefined;
    
    return [
      styles.columnWrapper,
      { 
        marginBottom: itemSpacing,
        gap: itemSpacing, // Modern gap property
      }
    ];
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={numColumns}
        key={`${viewMode}-${numColumns}-${dimensions.width}`} // Re-render when view mode, columns, or screen size changes
        columnWrapperStyle={getColumnWrapperStyle()}
        ItemSeparatorComponent={viewMode === 'list' ? ItemSeparator : undefined}
        scrollEnabled={false}
        contentContainerStyle={[
          styles.gridContent,
          viewMode === 'list' && styles.listContent,
          { paddingBottom: itemSpacing }
        ]}
        showsVerticalScrollIndicator={false}
        getItemLayout={viewMode === 'list' ? getItemLayout : undefined}
        removeClippedSubviews={false} // Better for dynamic content
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  gridContent: {
    flexGrow: 1,
  },
  listContent: {
    flexGrow: 1,
  },
});
