import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

const categories = [
  { name: "Pizza", icon: "pizza", color: "#FF6B6B" },
  { name: "Burger", icon: "fast-food", color: "#FFA94D" },
  { name: "Sushi", icon: "restaurant", color: "#FF6B9D" },
  { name: "Biryani", icon: "flame", color: "#FF4757" },
  { name: "Chinese", icon: "egg", color: "#2ED573" },
  { name: "Dessert", icon: "ice-cream", color: "#A29BFE" },
];

const restaurants = [
  {
    id: 1,
    name: "Pizza Palace",
    image: "https://picsum.photos/seed/pizza/400/300",
    rating: 4.5,
    deliveryTime: "20-30 min",
    cuisine: "Italian, Pizza",
    priceForTwo: "400",
  },
  {
    id: 2,
    name: "Burger King",
    image: "https://picsum.photos/seed/burger/400/300",
    rating: 4.2,
    deliveryTime: "15-25 min",
    cuisine: "American, Fast Food",
    priceForTwo: "350",
  },
  {
    id: 3,
    name: "Sushi Express",
    image: "https://picsum.photos/seed/sushi/400/300",
    rating: 4.8,
    deliveryTime: "25-35 min",
    cuisine: "Japanese, Sushi",
    priceForTwo: "600",
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.deliverText}>Deliver to</Text>
            <View style={styles.locationRow}>
              <Text style={styles.locationText}>Home Address</Text>
              <Text style={styles.locationArrow}>▼</Text>
            </View>
          </View>
          <View style={styles.profileCircle}>
            <Text style={styles.profileText}>JM</Text>
          </View>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#5fdbd0" />
          <TextInput
            placeholder="Search restaurants or food..."
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
          <Ionicons name="mic" size={20} color="#5fdbd0" />
        </View>

        {/* Promotional Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>🎉 Get 50% OFF on your first order!</Text>
          <Text style={styles.bannerSubtitle}>Use code: JMFOODIE50</Text>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {categories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryItem}>
                <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                  <Ionicons name={category.icon as any} size={28} color={category.color} />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Top Restaurants */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Restaurants</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {restaurants.map((restaurant) => (
            <TouchableOpacity key={restaurant.id} style={styles.restaurantCard}>
              <Image
                source={{ uri: restaurant.image }}
                style={styles.restaurantImage}
                resizeMode="cover"
              />
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
                <View style={styles.restaurantMeta}>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>★ {restaurant.rating}</Text>
                  </View>
                  <Text style={styles.deliveryTime}>• {restaurant.deliveryTime}</Text>
                  <Text style={styles.priceForTwo}>₹{restaurant.priceForTwo} for two</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  deliverText: {
    fontSize: 12,
    color: '#6b7280',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  locationArrow: {
    fontSize: 18,
    marginLeft: 4,
    color: '#1f2937',
  },
  profileCircle: {
    backgroundColor: '#5fdbd0',
    borderRadius: 999,
    padding: 8,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginTop: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#374151',
    padding: 0,
  },
  banner: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#5fdbd0',
    borderRadius: 12,
    padding: 16,
  },
  bannerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bannerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginTop: 4,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  seeAll: {
    color: '#5fdbd0',
    fontWeight: '600',
  },
  categoriesScroll: {
    marginTop: 12,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: 12,
    color: '#4b5563',
    marginTop: 4,
  },
  restaurantCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  restaurantImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  restaurantInfo: {
    padding: 12,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  restaurantCuisine: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  restaurantMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingContainer: {
    backgroundColor: '#22c55e',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  ratingText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  deliveryTime: {
    fontSize: 12,
    color: '#9ca3af',
    marginLeft: 8,
  },
  priceForTwo: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 'auto',
  },
  bottomSpace: {
    height: 20,
  },
});