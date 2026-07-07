import React, { useState, useMemo } from 'react';
import {
  View, Text, Image, ScrollView, StyleSheet, Pressable, SafeAreaView, TextInput,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import QuantitySelector from "../components/QuantitySelector";
import { COLORS } from "../constants/colors";

const FOOD_DATA: Record<string, any> = {
  'm-1': {
    name: 'Butter Chicken',
    description: 'Tender chicken pieces simmered in a rich, creamy tomato gravy with butter and aromatic spices. A North Indian classic served best with naan or rice.',
    price: 320,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=1200',
    isVeg: false,
    addOns: [
      { id: 'a-1', name: 'Extra Butter', price: 20 },
      { id: 'a-2', name: 'Extra Gravy', price: 40 },
      { id: 'a-3', name: 'Cheese Topping', price: 50 },
    ],
  },
  'm-2': {
    name: 'Paneer Tikka',
    description: 'Chargrilled cottage cheese cubes marinated in yogurt and spices, cooked to smoky perfection in a tandoor.',
    price: 260,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=1200',
    isVeg: true,
    addOns: [
      { id: 'a-1', name: 'Mint Chutney', price: 15 },
      { id: 'a-2', name: 'Extra Paneer', price: 60 },
    ],
  },
};

export default function FoodDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const food = FOOD_DATA[id ?? ''];

  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [instructions, setInstructions] = useState('');

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId) ? prev.filter((a) => a !== addOnId) : [...prev, addOnId]
    );
  };

  const totalPrice = useMemo(() => {
    if (!food) return 0;
    const addOnsTotal = food.addOns
      .filter((a: any) => selectedAddOns.includes(a.id))
      .reduce((sum: number, a: any) => sum + a.price, 0);
    return (food.price + addOnsTotal) * quantity;
  }, [food, selectedAddOns, quantity]);

  if (!food) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Item not found.</Text>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.notFoundLink}>Go back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    router.push('/cart');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View>
          <Image source={{ uri: food.image }} style={styles.image} />
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <FontAwesome5 name="arrow-left" size={16} color={COLORS.text} />
          </Pressable>
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View style={[styles.vegBadge, { borderColor: food.isVeg ? COLORS.success : COLORS.danger }]}>
              <View style={[styles.vegDot, { backgroundColor: food.isVeg ? COLORS.success : COLORS.danger }]} />
            </View>
            <Text style={styles.name}>{food.name}</Text>
          </View>

          <View style={styles.ratingRow}>
            <FontAwesome5 name="star" solid size={13} color={COLORS.warning} />
            <Text style={styles.rating}>{food.rating.toFixed(1)}</Text>
            <Text style={styles.price}>₹{food.price}</Text>
          </View>

          <Text style={styles.description}>{food.description}</Text>

          <View style={styles.divider} />

          <View style={styles.quantityRow}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity((q) => q + 1)}
              onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
            />
          </View>

          <View style={styles.divider} />

          {food.addOns.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Add-ons</Text>
              {food.addOns.map((addOn: any) => {
                const isSelected = selectedAddOns.includes(addOn.id);
                return (
                  <Pressable key={addOn.id} style={styles.addOnRow} onPress={() => toggleAddOn(addOn.id)}>
                    <View style={styles.addOnLeft}>
                      <View style={[styles.checkbox, isSelected && styles.checkboxChecked]}>
                        {isSelected && <FontAwesome5 name="check" size={10} color={COLORS.white} />}
                      </View>
                      <Text style={styles.addOnName}>{addOn.name}</Text>
                    </View>
                    <Text style={styles.addOnPrice}>+₹{addOn.price}</Text>
                  </Pressable>
                );
              })}
              <View style={styles.divider} />
            </>
          )}

          <Text style={styles.sectionTitle}>Special Instructions</Text>
          <TextInput
            style={styles.instructionsInput}
            placeholder="E.g. less spicy, no onions..."
            placeholderTextColor={COLORS.textLight}
            value={instructions}
            onChangeText={setInstructions}
            multiline
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>Total</Text>
          <Text style={styles.footerPrice}>₹{totalPrice}</Text>
        </View>
        <Pressable style={styles.addToCartButton} onPress={handleAddToCart}>
          <FontAwesome5 name="shopping-cart" size={15} color={COLORS.white} />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  notFoundText: { fontSize: 15, color: COLORS.textLight },
  notFoundLink: { fontSize: 15, fontWeight: '600', color: COLORS.primary },
  image: { width: '100%', height: 260, backgroundColor: COLORS.border },
  backButton: {
    position: 'absolute', top: 16, left: 16,
    width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.white,
    alignItems: 'center', justifyContent: 'center',
    elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4,
  },
  content: { padding: 20 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  vegBadge: { width: 16, height: 16, borderRadius: 3, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  vegDot: { width: 7, height: 7, borderRadius: 4 },
  name: { fontSize: 22, fontWeight: '700', color: COLORS.text, flexShrink: 1 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  rating: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  price: { fontSize: 16, fontWeight: '700', color: COLORS.primaryDark, marginLeft: 8 },
  description: { fontSize: 14, color: COLORS.textLight, lineHeight: 20 },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 16 },
  quantityRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: COLORS.text, marginBottom: 12 },
  addOnRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  addOnLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 1.5, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  addOnName: { fontSize: 14, color: COLORS.text },
  addOnPrice: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  instructionsInput: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, padding: 12, fontSize: 14, color: COLORS.text, minHeight: 70, textAlignVertical: 'top' },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: COLORS.card, borderTopWidth: 1, borderTopColor: COLORS.border,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 16,
  },
  footerLabel: { fontSize: 12, color: COLORS.textLight },
  footerPrice: { fontSize: 20, fontWeight: '700', color: COLORS.text },
  addToCartButton: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: COLORS.primary, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 24 },
  addToCartText: { color: COLORS.white, fontWeight: '600', fontSize: 15 },
});