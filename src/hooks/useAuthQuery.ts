import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

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
