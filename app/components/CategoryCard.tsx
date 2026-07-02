import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CategoryCardProps {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

export default function CategoryCard({ name, icon, color }: CategoryCardProps) {
  return (
    <TouchableOpacity className="items-center mr-4">
      <View 
        className="w-16 h-16 rounded-full items-center justify-center"
        style={{ backgroundColor: color + '20' }} // 20 = 12% opacity
      >
        <Ionicons name={icon} size={28} color={color} />
      </View>
      <Text className="text-xs text-gray-600 mt-1">{name}</Text>
    </TouchableOpacity>
  );
}