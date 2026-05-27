export type UserRole = "admin" | "operator" | "viewer";

export type User = {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
};
