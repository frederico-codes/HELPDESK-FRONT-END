import { Routes } from "./routes"
import { AuthProvider } from "./contexts/AuthContext"
import { UserProvider } from "./contexts/UserContext";

export function App(){

  return  (  
  <AuthProvider>
    <UserProvider>
      <Routes/>  
    </UserProvider>
  </AuthProvider>
  )
}