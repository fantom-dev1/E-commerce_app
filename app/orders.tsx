import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { ChevronLeft, Package, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAppContext } from '@/context/AppContext';

interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'shipped' | 'processing' | 'cancelled';
  total: number;
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  tracking?: string;
  deliveryDate?: string;
}

export default function OrdersScreen() {
  const { isSmallDevice, isMediumDevice } = useAppContext();
  
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-12345',
      date: '2024-12-10',
      status: 'delivered',
      total: 1299.98,
      deliveryDate: '2024-12-12',
      tracking: 'TRK123456789',
      items: [
        { name: 'iPhone 15 Pro', quantity: 1, price: 999.99, image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg' },
        { name: 'Premium Case', quantity: 1, price: 29.99, image: 'https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg' },
        { name: 'Wireless Charger', quantity: 1, price: 49.99, image: 'https://images.pexels.com/photos/4050299/pexels-photo-4050299.jpeg' }
      ]
    },
    {
      id: 'ORD-12346',
      date: '2024-12-08',
      status: 'shipped',
      total: 249.99,
      tracking: 'TRK987654321',
      items: [
        { name: 'Noise Canceling Headphones', quantity: 1, price: 249.99, image: 'https://images.pexels.com/photos/3965548/pexels-photo-3965548.jpeg' }
      ]
    },
    {
      id: 'ORD-12347',
      date: '2024-12-07',
      status: 'processing',
      total: 89.97,
      items: [
        { name: 'Premium T-Shirt', quantity: 2, price: 29.99, image: 'https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg' },
        { name: 'Casual Jeans', quantity: 1, price: 59.99, image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg' }
      ]
    },
    {
      id: 'ORD-12344',
      date: '2024-12-05',
      status: 'cancelled',
      total: 399.99,
      items: [
        { name: 'Gaming Keyboard', quantity: 1, price: 129.99, image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg' },
        { name: 'Gaming Mouse', quantity: 1, price: 79.99, image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg' }
      ]
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle size={20} color="#4CAF50" />;
      case 'shipped':
        return <Truck size={20} color="#2196F3" />;
      case 'processing':
        return <Clock size={20} color="#FF9800" />;
      case 'cancelled':
        return <AlertCircle size={20} color="#F44336" />;
      default:
        return <Package size={20} color="#666" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return '#4CAF50';
      case 'shipped': return '#2196F3';
      case 'processing': return '#FF9800';
      case 'cancelled': return '#F44336';
      default: return '#666';
    }
  };

  const handleTrackOrder = (order: Order) => {
    if (order.tracking) {
      Alert.alert(
        'Order Tracking',
        `Tracking Number: ${order.tracking}\n\nTracking Status:\n• Order Confirmed: ✅\n• In Warehouse: ✅\n• Shipped: ${order.status === 'delivered' || order.status === 'shipped' ? '✅' : '⏳'}\n• Out for Delivery: ${order.status === 'delivered' ? '✅' : '⏳'}\n• Delivered: ${order.status === 'delivered' ? '✅' : '⏳'}`,
        [
          { text: 'Copy Tracking', onPress: () => Alert.alert('Copied!', 'Tracking number copied to clipboard') },
          { text: 'OK' }
        ]
      );
    } else {
      Alert.alert('No Tracking', 'Tracking information is not available for this order yet.');
    }
  };

  const handleReorder = (order: Order) => {
    Alert.alert(
      'Reorder Items',
      `Add all items from order ${order.id} to your cart?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Add to Cart', 
          onPress: () => {
            Alert.alert('Added to Cart!', 'All items from this order have been added to your cart.');
          }
        }
      ]
    );
  };

  const handleOrderDetails = (order: Order) => {
    const itemsList = order.items.map(item => `• ${item.name} (x${item.quantity}) - $${item.price}`).join('\n');
    
    Alert.alert(
      `Order Details - ${order.id}`,
      `Order Date: ${order.date}\nStatus: ${order.status.toUpperCase()}\nTotal: $${order.total.toFixed(2)}\n\nItems:\n${itemsList}${order.tracking ? `\n\nTracking: ${order.tracking}` : ''}${order.deliveryDate ? `\nDelivered: ${order.deliveryDate}` : ''}`,
      [
        { text: 'Track Order', onPress: () => handleTrackOrder(order) },
        { text: 'Reorder', onPress: () => handleReorder(order) },
        { text: 'OK' }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: isSmallDevice ? 16 : 20 }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontSize: isSmallDevice ? 18 : 20 }]}>
          My Orders
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {orders.map((order) => (
          <TouchableOpacity
            key={order.id}
            style={[styles.orderCard, { marginHorizontal: isSmallDevice ? 16 : 20 }]}
            onPress={() => handleOrderDetails(order)}
            activeOpacity={0.8}
          >
            <View style={styles.orderHeader}>
              <View>
                <Text style={[styles.orderId, { fontSize: isSmallDevice ? 14 : 16 }]}>
                  {order.id}
                </Text>
                <Text style={[styles.orderDate, { fontSize: isSmallDevice ? 12 : 14 }]}>
                  {new Date(order.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Text>
              </View>
              <View style={styles.statusContainer}>
                {getStatusIcon(order.status)}
                <Text style={[
                  styles.statusText, 
                  { 
                    color: getStatusColor(order.status),
                    fontSize: isSmallDevice ? 12 : 14 
                  }
                ]}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Text>
              </View>
            </View>

            <View style={styles.orderItems}>
              {order.items.slice(0, 2).map((item, index) => (
                <Text key={index} style={[styles.itemText, { fontSize: isSmallDevice ? 12 : 14 }]}>
                  • {item.name} (x{item.quantity})
                </Text>
              ))}
              {order.items.length > 2 && (
                <Text style={[styles.moreItems, { fontSize: isSmallDevice ? 12 : 14 }]}>
                  +{order.items.length - 2} more item{order.items.length - 2 !== 1 ? 's' : ''}
                </Text>
              )}
            </View>

            <View style={styles.orderFooter}>
              <Text style={[styles.orderTotal, { fontSize: isSmallDevice ? 14 : 16 }]}>
                Total: ${order.total.toFixed(2)}
              </Text>
              <View style={styles.actionButtons}>
                {order.status !== 'cancelled' && (
                  <TouchableOpacity
                    style={[styles.actionButton, styles.trackButton]}
                    onPress={() => handleTrackOrder(order)}
                  >
                    <Text style={[styles.actionButtonText, { fontSize: isSmallDevice ? 11 : 12 }]}>
                      Track
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[styles.actionButton, styles.reorderButton]}
                  onPress={() => handleReorder(order)}
                >
                  <Text style={[styles.actionButtonText, { fontSize: isSmallDevice ? 11 : 12 }]}>
                    Reorder
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 20 }} />
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
    borderBottomColor: '#EAEAEA',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    color: '#333',
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  orderCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderId: {
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 4,
  },
  orderDate: {
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
  },
  orderItems: {
    marginBottom: 12,
  },
  itemText: {
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 2,
  },
  moreItems: {
    fontFamily: 'Inter-Medium',
    color: '#4B7BF5',
    marginTop: 4,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderTotal: {
    fontFamily: 'Inter-SemiBold',
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    minWidth: 60,
    alignItems: 'center',
  },
  trackButton: {
    backgroundColor: '#E3F2FD',
  },
  reorderButton: {
    backgroundColor: '#E8F5E8',
  },
  actionButtonText: {
    fontFamily: 'Inter-Medium',
    color: '#333',
  },
});
