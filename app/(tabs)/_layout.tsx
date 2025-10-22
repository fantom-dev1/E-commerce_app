import React from 'react';
import { Tabs } from 'expo-router';
import { Chrome as Home, Grid2x2 as Grid, ShoppingCart, Heart, User } from 'lucide-react-native';
import { useAppContext } from '@/context/AppContext';

export default function TabLayout() {
  const { isSmallDevice, isMediumDevice, isLargeDevice } = useAppContext();
  
  // Calculate responsive sizes
  const getIconSize = () => {
    if (isSmallDevice) return 20;
    if (isMediumDevice) return 22;
    return 24;
  };

  const getTabBarHeight = () => {
    if (isSmallDevice) return 60;
    if (isMediumDevice) return 65;
    return 70;
  };

  const getPadding = () => {
    if (isSmallDevice) return 8;
    if (isMediumDevice) return 10;
    return 12;
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4B7BF5',
        tabBarInactiveTintColor: '#999',
        tabBarShowLabel: false, // Hide all text labels
        tabBarStyle: {
          borderTopColor: '#EAEAEA',
          borderTopWidth: 1,
          height: getTabBarHeight(),
          paddingBottom: getPadding(),
          paddingTop: getPadding(),
          backgroundColor: '#FFFFFF',
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Home
              size={getIconSize()}
              color={color}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color, focused }) => (
            <Grid
              size={getIconSize()}
              color={color}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, focused }) => (
            <ShoppingCart
              size={getIconSize()}
              color={color}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color, focused }) => (
            <Heart
              size={getIconSize()}
              color={color}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <User
              size={getIconSize()}
              color={color}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
    </Tabs>
  );
}