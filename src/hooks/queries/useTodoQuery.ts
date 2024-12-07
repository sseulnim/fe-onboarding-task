import { useQuery } from "@tanstack/react-query";
import { todoAPI } from "@/services/todoApi";

// Query Keys
export const TODO_QUERY_KEYS = {
  all: ["todos"] as const,
  detail: (id: number) => ["todos", id] as const,
} as const;

// Todo 목록 조회 Hook
export const useTodosQuery = () => {
  return useQuery({
    queryKey: TODO_QUERY_KEYS.all,
    queryFn: todoAPI.getTodos,
  });
};

// Todo 상세 조회 Hook
export const useTodoQuery = (id: number) => {
  return useQuery({
    queryKey: TODO_QUERY_KEYS.detail(id),
    queryFn: () => todoAPI.getTodoById(id),
  });
};
