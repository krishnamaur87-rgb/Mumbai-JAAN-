import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MENU_ITEMS } from '@mumbai-jaan/shared';
import { useCart } from '../context/CartContext';

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/500x300?text=Image+Unavailable';

const MenuScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { addItem } = useCart();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                         item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // extract item card into its own component so we can manage image error state
  const MenuItemCell = ({ item }: { item: typeof MENU_ITEMS[0] }) => {
    const [uri, setUri] = useState(item.image);

    return (
      <View style={styles.itemCard}>
        <Image
          source={{ uri }}
          style={styles.itemImage}
          resizeMode="cover"
          onError={() => setUri(PLACEHOLDER_IMAGE)}
        />
        <View style={styles.itemContent}>
          <Text style={styles.itemCategory}>{item.category}</Text>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.itemFooter}>
            <Text style={styles.itemPrice}>₹{item.price}</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addItem(item)}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }: { item: typeof MENU_ITEMS[0] }) => (
    <MenuItemCell item={item} />
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Search Bar */}
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search items..."
          placeholderTextColor="#666"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Categories */}
      <View style={styles.categoriesSection}>
        <TouchableOpacity
          style={[styles.categoryButton, !selectedCategory && styles.categoryButtonActive]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text style={[styles.categoryText, !selectedCategory && styles.categoryTextActive]}>All</Text>
        </TouchableOpacity>
        {['Biryani', 'Appetizers', 'Desserts', 'Beverages'].map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryButton, selectedCategory === cat && styles.categoryButtonActive]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Menu Items */}
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No items found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  searchSection: {
    padding: 16,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  searchInput: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    borderColor: '#666',
    borderWidth: 1,
  },
  categoriesSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 6,
    backgroundColor: '#2a2a2a',
  },
  categoryButtonActive: {
    backgroundColor: '#ff9f1c',
  },
  categoryText: {
    color: '#999',
    fontSize: 12,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#1a1a1a',
  },
  listContent: {
    padding: 12,
  },
  itemCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: 120,
  },
  itemContent: {
    padding: 12,
  },
  itemCategory: {
    color: '#ff9f1c',
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemDescription: {
    color: '#999',
    fontSize: 12,
    marginBottom: 8,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    color: '#ff9f1c',
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#ff9f1c',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#1a1a1a',
    fontWeight: '600',
    fontSize: 12,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#999',
    fontSize: 16,
  },
});

export default MenuScreen;
