export type UserRole = "ADMIN" | "EMPLOYEE";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  creatorId: string | null;
};
