import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useAppContext } from '@/context/AppContext';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function BannerCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const { dimensions, isSmallDevice, isMediumDevice, isLargeDevice } = useAppContext();

  const { width } = dimensions;
  
  // Enhanced responsive sizing
  const getItemWidth = () => {
    if (isSmallDevice) return width - 32;
    if (isMediumDevice) return width - 40;
    return Math.min(width - 48, 800); // Max width for large screens
  };

  const getItemHeight = () => {
    if (isSmallDevice) return 120;
    if (isMediumDevice) return 180;
    return 240;
  };

  const ITEM_WIDTH = getItemWidth();
  const ITEM_HEIGHT = getItemHeight();

  const banners = [
    {
      id: '1',
      title: 'New Arrivals',
      subtitle: 'BIG SALE',
      discount: '70% OFF',
      note: 'ON ALL MODELS',
      ctaText: 'BUY NOW',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
      colors: ['rgba(139,69,19,0.8)', 'rgba(160,82,45,0.6)', 'transparent']
    },
    {
      id: '2',
      title: 'Summer Collection',
      subtitle: 'FLASH SALE',
      discount: '50% OFF',
      note: 'LIMITED TIME ONLY',
      ctaText: 'SHOP NOW',
      image: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg',
      colors: ['rgba(25,25,112,0.8)', 'rgba(70,130,180,0.6)', 'transparent']
    },
    {
      id: '3',
      title: 'Special Offer',
      subtitle: 'CLEARANCE',
      discount: '60% OFF',
      note: 'WHILE SUPPLIES LAST',
      ctaText: 'GET DEALS',
      image: 'https://images.pexels.com/photos/1027130/pexels-photo-1027130.jpeg',
      colors: ['rgba(128,0,128,0.8)', 'rgba(147,112,219,0.6)', 'transparent']
    },
    {
      id: '4',
      title: 'Electronics',
      subtitle: 'MEGA SALE',
      discount: '80% OFF',
      note: 'SMARTPHONES & GADGETS',
      ctaText: 'EXPLORE',
      image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
      colors: ['rgba(30,144,255,0.8)', 'rgba(135,206,250,0.6)', 'transparent']
    },
    {
      id: '5',
      title: 'Fashion Week',
      subtitle: 'TRENDY STYLES',
      discount: '40% OFF',
      note: 'LATEST FASHION TRENDS',
      ctaText: 'DISCOVER',
      image: 'https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg',
      colors: ['rgba(255,20,147,0.8)', 'rgba(255,182,193,0.6)', 'transparent']
    },
    {
      id: '6',
      title: 'Home & Living',
      subtitle: 'COZY DEALS',
      discount: '55% OFF',
      note: 'FURNITURE & DECOR',
      ctaText: 'SHOP HOME',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      colors: ['rgba(34,139,34,0.8)', 'rgba(144,238,144,0.6)', 'transparent']
    },
    {
      id: '7',
      title: 'Sports & Fitness',
      subtitle: 'ACTIVE LIFE',
      discount: '45% OFF',
      note: 'FITNESS EQUIPMENT',
      ctaText: 'GET FIT',
      image: 'https://images.pexels.com/photos/3764958/pexels-photo-3764958.jpeg',
      colors: ['rgba(255,140,0,0.8)', 'rgba(255,218,185,0.6)', 'transparent']
    },
    {
      id: '8',
      title: 'Beauty & Care',
      subtitle: 'GLOW UP',
      discount: '35% OFF',
      note: 'SKINCARE & MAKEUP',
      ctaText: 'BEAUTIFY',
      image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg',
      colors: ['rgba(186,85,211,0.8)', 'rgba(221,160,221,0.6)', 'transparent']
    }
  ];

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollPosition / (ITEM_WIDTH + 16));
    setActiveIndex(Math.max(0, Math.min(currentIndex, banners.length - 1)));
  };

  const handleBannerPress = (banner: any) => {
    // Navigate based on banner type
    const category = banner.title.toLowerCase().includes('electronics') ? 'electronics' :
                    banner.title.toLowerCase().includes('fashion') ? 'fashion' :
                    banner.title.toLowerCase().includes('home') ? 'home' :
                    banner.title.toLowerCase().includes('sports') ? 'sports' :
                    banner.title.toLowerCase().includes('beauty') ? 'beauty' : null;
    
    if (category) {
      router.push({
        pathname: '/(tabs)/products',
        params: { category: category }
      });
    } else {
      router.push('/(tabs)/products');
    }
  };

  // Auto scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % banners.length;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * (ITEM_WIDTH + 16),
        animated: true,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, ITEM_WIDTH]);

  const getPadding = () => {
    if (isSmallDevice) return 16;
    if (isMediumDevice) return 20;
    return 24;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={ITEM_WIDTH + 16}
        contentContainerStyle={{
          paddingHorizontal: getPadding(),
        }}
      >
        {banners.map((banner, index) => (
          <TouchableOpacity
            key={banner.id}
            style={[
              styles.bannerItem,
              { 
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
                marginRight: index < banners.length - 1 ? 16 : 0,
              }
            ]}
            onPress={() => handleBannerPress(banner)}
            activeOpacity={0.95}
          >
            <Image 
              source={{ uri: banner.image }} 
              style={styles.bannerImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={banner.colors as any}
              style={styles.bannerGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
            <View style={[
              styles.bannerContent,
              { padding: isSmallDevice ? 16 : isLargeDevice ? 24 : 20 }
            ]}>
              <Text style={[
                styles.bannerTitle,
                { fontSize: isSmallDevice ? 12 : isLargeDevice ? 16 : 14 }
              ]}>
                {banner.title}
              </Text>
              <Text style={[
                styles.bannerSubtitle,
                { fontSize: isSmallDevice ? 20 : isLargeDevice ? 28 : 24 }
              ]}>
                {banner.subtitle}
              </Text>
              <Text style={[
                styles.discountText,
                { fontSize: isSmallDevice ? 16 : isLargeDevice ? 22 : 18 }
              ]}>
                {banner.discount}
              </Text>
              <Text style={[
                styles.noteText,
                { fontSize: isSmallDevice ? 10 : isLargeDevice ? 14 : 12 }
              ]}>
                {banner.note}
              </Text>
              <TouchableOpacity
                style={[
                  styles.ctaButton,
                  {
                    paddingVertical: isSmallDevice ? 8 : isLargeDevice ? 12 : 10,
                    paddingHorizontal: isSmallDevice ? 16 : isLargeDevice ? 24 : 20,
                    borderRadius: isSmallDevice ? 20 : 24,
                  }
                ]}
                onPress={() => handleBannerPress(banner)}
              >
                <Text style={[
                  styles.ctaButtonText,
                  { fontSize: isSmallDevice ? 10 : isLargeDevice ? 14 : 12 }
                ]}>
                  {banner.ctaText}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={[
        styles.paginationContainer,
        { marginTop: isSmallDevice ? 12 : isLargeDevice ? 20 : 16 }
      ]}>
        {banners.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationDot,
              {
                width: index === activeIndex ? (isSmallDevice ? 16 : 20) : (isSmallDevice ? 6 : 8),
                height: isSmallDevice ? 6 : 8,
                borderRadius: isSmallDevice ? 3 : 4,
                marginHorizontal: isSmallDevice ? 3 : 4,
                backgroundColor: index === activeIndex ? '#4B7BF5' : '#E0E0E0',
              }
            ]}
            onPress={() => {
              scrollViewRef.current?.scrollTo({
                x: index * (ITEM_WIDTH + 16),
                animated: true,
              });
            }}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  bannerItem: {
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  bannerImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  bannerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  bannerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  bannerTitle: {
    fontFamily: 'Inter-Medium',
    color: '#FFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  bannerSubtitle: {
    fontFamily: 'Inter-Bold',
    color: '#FFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  discountText: {
    fontFamily: 'Inter-Bold',
    color: '#FFDE00',
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  noteText: {
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  ctaButton: {
    backgroundColor: '#FFDE00',
    alignSelf: 'flex-start',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  ctaButtonText: {
    fontFamily: 'Inter-Bold',
    color: '#000',
    textAlign: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    backgroundColor: '#E0E0E0',
  },
});
