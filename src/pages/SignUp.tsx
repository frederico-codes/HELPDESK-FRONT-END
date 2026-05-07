import { Input } from "../componentes/Input"
import { Button } from "../componentes/Button"
import { useState } from "react"
import background_desktop from "../assets/Login_Background_Desktop.svg"
import background_mobile from "../assets/Login_Background_Mobile.png"
import { z } from "zod"
import Logo_IconDark from "../assets/icons/Logo_IconDark.svg"
import { api } from "../services/api"
import { useNavigate } from "react-router"
import { AxiosError } from "axios"

const signUpSchema = z.object({
  name: z.string().trim().min(1, { message: "Informe o nome" }),
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(6, { message: "Senha deve ter pelo menos 6 digitos" }),
})

type FormErrors = {
  name?: string
  email?: string
  password?: string
}

export function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsloading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const navigate = useNavigate()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrors({})

    const result = signUpSchema.safeParse({
      name,
      email,
      password,
    })

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors

      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      })

      return
    }

    try {
      setIsloading(true)

      await api.post("/users", result.data)

      if (confirm("Cadastrado com sucesso. Ir para tela de entrar?")) {
        navigate("/")
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return alert(error.response?.data?.message ?? "Não foi possível cadastrar")
      }

      alert("Não foi possível cadastrar")
    } finally {
      setIsloading(false)
    }
  }

  return (
    <div className="w-screen h-screen overflow-hidden xl:grid grid-cols-2 relative">
      <section className="hidden xl:block w-screen h-screen">
        <img src={background_desktop} alt="imagem azul" className="w-screen h-screen object-cover" />
      </section>

      <section className="block xl:hidden w-screen h-screen absolute -z-10">
        <img src={background_mobile} alt="imagem azul" className="w-screen h-screen object-cover" />
      </section>

      <div className="w-full h-screen mt-4 flex flex-col items-center justify-center xl:px-50 gap-4 bg-white absolute xl:relative py-24 rounded-3xl xl:rounded-none xl:rounded-tl-2xl">
        <form onSubmit={onSubmit} noValidate className="w-[88%] sm:w-[470px]">
          <div className="flex justify-center gap-2 mb-8">
            <img src={Logo_IconDark} alt="Logo" />
            <h1 className="text-2xl --color-blue-dark font-bold">HelpDesk</h1>
          </div>

          <div className="p-7 border border-gray-500 rounded-lg mb-3">
            <h1 className="text-xl font-bold">Crie sua conta</h1>
            <span>Informe seu nome, e-mail e senha</span>

            <div className="mt-10 flex flex-col gap-4">
              <Input
                name="name"
                required
                legend="Nome"
                type="text"
                placeholder="Digite o nome completo"
                value={name}
                error={errors.name}
                onChange={(e) => {
                  setName(e.target.value)
                  setErrors((prev) => ({ ...prev, name: undefined }))
                }}
              />

              <Input
                name="email"
                required
                legend="E-mail"
                type="email"
                placeholder="exemplo@mail.com"
                value={email}
                error={errors.email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setErrors((prev) => ({ ...prev, email: undefined }))
                }}
              />

              <Input
                name="password"
                required
                legend="senha"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                error={errors.password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setErrors((prev) => ({ ...prev, password: undefined }))
                }}
              />
            </div>

            <span className="mb-10 text-xs text-gray-400">
              Mínimo de 6 dígitos
            </span>

            <Button type="submit" isLoading={isLoading}>
              Cadastrar
            </Button>
          </div>

          <div className="p-7 border border-gray-500 rounded-lg">
            <p className="text-base font-semibold">Já tem uma conta?</p>
            <span className="text-xs">Entre agora mesmo</span>
            <a
              href="/"
              className="flex justify-center items-center py-1.5 rounded-lg cursor-pointer mt-7 bg-gray-500 hover:bg-gray-600 transition ease-linear text-gray-200"
            >
              Acessar conta
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}