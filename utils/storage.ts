import { TodoItem } from "@/components/Item";
import AsyncStorage from "@react-native-async-storage/async-storage";

const todoStorageName = "todos";

export async function getTodos(): Promise<TodoItem[]> {
  const todoListString = await AsyncStorage.getItem(todoStorageName);
  return todoListString === null ? [] : JSON.parse(todoListString);
}

export async function addTodo(item: TodoItem): Promise<void> {
  const todos = await getTodos();
  todos.push(item);
  await AsyncStorage.setItem(todoStorageName, JSON.stringify(todos));
}

export async function deleteTodo(id: number): Promise<void> {
  const todos = await getTodos();
  AsyncStorage.setItem(
    todoStorageName,
    JSON.stringify(todos.filter((eachTodo) => eachTodo.id !== id))
  );
}
