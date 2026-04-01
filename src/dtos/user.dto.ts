export type UserRole = "technical" | "customer" | "manager";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};