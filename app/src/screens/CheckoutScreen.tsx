import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';
import { CartUtils } from '@mumbai-jaan/shared';

const CheckoutScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { cart, clearCart } = useCart();
  const [userName, setUserName] = useState('');
  const [orderType, setOrderType] = useState<'Dine-in' | 'Delivery' | null>(null);

  const handleCheckout = () => {
    if (!userName.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    if (!orderType) {
      Alert.alert('Error', 'Please select order type');
      return;
    }

    const orderNumber = CartUtils.generateOrderNumber('MJB-MOBILE');
    Alert.alert(
      'Order Confirmed!',
      `Order #${orderNumber}\n\nWould you like to send this via WhatsApp?`,
      [
        {
          text: 'Send via WhatsApp',
          onPress: () => {
            clearCart();
            navigation.navigate('CartTab', { screen: 'OrderStatus', params: { orderNumber } });
          },
        },
        {
          text: 'Done',
          onPress: () => {
            clearCart();
            navigation.navigate('CartTab', { screen: 'OrderStatus', params: { orderNumber } });
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top }]} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Order Details</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Items</Text>
        {cart.items.map(item => (
          <View key={item.id} style={styles.itemRow}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQty}>x{item.quantity}</Text>
            <Text style={styles.itemTotal}>₹{(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        ))}
        <View style={styles.divider} />
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>₹{cart.total.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#666"
          value={userName}
          onChangeText={setUserName}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Type</Text>
        <TouchableOpacity
          style={[styles.typeButton, orderType === 'Dine-in' && styles.typeButtonActive]}
          onPress={() => setOrderType('Dine-in')}
        >
          <Text style={[styles.typeButtonText, orderType === 'Dine-in' && styles.typeButtonTextActive]}>
            🍽️ Dine-in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, orderType === 'Delivery' && styles.typeButtonActive]}
          onPress={() => setOrderType('Delivery')}
        >
          <Text style={[styles.typeButtonText, orderType === 'Delivery' && styles.typeButtonTextActive]}>
            🚚 Delivery
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleCheckout}>
        <Text style={styles.confirmButtonText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  section: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomColor: '#444',
    borderBottomWidth: 1,
  },
  itemName: {
    flex: 1,
    color: '#fff',
  },
  itemQty: {
    color: '#999',
    marginHorizontal: 8,
  },
  itemTotal: {
    color: '#ff9f1c',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#444',
    marginVertical: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  totalLabel: {
    color: '#fff',
    fontWeight: '600',
  },
  totalValue: {
    color: '#ff9f1c',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 12,
    borderRadius: 6,
    borderColor: '#666',
    borderWidth: 1,
    marginBottom: 12,
  },
  typeButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: '#1a1a1a',
    marginBottom: 8,
    borderColor: '#666',
    borderWidth: 1,
  },
  typeButtonActive: {
    backgroundColor: '#ff9f1c',
    borderColor: '#ff9f1c',
  },
  typeButtonText: {
    color: '#999',
    fontWeight: '600',
  },
  typeButtonTextActive: {
    color: '#1a1a1a',
  },
  confirmButton: {
    backgroundColor: '#ff9f1c',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#1a1a1a',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default CheckoutScreen;
