import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { useCart } from '../../hooks/useCart';
import { router } from 'expo-router';

export default function CheckoutScreen() {
  const { cart, totalPrice, clearCart } = useCart();
  const [deliveryAddress, setDeliveryAddress] = useState('123 Main St, Pune');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  const subtotal = totalPrice;
  const deliveryFee = 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const handlePlaceOrder = () => {
    Alert.alert(
      'Order Placed!',
      'Your order has been successfully placed.',
      [
        {
          text: 'Track Order',
          onPress: () => {
            clearCart();
            router.push('/orders');
          },
        },
        {
          text: 'Continue Shopping',
          onPress: () => {
            clearCart();
            router.push('/(tabs)');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressCard}>
            <Ionicons name="location" size={20} color={COLORS.primary} />
            <TextInput
              style={styles.addressInput}
              value={deliveryAddress}
              onChangeText={setDeliveryAddress}
              placeholder="Enter delivery address"
              placeholderTextColor={COLORS.textLight}
            />
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'card' && styles.paymentSelected,
            ]}
            onPress={() => setPaymentMethod('card')}
          >
            <Ionicons
              name="card-outline"
              size={24}
              color={paymentMethod === 'card' ? COLORS.primary : COLORS.textLight}
            />
            <Text
              style={[
                styles.paymentText,
                paymentMethod === 'card' && { color: COLORS.primary },
              ]}
            >
              Credit/Debit Card
            </Text>
            {paymentMethod === 'card' && (
              <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'cash' && styles.paymentSelected,
            ]}
            onPress={() => setPaymentMethod('cash')}
          >
            <Ionicons
              name="cash-outline"
              size={24}
              color={paymentMethod === 'cash' ? COLORS.primary : COLORS.textLight}
            />
            <Text
              style={[
                styles.paymentText,
                paymentMethod === 'cash' && { color: COLORS.primary },
              ]}
            >
              Cash on Delivery
            </Text>
            {paymentMethod === 'cash' && (
              <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
            )}
          </TouchableOpacity>
        </View>

        {/* Delivery Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Instructions</Text>
          <TextInput
            style={styles.instructionsInput}
            value={deliveryInstructions}
            onChangeText={setDeliveryInstructions}
            placeholder="Add delivery instructions..."
            placeholderTextColor={COLORS.textLight}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryItem, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Place Order Button */}
        <TouchableOpacity style={styles.placeOrderBtn} onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderText}>Place Order</Text>
          <Text style={styles.placeOrderPrice}>${total.toFixed(2)}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  section: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 12,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  addressInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    paddingVertical: 0,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 12,
  },
  paymentSelected: {
    borderBottomColor: COLORS.primary,
  },
  paymentText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
  instructionsInput: {
    fontSize: 16,
    color: COLORS.text,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  summaryValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: 6,
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
  },
  placeOrderBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
  },
  placeOrderText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
  },
  placeOrderPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
  },
});