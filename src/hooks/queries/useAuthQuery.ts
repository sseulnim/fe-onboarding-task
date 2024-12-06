import { useMutation, useQuery } from "@tanstack/react-query";
import { api, authAPI } from "@/services/api";
import type { LoginRequest, RegisterRequest } from "@/types/auth";
import { useAuthStore } from "@/store/authStore";

// 쿼리 키
export const QUERY_KEYS = {
  USER: "user",
} as const;

// 유저 조회
export const useUserQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER],
    queryFn: async () => {
      const response = await api.get("/user");
      return response.data;
    },
  });
};

// 회원가입
export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authAPI.register(data),
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });
};

// 로그인과 유저 상태 업데이트
export const useLoginMutation = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data: LoginRequest) => authAPI.login(data),
    onSuccess: (response) => {
      if (response.success) {
        localStorage.setItem("accessToken", response.data.accessToken);
        setUser({
          id: response.data.userId,
          nickname: response.data.nickname,
          avatar: response.data.avatar ?? undefined,
        });
      }
    },
  });
};
