import { createContext, useContext, useState,type ReactNode } from "react";

type User = {
  name: string;
  email: string;
};

type UserContextData = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    name: "Usuário Cliente",
    email: "user.client@test.com",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}