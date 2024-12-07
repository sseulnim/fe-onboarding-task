import axios from "axios";
import type { Todo } from "@/types/todo";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const todoAPI = {
  // Todo 목록 조회
  getTodos: async (): Promise<Todo[]> => {
    const response = await axios.get<Todo[]>(`${BASE_URL}/todos`);
    return response.data;
  },

  // Todo 상세 조회
  getTodoById: async (id: number): Promise<Todo> => {
    const response = await axios.get<Todo>(`${BASE_URL}/todos/${id}`);
    return response.data;
  },
};
