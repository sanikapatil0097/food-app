import React, { useState, useMemo } from 'react';
import {
  View, Text, Image, ScrollView, StyleSheet, Pressable, SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MenuItemCard from "../components/MenuItemCard";
import { COLORS } from "../constants/colors";

const RESTAURANT_DATA: Record<string, any> = {
  'r-1': {
    name: 'The Spice Route',
    bannerImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
    rating: 4.5,
    deliveryTime: '25-30 min',
    distanceKm: 2.1,
    cuisines: ['North Indian', 'Mughlai'],
    address: '45 Curry Lane, Andheri West, Mumbai',
    priceForTwo: 600,
    offers: ['50% OFF up to ₹100', 'Free delivery on orders above ₹299'],
    menu: [
      {
        category: 'Recommended',
        items: [
          { id: 'm-1', name: 'Butter Chicken', description: 'Tender chicken in a rich, creamy tomato gravy.', price: 320, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600', isVeg: false },
          { id: 'm-2', name: 'Paneer Tikka', description: 'Chargrilled cottage cheese marinated in spices.', price: 260, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600', isVeg: true },
        ],
      },
      {
        category: 'Breads',
        items: [
          { id: 'm-3', name: 'Butter Naan', description: 'Soft leavened bread brushed with butter.', price: 60, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600', isVeg: true },
        ],
      },
    ],
  },
};

const TABS = [
  { key: 'menu', label: 'Menu' },
  { key: 'reviews', label: 'Reviews' },
  { key: 'photos', label: 'Photos' },
  { key: 'info', label: 'Info' },
];

export default function RestaurantDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const restaurant = RESTAURANT_DATA[id ?? ''];

  const [activeTab, setActiveTab] = useState('menu');
  const [isFavorite, setIsFavorite] = useState(false);
  const [cartItems, setCartItems] = useState<Record<string, number>>({});

  const cartCount = useMemo(
    () => Object.values(cartItems).reduce((sum, qty) => sum + qty, 0),
    [cartItems]
  );

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Restaurant not found.</Text>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.notFoundLink}>Go back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const handleAddItem = (itemId: string) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] ?? 0) + 1 }));
  };

  const handleItemPress = (itemId: string) => {
    router.push(`/food/${itemId}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image source={{ uri: restaurant.bannerImage }} style={styles.banner} />
          <View style={styles.topBar}>
            <Pressable style={styles.iconButton} onPress={() => router.back()}>
              <FontAwesome5 name="arrow-left" size={16} color={COLORS.text} />
            </Pressable>
            <View style={styles.topBarRight}>
              <Pressable style={styles.iconButton} onPress={() => setIsFavorite((p) => !p)}>
                <FontAwesome5
                  name="heart"
                  solid={isFavorite}
                  size={16}
                  color={isFavorite ? COLORS.danger : COLORS.text}
                />
              </Pressable>
              <Pressable style={styles.iconButton}>
                <FontAwesome5 name="share-alt" size={16} color={COLORS.text} />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <Text style={styles.cuisines}>{restaurant.cuisines.join(' • ')}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <FontAwesome5 name="star" solid size={13} color={COLORS.warning} />
              <Text style={styles.metaText}>{restaurant.rating.toFixed(1)}</Text>
            </View>
            <View style={styles.metaItem}>
              <FontAwesome5 name="clock" size={13} color={COLORS.textLight} />
              <Text style={styles.metaText}>{restaurant.deliveryTime}</Text>
            </View>
            <View style={styles.metaItem}>
              <FontAwesome5 name="map-marker-alt" size={13} color={COLORS.textLight} />
              <Text style={styles.metaText}>{restaurant.distanceKm} km</Text>
            </View>
          </View>

          <Text style={styles.address}>{restaurant.address}</Text>

          {restaurant.offers.length > 0 && (
            <View style={styles.offersBox}>
              {restaurant.offers.map((offer: string, index: number) => (
                <View key={index} style={styles.offerRow}>
                  <FontAwesome5 name="tag" size={12} color={COLORS.primaryDark} />
                  <Text style={styles.offerText}>{offer}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.tabBar}>
          {TABS.map((tab) => (
            <Pressable
              key={tab.key}
              style={[styles.tabButton, activeTab === tab.key && styles.tabButtonActive]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.tabContent}>
          {activeTab === 'menu' &&
            restaurant.menu.map((section: any) => (
              <View key={section.category} style={styles.menuSection}>
                <Text style={styles.menuSectionTitle}>{section.category}</Text>
                {section.items.map((item: any) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    onPress={handleItemPress}
                    onAdd={handleAddItem}
                  />
                ))}
              </View>
            ))}
          {activeTab === 'reviews' && <Text style={styles.placeholderText}>Reviews will appear here.</Text>}
          {activeTab === 'photos' && <Text style={styles.placeholderText}>Customer photos will appear here.</Text>}
          {activeTab === 'info' && (
            <View>
              <Text style={styles.placeholderText}>Address: {restaurant.address}</Text>
              <Text style={styles.placeholderText}>Price for two: ₹{restaurant.priceForTwo}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {cartCount > 0 && (
        <Pressable style={styles.cartBar} onPress={() => router.push('/cart')}>
          <View style={styles.cartBarLeft}>
            <FontAwesome5 name="shopping-cart" size={16} color={COLORS.white} />
            <Text style={styles.cartBarText}>{cartCount} item{cartCount > 1 ? 's' : ''} added</Text>
          </View>
          <Text style={styles.cartBarLink}>View Cart →</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  notFoundText: { fontSize: 15, color: COLORS.textLight },
  notFoundLink: { fontSize: 15, fontWeight: '600', color: COLORS.primary },
  banner: { width: '100%', height: 220, backgroundColor: COLORS.border },
  topBar: {
    position: 'absolute', top: 16, left: 16, right: 16,
    flexDirection: 'row', justifyContent: 'space-between',
  },
  topBarRight: { flexDirection: 'row', gap: 8 },
  iconButton: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.white,
    alignItems: 'center', justifyContent: 'center',
    elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4,
  },
  infoCard: {
    backgroundColor: COLORS.card, marginTop: -16,
    borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 20,
  },
  name: { fontSize: 22, fontWeight: '700', color: COLORS.text, marginBottom: 2 },
  cuisines: { fontSize: 14, color: COLORS.textLight, marginBottom: 12 },
  metaRow: { flexDirection: 'row', gap: 16, marginBottom: 8 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 14, fontWeight: '500', color: COLORS.text },
  address: { fontSize: 12, color: COLORS.textLight, marginBottom: 12 },
  offersBox: { backgroundColor: '#E6FBF7', borderRadius: 12, padding: 12, gap: 4 },
  offerRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  offerText: { fontSize: 12, fontWeight: '500', color: COLORS.primaryDark },
  tabBar: {
    flexDirection: 'row', backgroundColor: COLORS.card,
    paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  tabButton: { paddingVertical: 12, marginRight: 20, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabButtonActive: { borderBottomColor: COLORS.primary },
  tabLabel: { fontSize: 14, fontWeight: '500', color: COLORS.textLight },
  tabLabelActive: { color: COLORS.primaryDark, fontWeight: '600' },
  tabContent: { backgroundColor: COLORS.card, paddingHorizontal: 20, paddingBottom: 32 },
  menuSection: { marginTop: 16 },
  menuSectionTitle: { fontSize: 17, fontWeight: '600', color: COLORS.text, marginBottom: 8 },
  placeholderText: { fontSize: 14, color: COLORS.textLight, marginTop: 16 },
  cartBar: {
    position: 'absolute', bottom: 16, left: 16, right: 16,
    backgroundColor: COLORS.primaryDark, borderRadius: 12,
    paddingVertical: 12, paddingHorizontal: 16,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 6,
  },
  cartBarLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  cartBarText: { color: COLORS.white, fontWeight: '600', fontSize: 14 },
  cartBarLink: { color: COLORS.white, fontWeight: '600', fontSize: 14 },
});