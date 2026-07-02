import { StatusBar } from "expo-status-bar";
import { 
  Text, View, ScrollView, SafeAreaView, StyleSheet, 
  TouchableOpacity, Image, TextInput, Platform, 
  Dimensions, Modal, Pressable 
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from "@expo/vector-icons";
import { useState } from "react";

const { width, height } = Dimensions.get('window');

// Premium Color Scheme
const COLORS = {
  // Primary - Warm & Sophisticated
  primary: '#C0392B',        // Deep rich red - elegant dining
  primaryLight: '#E74C3C',
  primaryDark: '#922B21',
  
  // Secondary - Golden Accent
  secondary: '#D4A574',      // Warm gold - luxury feel
  secondaryLight: '#E8C9A0',
  secondaryDark: '#B8863A',
  
  // Accent Colors
  accent: '#F39C12',         // Warm amber
  success: '#27AE60',
  warning: '#F1C40F',
  danger: '#E74C3C',
  
  // Neutral Colors
  dark: '#2C1810',           // Dark brown - warm base
  darkGray: '#4A3728',
  gray: '#8B7355',
  lightGray: '#EDE4D8',
  cream: '#FDF8F3',          // Warm cream background
  white: '#FFFFFF',
  
  // Status Colors
  open: '#27AE60',
  closed: '#E74C3C',
  
  // Shadows
  shadow: 'rgba(44, 24, 16, 0.12)',
  shadowLight: 'rgba(44, 24, 16, 0.06)',
};

// Dummy Data
const categories = [
  { id: 1, name: "Appetizers", icon: "utensils", color: "#C0392B" },
  { id: 2, name: "Main Course", icon: "drumstick-bite", color: "#D4A574" },
  { id: 3, name: "Seafood", icon: "fish", color: "#2980B9" },
  { id: 4, name: "Pasta", icon: "pasta", color: "#27AE60" },
  { id: 5, name: "Desserts", icon: "cake-candles", color: "#8E44AD" },
  { id: 6, name: "Beverages", icon: "wine-glass", color: "#E67E22" },
  { id: 7, name: "Salads", icon: "leaf", color: "#2ECC71" },
  { id: 8, name: "Soups", icon: "bowl-food", color: "#F39C12" },
];

const restaurants = [
  {
    id: 1,
    name: "The Grand Kitchen",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
    rating: 4.8,
    deliveryTime: "25-35 min",
    cuisine: "Multi-Cuisine, Fine Dining",
    priceForTwo: "1200",
    isOpen: true,
    discount: "20% OFF",
    isPremium: true,
  },
  {
    id: 2,
    name: "Spice Garden",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400",
    rating: 4.6,
    deliveryTime: "20-30 min",
    cuisine: "Indian, Tandoori",
    priceForTwo: "800",
    isOpen: true,
    discount: "15% OFF",
    isPremium: false,
  },
  {
    id: 3,
    name: "Sushi Zen",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400",
    rating: 4.9,
    deliveryTime: "30-40 min",
    cuisine: "Japanese, Sushi",
    priceForTwo: "1500",
    isOpen: false,
    discount: null,
    isPremium: true,
  },
  {
    id: 4,
    name: "Tuscany Bistro",
    image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=400",
    rating: 4.7,
    deliveryTime: "20-25 min",
    cuisine: "Italian, Mediterranean",
    priceForTwo: "1000",
    isOpen: true,
    discount: "10% OFF",
    isPremium: false,
  },
  {
    id: 5,
    name: "The Royal Dining",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400",
    rating: 4.5,
    deliveryTime: "35-45 min",
    cuisine: "Mughlai, Royal Cuisine",
    priceForTwo: "1800",
    isOpen: true,
    discount: "25% OFF",
    isPremium: true,
  },
];

const featuredItems = [
  {
    id: 1,
    name: "Chef's Special Platter",
    description: "Premium selection of appetizers",
    price: "899",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
    discount: "30% OFF",
  },
  {
    id: 2,
    name: "Wine & Dine Experience",
    description: "3-course meal with wine pairing",
    price: "1499",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
    discount: "25% OFF",
  },
  {
    id: 3,
    name: "Family Feast",
    description: "Perfect for 4-6 people",
    price: "2499",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
    discount: "35% OFF",
  },
];

export default function App() {
  const [isDineIn, setIsDineIn] = useState(true); // Default to dine-in
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const toggleMode = () => setIsDineIn(!isDineIn);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor={COLORS.cream} />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.brandContainer}>
              <FontAwesome5 name="crown" size={22} color={COLORS.secondary} />
              <Text style={styles.brandText}>JM Dining</Text>
            </View>
            <View style={styles.modeToggle}>
              <TouchableOpacity 
                style={[styles.modeButton, !isDineIn && styles.modeButtonActive]}
                onPress={() => setIsDineIn(false)}
              >
                <Feather name="truck" size={14} color={!isDineIn ? COLORS.white : COLORS.gray} />
                <Text style={[styles.modeText, !isDineIn && styles.modeTextActive]}>Delivery</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modeButton, isDineIn && styles.modeButtonActive]}
                onPress={() => setIsDineIn(true)}
              >
                <Feather name="home" size={14} color={isDineIn ? COLORS.white : COLORS.gray} />
                <Text style={[styles.modeText, isDineIn && styles.modeTextActive]}>Dine In</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton} onPress={() => setShowCart(true)}>
              <Ionicons name="cart-outline" size={24} color={COLORS.dark} />
              {cartItems.length > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileCircle}>
              <Text style={styles.profileText}>JM</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Location & Welcome */}
        <View style={styles.locationContainer}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>John 👋</Text>
          </View>
          <View style={styles.locationInfo}>
            <Ionicons name="location-sharp" size={18} color={COLORS.secondary} />
            <Text style={styles.locationText}>123 Main Street, NYC</Text>
            <Ionicons name="chevron-down" size={16} color={COLORS.gray} />
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchWrapper}>
          <View style={styles.searchContainer}>
            <Feather name="search" size={22} color={COLORS.secondary} />
            <TextInput
              placeholder="Search for restaurants or dishes..."
              placeholderTextColor={COLORS.gray}
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.searchIcon}>
              <Feather name="mic" size={22} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Mode Banner */}
        {isDineIn ? (
          <View style={styles.dineInBanner}>
            <View style={styles.bannerContent}>
              <View style={styles.bannerIconContainer}>
                <Feather name="home" size={28} color={COLORS.white} />
              </View>
              <View style={styles.bannerTextContainer}>
                <Text style={styles.bannerTitle}>Welcome to Dine In</Text>
                <Text style={styles.bannerSubtitle}>Reserve your table & enjoy a premium dining experience</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Reserve Table</Text>
              <Feather name="arrow-right" size={16} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.deliveryBanner}>
            <View style={styles.bannerContent}>
              <View style={styles.bannerIconContainer}>
                <Feather name="truck" size={28} color={COLORS.white} />
              </View>
              <View style={styles.bannerTextContainer}>
                <Text style={styles.bannerTitle}>Fast Delivery</Text>
                <Text style={styles.bannerSubtitle}>Free delivery on orders above ₹499</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Order Now</Text>
              <Feather name="arrow-right" size={16} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        )}

        {/* Featured Items */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <FontAwesome5 name="crown" size={18} color={COLORS.secondary} />
              <Text style={styles.sectionTitle}>Featured Deals</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.featuredScroll}
          >
            {featuredItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.featuredCard}>
                <Image source={{ uri: item.image }} style={styles.featuredImage} />
                <View style={styles.featuredOverlay}>
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{item.discount}</Text>
                  </View>
                  {isDineIn && (
                    <View style={styles.dineInBadge}>
                      <Text style={styles.dineInBadgeText}>Dine In</Text>
                    </View>
                  )}
                </View>
                <View style={styles.featuredInfo}>
                  <Text style={styles.featuredName}>{item.name}</Text>
                  <Text style={styles.featuredDescription}>{item.description}</Text>
                  <View style={styles.featuredPriceRow}>
                    <Text style={styles.featuredPrice}>₹{item.price}</Text>
                    <TouchableOpacity style={styles.addButton}>
                      <Feather name="plus" size={20} color={COLORS.white} />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <Feather name="grid" size={18} color={COLORS.secondary} />
              <Text style={styles.sectionTitle}>Categories</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {categories.map((category) => (
              <TouchableOpacity 
                key={category.id} 
                style={[
                  styles.categoryItem,
                  selectedCategory === category.id && styles.categoryItemActive
                ]}
                onPress={() => setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )}
              >
                <View style={[
                  styles.categoryIcon,
                  { backgroundColor: category.color + '15' },
                  selectedCategory === category.id && { backgroundColor: category.color }
                ]}>
                  <FontAwesome5 
                    name={category.icon} 
                    size={22} 
                    color={selectedCategory === category.id ? COLORS.white : category.color} 
                  />
                </View>
                <Text style={[
                  styles.categoryName,
                  selectedCategory === category.id && styles.categoryNameActive
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Restaurants */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <Feather name="star" size={18} color={COLORS.secondary} />
              <Text style={styles.sectionTitle}>
                {isDineIn ? "Premium Dining" : "Top Restaurants"}
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {restaurants.map((restaurant) => (
            <TouchableOpacity key={restaurant.id} style={styles.restaurantCard}>
              <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
              {restaurant.isPremium && (
                <View style={styles.premiumBadge}>
                  <FontAwesome5 name="crown" size={10} color={COLORS.white} />
                  <Text style={styles.premiumBadgeText}>Premium</Text>
                </View>
              )}
              {restaurant.discount && (
                <View style={styles.restaurantDiscount}>
                  <Text style={styles.restaurantDiscountText}>{restaurant.discount}</Text>
                </View>
              )}
              {!restaurant.isOpen && (
                <View style={styles.closedOverlay}>
                  <Text style={styles.closedText}>Currently Closed</Text>
                </View>
              )}
              <View style={styles.restaurantInfo}>
                <View style={styles.restaurantNameRow}>
                  <Text style={styles.restaurantName}>{restaurant.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color={COLORS.warning} />
                    <Text style={styles.ratingText}>{restaurant.rating}</Text>
                  </View>
                </View>
                <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
                <View style={styles.restaurantMeta}>
                  <View style={styles.metaItem}>
                    <Feather name="clock" size={14} color={COLORS.gray} />
                    <Text style={styles.metaText}>{restaurant.deliveryTime}</Text>
                  </View>
                  <View style={styles.metaDot} />
                  <View style={styles.metaItem}>
                    <Feather name="dollar-sign" size={14} color={COLORS.gray} />
                    <Text style={styles.metaText}>₹{restaurant.priceForTwo} for two</Text>
                  </View>
                  {isDineIn && (
                    <>
                      <View style={styles.metaDot} />
                      <View style={styles.metaItem}>
                        <Feather name="users" size={14} color={COLORS.gray} />
                        <Text style={styles.metaText}>Table available</Text>
                      </View>
                    </>
                  )}
                </View>
                <TouchableOpacity style={[
                  styles.orderButton,
                  isDineIn && styles.dineInButton
                ]}>
                  <Text style={styles.orderButtonText}>
                    {isDineIn ? "Reserve Table" : "Order Now"}
                  </Text>
                  <Feather name="arrow-right" size={18} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* Cart Modal */}
      <Modal
        visible={showCart}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCart(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Your Cart</Text>
              <TouchableOpacity onPress={() => setShowCart(false)}>
                <Feather name="x" size={24} color={COLORS.dark} />
              </TouchableOpacity>
            </View>
            {cartItems.length === 0 ? (
              <View style={styles.emptyCart}>
                <Feather name="shopping-bag" size={60} color={COLORS.lightGray} />
                <Text style={styles.emptyCartText}>Your cart is empty</Text>
                <Text style={styles.emptyCartSubtext}>Start exploring our menu!</Text>
              </View>
            ) : (
              <View>
                <View style={styles.cartTotal}>
                  <Text style={styles.cartTotalText}>Total</Text>
                  <Text style={styles.cartTotalPrice}>₹0</Text>
                </View>
                <TouchableOpacity style={[styles.checkoutButton, isDineIn && styles.dineInButton]}>
                  <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 0 : 12,
    paddingBottom: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  brandText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginLeft: 8,
  },
  modeToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    padding: 2,
  },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 18,
    gap: 4,
  },
  modeButtonActive: {
    backgroundColor: COLORS.primary,
  },
  modeText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.gray,
  },
  modeTextActive: {
    color: COLORS.white,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  profileCircle: {
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  locationContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  welcomeSection: {
    marginBottom: 6,
  },
  welcomeText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  locationText: {
    fontSize: 13,
    color: COLORS.darkGray,
    fontWeight: '500',
  },
  searchWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cream,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: COLORS.dark,
    padding: 0,
  },
  searchIcon: {
    padding: 4,
  },
  dineInBanner: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  deliveryBanner: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bannerIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  bannerButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bannerButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 12,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  seeAll: {
    color: COLORS.secondary,
    fontWeight: '600',
    fontSize: 13,
  },
  featuredScroll: {
    marginLeft: -4,
  },
  featuredCard: {
    width: width * 0.7,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginRight: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: 140,
  },
  featuredOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    gap: 6,
  },
  discountBadge: {
    backgroundColor: COLORS.danger,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  dineInBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dineInBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  featuredInfo: {
    padding: 12,
  },
  featuredName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  featuredDescription: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  featuredPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  featuredPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesScroll: {
    marginTop: 4,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoryItemActive: {
    // Additional styles for active state
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 6,
    fontWeight: '500',
  },
  categoryNameActive: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  restaurantCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginTop: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
    position: 'relative',
  },
  restaurantImage: {
    width: '100%',
    height: 180,
  },
  premiumBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: COLORS.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  premiumBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  restaurantDiscount: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  restaurantDiscountText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  closedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(44, 24, 16, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closedText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  restaurantInfo: {
    padding: 14,
  },
  restaurantNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.success + '15',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.success,
  },
  restaurantCuisine: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
  },
  restaurantMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: COLORS.gray,
  },
  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.lightGray,
  },
  orderButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 12,
    gap: 8,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  dineInButton: {
    backgroundColor: COLORS.secondary,
  },
  orderButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  bottomSpace: {
    height: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(44, 24, 16, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: height * 0.8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  emptyCart: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginTop: 16,
  },
  emptyCartSubtext: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
  },
  cartTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  cartTotalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  cartTotalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});