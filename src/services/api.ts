import axios from "axios";
import { ApiResponse } from "@/types/api";
import {
  LoginRequest,
  LoginResponse,
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
  register: async (
    data: RegisterRequest
  ): Promise<ApiResponse<RegisterResponse>> => {
    const response = await api.post("/register", data);
    return response.data;
  },
  login: async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await api.post("/login", data);
    return response.data;
  },
};
