import { Item, TodoItem } from "@/components/Item";
import { addTodo, getTodos } from "@/utils/storage";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [newTodo, setNewTodo] = useState<string>("");
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  async function handleAddTodo() {
    if (newTodo.trim()) {
      await addTodo({
        id: Math.floor(Math.random() * 100),
        isDone: false,
        title: newTodo,
      });
      setNewTodo("");
      refreshTodos();
      Keyboard.dismiss();
    }
  }

  async function refreshTodos() {
    handleSearch(searchTerm);
  }

  async function handleSearch(term: string) {
    const lowerCaseTerm = term.toLowerCase();
    const filteredTodos = (await getTodos()).filter((eachTodo) =>
      eachTodo.title.toLowerCase().includes(lowerCaseTerm)
    );
    setTodos(filteredTodos);
  }

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    refreshTodos();
  }, []);

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
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      <FlatList
        data={[...todos].reverse()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Item item={item} refreshTodos={refreshTodos} />
        )}
      />

      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={10}
        style={styles.footer}
      >
        <TextInput
          placeholder="Type your todo."
          style={styles.newTodoInput}
          value={newTodo}
          onChangeText={setNewTodo}
          autoCorrect={false}
        />
        <TouchableOpacity onPress={handleAddTodo} style={styles.addButton}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
  },
  newTodoInput: {
    backgroundColor: "#fff",
    flex: 1,
    borderRadius: 10,
    fontSize: 16,
    color: "#333",
    paddingLeft: 16,
  },
  addButton: {
    backgroundColor: "#4630eb",
    padding: 8,
    borderRadius: 10,
  },
});
