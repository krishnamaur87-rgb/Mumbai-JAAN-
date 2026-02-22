import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MENU_ITEMS } from '@mumbai-jaan/shared';
import { useCart } from '../context/CartContext';

const HomeScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { addItem } = useCart();
  const featuredItems = MENU_ITEMS.slice(0, 3);

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top + 10 }]} contentContainerStyle={styles.contentContainer}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>🍛 Mumbai Jan Biryani</Text>
        <Text style={styles.heroSubtitle}>Authentic Mughlai Cuisine</Text>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.navigate('MenuTab', { screen: 'MenuList' })}
        >
          <Text style={styles.ctaText}>Order Now</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Items */}
      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>Featured Items</Text>
        {featuredItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemCard}
            onPress={() => {
              addItem(item);
            }}
          >
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription} numberOfLines={2}>
                {item.description}
              </Text>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* About Section */}
      <View style={styles.aboutSection}>
        <Text style={styles.sectionTitle}>About Us</Text>
        <Text style={styles.aboutText}>
          Premium biryani restaurant serving authentic Mughlai cuisine with traditional recipes and finest ingredients.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#0d0d0d',
    marginBottom: 20,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#999',
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: '#ff9f1c',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  ctaText: {
    color: '#1a1a1a',
    fontWeight: '600',
    fontSize: 16,
  },
  featuredSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  itemCard: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemImage: {
    width: 80,
    height: 80,
  },
  itemInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  itemName: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  itemDescription: {
    color: '#999',
    fontSize: 12,
    marginTop: 4,
  },
  itemPrice: {
    color: '#ff9f1c',
    fontWeight: '600',
    fontSize: 14,
    marginTop: 4,
  },
  aboutSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    marginHorizontal: 20,
  },
  aboutText: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default HomeScreen;
