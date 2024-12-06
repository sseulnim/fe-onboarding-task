export interface User {
  id: string;
  nickname: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface RegisterRequest {
  id: string;
  password: string;
  nickname: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
}
