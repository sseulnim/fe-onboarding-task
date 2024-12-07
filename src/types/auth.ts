// 유저
export interface User {
  id: string;
  nickname: string;
  avatar?: string;
}

// 인증 상태
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// 회원가입
export interface RegisterRequest {
  id: string;
  password: string;
  nickname: string;
}

// 회원가입 응답
export interface RegisterResponse {
  success: boolean;
  message?: string;
}

// 로그인
export interface LoginRequest {
  id: string;
  password: string;
}

// 로그인 응답
export interface LoginResponse {
  accessToken: string;
  userId: string;
  avatar: string | null;
  nickname: string;
  success: boolean;
  message?: string;
}

// 프로필 업데이트
export interface ProfileUpdateRequest {
  nickname?: string;
  avatar?: File;
}

// 프로필 업데이트 응답
export interface ProfileUpdateResponse {
  avatar: string | null;
  nickname: string;
  message: string;
  success: boolean;
}
