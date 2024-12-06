import { useMutation, useQuery } from "@tanstack/react-query";
import { api, authAPI } from "@/services/api";
import type { RegisterRequest } from "@/types/auth";

export const QUERY_KEYS = {
  USER: "user",
} as const;

export const useUserQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER],
    queryFn: async () => {
      const response = await api.get("/user");
      return response.data;
    },
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authAPI.register(data),
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });
};
