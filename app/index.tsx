import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const todoData = [
    {
      id: 1,
      title: "Todo 1",
      isDone: false,
    },
    {
      id: 2,
      title: "Todo 2",
      isDone: false,
    },
    {
      id: 3,
      title: "Todo 3",
      isDone: false,
    },
    {
      id: 4,
      title: "Todo 4",
      isDone: true,
    },
    {
      id: 5,
      title: "Todo 5",
      isDone: false,
    },
    {
      id: 6,
      title: "Todo 6",
      isDone: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            alert("Clicked!");
          }}
        >
          <Ionicons name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={{ uri: "https://xsgames.co/randomusers/avatar.php?g=male" }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color="#333" />
        <TextInput
          placeholder="Search Todo"
          style={styles.searchInput}
          clearButtonMode="always"
        />
      </View>

      <FlatList
        data={todoData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoContainer}>
            <View style={styles.todoInfoContainer}>
              <Checkbox value={item.isDone} />
              <Text style={styles.todoText}>{item.title}</Text>
            </View>
            <TouchableOpacity onPress={() => { alert("Deleted " + item.id) }}>
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBar: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 10,
    gap: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  todoContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  todoInfoContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  todoText: {
    fontSize: 16,
    color: "#333"
  }
});
