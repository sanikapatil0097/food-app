import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JM</Text>
        </View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john@email.com</Text>
      </View>
      
      <View style={styles.menuItem}>
        <Ionicons name="person-outline" size={24} color="#5fdbd0" />
        <Text style={styles.menuText}>Edit Profile</Text>
        <Ionicons name="chevron-forward" size={20} color="#999" style={styles.menuArrow} />
      </View>
      
      <View style={styles.menuItem}>
        <Ionicons name="card-outline" size={24} color="#5fdbd0" />
        <Text style={styles.menuText}>Payment Methods</Text>
        <Ionicons name="chevron-forward" size={20} color="#999" style={styles.menuArrow} />
      </View>
      
      <View style={styles.menuItem}>
        <Ionicons name="heart-outline" size={24} color="#5fdbd0" />
        <Text style={styles.menuText}>Favorites</Text>
        <Ionicons name="chevron-forward" size={20} color="#999" style={styles.menuArrow} />
      </View>
      
      <View style={styles.menuItem}>
        <Ionicons name="settings-outline" size={24} color="#5fdbd0" />
        <Text style={styles.menuText}>Settings</Text>
        <Ionicons name="chevron-forward" size={20} color="#999" style={styles.menuArrow} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#5fdbd0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 12,
  },
  email: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  menuText: {
    fontSize: 16,
    color: '#1f2937',
    marginLeft: 12,
    flex: 1,
  },
  menuArrow: {
    marginLeft: 'auto',
  },
});