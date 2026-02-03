import type { UserRole } from "./types";

export const inferRoleFromUserId = (userId: string): UserRole | null => {
  if (userId.includes("STD")) return "student";
  if (userId.includes("MEN")) return "mentor";
  return null;
};
