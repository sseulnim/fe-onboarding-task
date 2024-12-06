// API 응답
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// API 에러 응답
export interface ErrorResponse {
  message: string;
  success: false;
}
