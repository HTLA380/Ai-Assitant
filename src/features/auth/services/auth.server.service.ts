import { User } from "@/features/auth/types";
import api from "@/lib/axios.server";

export const getProfile = async (): Promise<User | null> => {
  try {
    const response = await api.get<User>("/auth/me");

    return response.data || null;
  } catch (_) {
    return null;
  }
};
