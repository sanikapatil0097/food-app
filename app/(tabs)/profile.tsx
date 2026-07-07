import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const COLORS = {
  primary: "#14B8A6",
  primaryDark: "#0F766E",
  secondary: "#34D399",
  background: "#F8FAFC",
  white: "#FFFFFF",
  text: "#1F2937",
  textLight: "#6B7280",
  border: "#E5E7EB",
  offer: "#F97316",
  danger: "#EF4444",
  success: "#22C55E",
  warning: "#F59E0B",
};

export default function HomeScreen() {
  const [mode, setMode] = useState<"dinein" | "delivery">("dinein");
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>👋 Good Morning</Text>
            <Text style={styles.username}>Welcome to JM Foodie</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn}>
            <Ionicons name="person" size={22} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Location */}
        <TouchableOpacity style={styles.locationBox}>
          <Ionicons name="location" size={20} color={COLORS.primary} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.deliver}>Deliver to</Text>
            <Text style={styles.location}>Pune, Maharashtra</Text>
          </View>
          <Ionicons name="chevron-down" size={18} color={COLORS.text} />
        </TouchableOpacity>

        {/* Search */}
        <View style={styles.searchBox}>
          <Feather name="search" size={20} color={COLORS.textLight} />
          <TextInput
            placeholder="Search restaurants, dishes..."
            value={search}
            onChangeText={setSearch}
            style={styles.input}
            placeholderTextColor={COLORS.textLight}
          />
        </View>

        {/* Dine In Delivery */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              mode === "dinein" && styles.activeButton,
            ]}
            onPress={() => setMode("dinein")}
          >
            <MaterialCommunityIcons
              name="silverware-fork-knife"
              size={20}
              color={mode === "dinein" ? COLORS.white : COLORS.primary}
            />
            <Text
              style={[
                styles.toggleText,
                mode === "dinein" && { color: COLORS.white },
              ]}
            >
              Dine In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              mode === "delivery" && styles.activeButton,
            ]}
            onPress={() => setMode("delivery")}
          >
            <Feather
              name="truck"
              size={20}
              color={mode === "delivery" ? COLORS.white : COLORS.primary}
            />
            <Text
              style={[
                styles.toggleText,
                mode === "delivery" && { color: COLORS.white },
              ]}
            >
              Delivery
            </Text>
          </TouchableOpacity>
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>
              {mode === "dinein"
                ? "Reserve Your Table 🍽️"
                : "Fast Food Delivery 🚚"}
            </Text>
            <Text style={styles.bannerSubtitle}>
              {mode === "dinein"
                ? "Book tables instantly at nearby restaurants."
                : "Order food in minutes with JM Foodie."}
            </Text>
          </View>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
            }}
            style={styles.bannerImage}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  greeting: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  username: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },
  profileBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  locationBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  deliver: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  location: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.text,
    paddingVertical: 0,
  },
  toggleContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  toggleButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  activeButton: {
    backgroundColor: COLORS.primary,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
  },
  banner: {
    flexDirection: "row",
    marginHorizontal: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    minHeight: 140,
  },
  bannerContent: {
    flex: 1,
    marginRight: 10,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.white,
    marginBottom: 6,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: COLORS.white,
    opacity: 0.9,
    lineHeight: 18,
  },
  bannerImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
});