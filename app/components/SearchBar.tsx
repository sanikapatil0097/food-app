import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar() {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3 mt-3">
      <Ionicons name="search" size={20} color="#5fdbd0" />
      <TextInput
        placeholder="Search restaurants or food..."
        placeholderTextColor="#999"
        className="flex-1 ml-2 text-base text-gray-700"
        style={{ padding: 0 }}
      />
      <Ionicons name="mic" size={20} color="#5fdbd0" />
    </View>
  );
}