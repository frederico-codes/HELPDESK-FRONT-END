import { createContext, useState,type ReactNode } from "react";
import type { User } from "../dtos/user.dto";


type UserContextData = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    id: "",
    name: "Usuário Cliente",
    email: "user.client@test.com",
    role: "customer",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

