import api from "./axios";

export type LoginPayload = {
  userId: string;
  password: string;
};

export const loginApi = async ({ userId, password }: LoginPayload) => {
  const response = await api.post("/auth/login", {
    userId,
    password,
  });

  return response.data;
};
