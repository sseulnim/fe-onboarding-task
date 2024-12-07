export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// API 응답 타입
export interface TodoListResponse {
  data: Todo[];
}

export interface TodoDetailResponse {
  data: Todo;
}
