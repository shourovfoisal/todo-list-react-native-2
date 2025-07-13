import { Ionicons } from "@expo/vector-icons"
import Checkbox from "expo-checkbox"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export type TodoItem = {
  id: number,
  title: string,
  isDone: boolean
}

export const Item = ({ item }: {item: TodoItem}) => {
  return (
    <View style={styles.todoContainer}>
            <View style={styles.todoInfoContainer}>
              <Checkbox value={item.isDone} color={item.isDone ? "#4630eb" : ""} />
              <Text style={[styles.todoText, item.isDone ? { textDecorationLine: "line-through" } : {}]}>{item.title}</Text>
            </View>
            <TouchableOpacity onPress={() => { alert("Deleted " + item.id) }}>
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
  )
}

const styles = StyleSheet.create({
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
  },
})