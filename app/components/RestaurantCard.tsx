import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface RestaurantCardProps {
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  cuisine: string;
  priceForTwo: string;
}

export default function RestaurantCard({
  name,
  image,
  rating,
  deliveryTime,
  cuisine,
  priceForTwo,
}: RestaurantCardProps) {
  return (
    <TouchableOpacity className="mb-4 bg-white rounded-xl shadow-sm">
      <Image
        source={{ uri: image }}
        className="w-full h-48 rounded-t-xl"
        resizeMode="cover"
      />
      <View className="p-3">
        <Text className="text-lg font-bold text-gray-800">{name}</Text>
        <Text className="text-sm text-gray-500">{cuisine}</Text>
        <View className="flex-row items-center justify-between mt-2">
          <View className="flex-row items-center">
            <View className="bg-green-500 rounded-lg px-2 py-1">
              <Text className="text-white text-xs font-bold">★ {rating}</Text>
            </View>
            <Text className="text-xs text-gray-400 ml-2">• {deliveryTime}</Text>
          </View>
          <Text className="text-sm text-gray-500">₹{priceForTwo} for two</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});
}