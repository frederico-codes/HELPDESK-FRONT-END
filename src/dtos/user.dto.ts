export type UserRole = "technical" | "customer" | "manager";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  availability?: string[];
};

export type Session = {
  token: string;
  user: User;
};

export type UserApiResponse = {
  token: string;
  userWithoutPassword: User;
};