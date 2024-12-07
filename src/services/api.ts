import axios from "axios";
import {
  LoginRequest,
  LoginResponse,
  ProfileUpdateRequest,
  ProfileUpdateResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/types/auth";

export const BASE_URL = "https://moneyfulpublicpolicy.co.kr";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// authAPI 추가
export const authAPI = {
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>("/register", data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/login", data);
    return response.data;
  },

  updateProfile: async (
    data: ProfileUpdateRequest
  ): Promise<ProfileUpdateResponse> => {
    const formData = new FormData();
    if (data.avatar) {
      // 파일 크기 체크 추가
      if (data.avatar.size > 5 * 1024 * 1024) {
        // 5MB 제한
        throw new Error("File size too large. Maximum size is 5MB.");
      }
      formData.append("avatar", data.avatar);
    }
    if (data.nickname) formData.append("nickname", data.nickname);

    const response = await api.patch<ProfileUpdateResponse>(
      "/profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization 헤더는 인터셉터에서 처리됨
        },
        // timeout 설정 추가
        timeout: 10000,
      }
    );
    return response.data;
  },
};
