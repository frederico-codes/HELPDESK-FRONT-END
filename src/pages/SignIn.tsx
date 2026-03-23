import { Input } from "../componentes/Input"
import { Button } from "../componentes/Button"
import background_desktop from "../assets/Login_Background_Desktop.svg";
import background_mobile from "../assets/Login_Background_Mobile.png";
import { AxiosError } from "axios";
import { useActionState } from "react";
import { api } from "../services/api"
import { z, ZodError} from "zod"
import { useAuth } from "../hooks/useAuth"
import LogoIconDark from "../assets/icons/Logo_IconDark.svg";


const signInScheme = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().trim().min(1, {message: "Informe a senha"})
})



export function SignIn(){
 
  const [ state, formAction, isLoading ] = useActionState( signIn, null )


  const auth = useAuth()

  async function signIn(_: any, formData: FormData){       
    try {
      const data = signInScheme.parse({
        email: formData.get("email"),
        password: formData.get("password"),
      })

      const response = await api.post("/sessions",data)
      auth.save(response.data)
    } catch (error) {
      console.log(error)

      if(error instanceof ZodError){
        return { message: error.issues[0].message }
      }

      if(error instanceof AxiosError){
        return { message: error.response?.data.message }
      }

      return { message: "Não foi possível entrar" }
    }
    
  }  


  return(
    <div className="w-screen h-screen overflow-hidden  xl:grid grid-cols-2 relative ">
      <section className="hidden xl:block w-screen h-screen">
        <img src={background_desktop} alt="imagem azul" className="w-screen h-screen object-cover"/>
      </section>
      <section className="block  xl:hidden w-screen h-screen absolute -z-10">
        <img src={background_mobile} alt="imagem azul" className="w-screen h-screen object-cover"/>
      </section>      

      <div className="w-full h-screen mt-4  flex flex-col items-center justify-center xl:px-50  gap-4 bg-white absolute xl:relative py-24  rounded-3xl xl:rounded-none xl:rounded-tl-2xl ">
        <form action ={ formAction } className="max-w-[400px] ">  
          <div className="flex justify-center gap-2 mb-8">
            <img src= { LogoIconDark } alt="Logo"/>
            <h1 className="text-2xl --color-blue-dark font-bold">HelpDesk</h1>
          </div>
  
          <div className="p-7">
            <h1 className="text-xl font-bold">Acesse o portal</h1>
            <span>Entre usando seu e-mail e senha cadastrados</span>
            <div className="mt-10 flex flex-col gap-4">
  
              <Input
                name = "email"
                required
                legend="E-mail"
                type="email"
                placeholder="exemplo@mail.com"
              />
  
              <Input
                name = "password"
                required
                legend="senha"
                type="password"
                placeholder="Digite sua senha"
              />
  
              <p className="text-sm text-red-600 text-center my-4 font-medium">
                { state?.message }
              </p>
            </div>
  
            <Button type="submit" isLoading={isLoading}>
              Entrar
            </Button>
          </div>
  
          <div className="p-7">
            <p className="text-base font-semibold">Ainda não tem uma conta?</p>
            <span className="text-xs">Cadastre agora mesmo</span>
            <a href="/signup" className="flex justify-center items-center py-1.5 rounded-lg cursor-pointer mt-7 bg-gray-500 hover:bg-gray-600 transition ease-linear text-gray-200">
            Criar conta
            </a>
          </div>
        </form>
      </div>
    </div>
  )

}