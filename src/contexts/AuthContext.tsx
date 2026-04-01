import { createContext, useEffect, useState } from "react"
import type { ReactNode } from "react"
import type { UserApiResponse, Session } from "../dtos/user"

type AuthContextType = {
  isLoading:boolean
  session: Session | null
  save: (data: UserApiResponse) => void
  remove:() => void
}

const LOCAL_STORAGE_KEY = "@helpdesk"

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  function save(data: UserApiResponse) {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}:user`, JSON.stringify(data.userWithoutPassword))
    localStorage.setItem(`${ LOCAL_STORAGE_KEY}:token`, data.token)

    const sessionFormatted: Session = {
      token: data.token,
      user: data.userWithoutPassword,
    }    

    setSession(sessionFormatted)
  }

  function remove(){
    setSession(null)

    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`)
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`)

    window.location.assign("/")
  }

  function loadUser(){
    const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`)
    const token = localStorage.getItem(`${ LOCAL_STORAGE_KEY}:token`)

    if(token && user){
      setSession({
        token,
        user:JSON.parse(user)
      })
    }

    setIsLoading(false)
  }

  

  useEffect(() => {
    loadUser()
  }, [])


  return (
    <AuthContext.Provider value={{ session, save, remove, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
