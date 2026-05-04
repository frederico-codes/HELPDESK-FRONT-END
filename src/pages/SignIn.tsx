import { Input } from "../componentes/Input"
import { Button } from "../componentes/Button"
import background_desktop from "../assets/Login_Background_Desktop.svg"
import background_mobile from "../assets/Login_Background_Mobile.png"
import { AxiosError } from "axios"
import { useActionState, useEffect, useState } from "react"
import { api } from "../services/api"
import { z, ZodError } from "zod"
import { useAuth } from "../hooks/useAuth"
import LogoIconDark from "../assets/icons/Logo_IconDark.svg"

const signInScheme = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().trim().min(1, { message: "Informe a senha" }),
})

type SignInState = {
  message?: string
  errors?: {
    email?: string
    password?: string
  }
} | null

type LocalErrors = {
  email?: string
  password?: string
}

export function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [localErrors, setLocalErrors] = useState<LocalErrors>({})

  const auth = useAuth()

  const [state, formAction, isLoading] = useActionState<SignInState, FormData>(
    signIn,
    null
  )

  useEffect(() => {
    setLocalErrors({
      email: state?.errors?.email,
      password: state?.errors?.password,
    })
  }, [state])

  async function signIn(_: SignInState, formData: FormData): Promise<SignInState> {
    try {
      const data = signInScheme.parse({
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
      })

      const response = await api.post("/sessions", data)
      auth.save(response.data)

      return null
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = error.flatten().fieldErrors as {
          email?: string[];
          password?: string[];
        };
        

        return {
          errors: {
            email: fieldErrors.email?.[0],
            password: fieldErrors.password?.[0],
          },
        };
      }

      if (error instanceof AxiosError) {
        return {
          message: error.response?.data?.message ?? "Não foi possível entrar",
        }
      }

      return { message: "Não foi possível entrar" }
    }
  }

  return (
    <div className="w-screen h-screen overflow-hidden xl:grid grid-cols-2 relative">
      <section className="hidden xl:block w-screen h-screen">
        <img
          src={background_desktop}
          alt="imagem azul"
          className="w-screen h-screen object-cover"
        />
      </section>

      <section className="block xl:hidden w-screen h-screen absolute -z-10">
        <img
          src={background_mobile}
          alt="imagem azul"
          className="w-screen h-screen object-cover"
        />
      </section>

      <div className="w-full h-screen mt-4 flex flex-col items-center justify-center xl:px-50 gap-4 bg-white absolute xl:relative py-24 rounded-3xl xl:rounded-none xl:rounded-tl-2xl">
        <form
          action={formAction}
          noValidate
          className="lg:w-[470px] max-[470px]"
        >
          <div className="flex justify-center gap-2 mb-8">
            <img src={LogoIconDark} alt="Logo" />
            <h1 className="text-2xl --color-blue-dark font-bold">HelpDesk</h1>
          </div>

          <div className="p-7 border border-gray-500 rounded-lg mb-3">
            <h1 className="text-xl font-bold">Acesse o portal</h1>
            <span>Entre usando seu e-mail e senha cadastrados</span>

            <div className="mt-10 flex flex-col gap-10">
              <Input
                name="email"
                required
                legend="E-mail"
                type="email"
                placeholder="exemplo@mail.com"
                value={email}
                error={localErrors.email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setLocalErrors((prev) => ({ ...prev, email: undefined }));
                }}
              />

              <Input
                name="password"
                required
                legend="Senha"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                error={localErrors.password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLocalErrors((prev) => ({ ...prev, password: undefined }));
                }}
              />

              {state?.message && (
                <div className="text-red-500 text-sm mt-2">{state.message}</div>
              )}
            </div>

            <Button type="submit" isLoading={isLoading}>
              Entrar
            </Button>
          </div>

          <div className="p-7 border border-gray-500 rounded-lg">
            <p className="text-base font-semibold">Ainda não tem uma conta?</p>
            <span className="text-xs">Cadastre agora mesmo</span>
            <a
              href="/signup"
              className="flex justify-center items-center py-1.5 rounded-lg cursor-pointer mt-7 bg-gray-500 hover:bg-gray-600 transition ease-linear text-gray-200"
            >
              Criar conta
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}