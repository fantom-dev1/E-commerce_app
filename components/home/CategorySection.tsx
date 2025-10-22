import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import SectionHeader from '@/components/common/SectionHeader';
import { useAppContext } from '@/context/AppContext';
import { router } from 'expo-router';

export default function CategorySection() {
  const { isSmallDevice, isMediumDevice, isLargeDevice } = useAppContext();
  
  const categories = [
    {
      id: 'electronics',
      name: 'Electronics',
      icon: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
      color: '#E3F2FD',
      borderColor: '#2196F3',
    },
    {
      id: 'fashion',
      name: 'Fashion',
      icon: 'https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg',
      color: '#FCE4EC',
      borderColor: '#E91E63',
    },
    {
      id: 'home',
      name: 'Home & Garden',
      icon: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      color: '#E8F5E8',
      borderColor: '#4CAF50',
    },
    {
      id: 'sports',
      name: 'Sports',
      icon: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg',
      color: '#FFF3E0',
      borderColor: '#FF9800',
    },
    {
      id: 'beauty',
      name: 'Beauty',
      icon: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg',
      color: '#F3E5F5',
      borderColor: '#9C27B0',
    },
    {
      id: 'books',
      name: 'Books',
      icon: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
      color: '#E1F5FE',
      borderColor: '#00BCD4',
    },
    {
      id: 'automotive',
      name: 'Automotive',
      icon: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
      color: '#EFEBE9',
      borderColor: '#795548',
    },
    {
      id: 'toys',
      name: 'Toys & Games',
      icon: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
      color: '#FFEBEE',
      borderColor: '#F44336',
    },
    {
      id: 'kitchen',
      name: 'Kitchen',
      icon: 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg',
      color: '#E0F2F1',
      borderColor: '#009688',
    },
    {
      id: 'travel',
      name: 'Travel',
      icon: 'https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg',
      color: '#FFF8E1',
      borderColor: '#FFC107',
    },
    {
      id: 'music',
      name: 'Music',
      icon: 'https://images.pexels.com/photos/3944093/pexels-photo-3944093.jpeg',
      color: '#F1F8E9',
      borderColor: '#8BC34A',
    },
    {
      id: 'accessories',
      name: 'Accessories',
      icon: 'https://images.pexels.com/photos/1927516/pexels-photo-1927516.jpeg',
      color: '#FDE7F3',
      borderColor: '#EC4899',
    },
    {
      id: 'bags',
      name: 'Bags',
      icon: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
      color: '#EDE7F6',
      borderColor: '#673AB7',
    },
    {
      id: 'watch',
      name: 'Watches',
      icon: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg',
      color: '#E8EAF6',
      borderColor: '#3F51B5',
    },
    {
      id: 'pet',
      name: 'Pet Supplies',
      icon: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
      color: '#FCE4EC',
      borderColor: '#E91E63',
    },
    {
      id: 'gardening',
      name: 'Gardening',
      icon: 'https://images.pexels.com/photos/1002638/pexels-photo-1002638.jpeg',
      color: '#E8F5E8',
      borderColor: '#4CAF50',
    },
  ];

  const handleCategoryPress = (categoryId: string) => {
    // Set search query to filter by category and navigate to products
    router.push({
      pathname: '/(tabs)/products',
      params: { category: categoryId }
    });
  };

  const getIconSize = () => {
    if (isSmallDevice) return 80;
    if (isMediumDevice) return 90;
    return 100;
  };

  const getPadding = () => {
    if (isSmallDevice) return 12;
    if (isMediumDevice) return 16;
    return 24;
  };

  const iconSize = getIconSize();
  const padding = getPadding();

  return (
    <View style={[styles.container, { paddingHorizontal: padding }]}>
      <SectionHeader title="Popular Categories" actionLabel="See all" />
      
      <View style={styles.gridContainer}>
        {categories.slice(0, 4).map((category) => (
          <TouchableOpacity 
            key={category.id} 
            style={styles.categoryItem}
            onPress={() => handleCategoryPress(category.id)}
            activeOpacity={0.8}
          >
            <View style={[
              styles.iconContainer,
              {
                width: iconSize,
                height: iconSize,
                borderRadius: 16, // Larger border radius for bigger boxes
                backgroundColor: category.color,
                borderWidth: 2,
                borderColor: category.borderColor,
              }
            ]}>
              <Image 
                source={{ uri: category.icon }} 
                style={[
                  styles.categoryIcon,
                  {
                    width: iconSize - 8,
                    height: iconSize - 8,
                    borderRadius: 12, // Larger border radius for the inner image
                  }
                ]}
                resizeMode="cover"
              />
            </View>
            <Text style={[
              styles.categoryName,
              { 
                fontSize: isSmallDevice ? 12 : isLargeDevice ? 16 : 14,
                marginTop: isSmallDevice ? 8 : 10,
              }
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.gridContainer}>
        {categories.slice(4, 8).map((category) => (
          <TouchableOpacity 
            key={category.id} 
            style={styles.categoryItem}
            onPress={() => handleCategoryPress(category.id)}
            activeOpacity={0.8}
          >
            <View style={[
              styles.iconContainer,
              {
                width: iconSize,
                height: iconSize,
                borderRadius: 16, // Larger border radius for bigger boxes
                backgroundColor: category.color,
                borderWidth: 2,
                borderColor: category.borderColor,
              }
            ]}>
              <Image 
                source={{ uri: category.icon }} 
                style={[
                  styles.categoryIcon,
                  {
                    width: iconSize - 8,
                    height: iconSize - 8,
                    borderRadius: 12, // Larger border radius for the inner image
                  }
                ]}
                resizeMode="cover"
              />
            </View>
            <Text style={[
              styles.categoryName,
              { 
                fontSize: isSmallDevice ? 12 : isLargeDevice ? 16 : 14,
                marginTop: isSmallDevice ? 8 : 10,
              }
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryItem: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  categoryIcon: {
    // Dynamic styles applied inline
  },
  categoryName: {
    fontFamily: 'Inter-Medium',
    color: '#333',
    textAlign: 'center',
  },
});
