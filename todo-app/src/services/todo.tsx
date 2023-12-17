import api from "./api";

export type ToDoObject = {
  _id: string;
  title?: string;
  description?: string;
  user_id: string;
  createdAt: string;
  updatedAt: string;
}

export async function getAllToDos() {
  const { data } = await api.get<ToDoObject[]>("todos");
  return data;
}

export type ToDoPayload = {
  title?: string;
  description?: string;
};

export async function createToDo(payload: ToDoPayload) {
  const { data } = await api.post<ToDoObject>("todos", payload);
  return data;
}

export async function updateToDo(id: string, payload: ToDoPayload) {
  const { data } = await api.put<ToDoObject>(`todos/${id}`, payload);
  return data;
}

export async function deleteToDo(id: string) {
  await api.delete(`todos/${id}`);
  return id;
}