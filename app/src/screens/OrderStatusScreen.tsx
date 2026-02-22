import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const OrderStatusScreen = ({ route, navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { orderNumber } = route.params || { orderNumber: 'MJB-UNKNOWN' };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 40 }]}>
      <View style={styles.successContainer}>
        <Text style={styles.emoji}>✓</Text>
        <Text style={styles.title}>Order Confirmed!</Text>
        <Text style={styles.orderNumber}>Order #{orderNumber}</Text>

        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Order Status</Text>
          <View style={styles.statusItem}>
            <Text style={styles.statusDot}>●</Text>
            <Text style={styles.statusText}>Order Received</Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={[styles.statusDot, styles.inactiveStatus]}>●</Text>
            <Text style={[styles.statusText, styles.inactiveStatus]}>Preparing</Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={[styles.statusDot, styles.inactiveStatus]}>●</Text>
            <Text style={[styles.statusText, styles.inactiveStatus]}>Ready</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Estimated Time:</Text>
          <Text style={styles.infoValue}>30-45 minutes</Text>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('HomeTab')}
        >
          <Text style={styles.continueButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  successContainer: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  orderNumber: {
    fontSize: 18,
    color: '#ff9f1c',
    fontWeight: '600',
    marginBottom: 24,
  },
  statusCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    width: '100%',
    marginBottom: 20,
  },
  statusTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 12,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statusDot: {
    color: '#ff9f1c',
    fontSize: 12,
    marginRight: 12,
  },
  inactiveStatus: {
    color: '#666',
  },
  statusText: {
    color: '#fff',
    fontWeight: '500',
  },
  infoCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  infoLabel: {
    color: '#999',
    fontSize: 14,
    marginBottom: 4,
  },
  infoValue: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: '#ff9f1c',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#1a1a1a',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default OrderStatusScreen;
