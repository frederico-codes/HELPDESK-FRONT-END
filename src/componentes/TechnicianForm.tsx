import menu from "../assets/icons/Menu.png";
import LogoIconLight from "../assets/Logo_IconLight.png";
import avatar from "../assets/Avatar.svg";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar } from "../componentes/Sidebar";
import { Input } from "../componentes/Input";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { z } from "zod";

interface TechnicianFormProps {
  technicianId?: string;
}

type TechnicianResponse = {
  id: string;
  name: string;
  email: string;
  role: "technical" | "customer" | "manager";
  availability?: string[];
};

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
};

export function TechnicianForm({ technicianId }: TechnicianFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [availability, setAvailability] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingTechnician, setIsFetchingTechnician] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const schema = z.object({
    name: z.string().trim().min(1, "Nome obrigatório"),
    email: z.string().trim().email("E-mail inválido"),
    password: technicianId
      ? z
          .string()
          .trim()
          .min(6, "Senha mínima de 6 caracteres")
          .optional()
          .or(z.literal(""))
      : z.string().trim().min(6, "Senha mínima de 6 caracteres"),
  });

  const navigate = useNavigate();

  const morningHours = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00"];
  const afternoonHours = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
  const nightHours = ["19:00", "20:00", "21:00", "22:00", "23:00"];

  useEffect(() => {
    async function fetchTechnician() {
      if (!technicianId) return;

      try {
        setIsFetchingTechnician(true);

        const response = await api.get<TechnicianResponse>(`/users/${technicianId}`);
        const technician = response.data;

        setName(technician.name);
        setEmail(technician.email);
        setAvailability(technician.availability ?? []);
      } catch (error) {
        if (error instanceof AxiosError) {
          alert(error.response?.data?.message ?? "Erro ao buscar técnico.");
          return;
        }

        alert("Não foi possível carregar os dados do técnico.");
      } finally {
        setIsFetchingTechnician(false);
      }
    }

    fetchTechnician();
  }, [technicianId]);

  function toggleHour(hour: string) {
    setAvailability((prev) =>
      prev.includes(hour)
        ? prev.filter((item) => item !== hour)
        : [...prev, hour]
    );
  }

  function isSelected(hour: string) {
    return availability.includes(hour);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const result = schema.safeParse({
      name,
      email,
      password,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });

      return;
    }

    try {
      setIsLoading(true);

      const data = {
        name: result.data.name,
        email: result.data.email,
        password: result.data.password || undefined,
        role: "technical" as const,
        availability,
      };

      if (technicianId) {
        await api.put(`/users/${technicianId}`, data);
        alert("Técnico atualizado com sucesso.");
      } else {
        await api.post("/users", data);
        alert("Técnico cadastrado com sucesso.");
      }

      navigate("/technicians");
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message ?? "Erro ao salvar técnico.");
        return;
      }

      alert("Não foi possível salvar o técnico.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen xl:grid xl:grid-cols-[280px_1fr] bg-gray-100 xl:overflow-hidden">

      <Sidebar />

      <section className="block xl:hidden w-screen h-screen absolute">
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-3.5 absolute top-7 left-6">
            <img src={menu} alt="menu" />

            <div className="flex justify-center gap-4">
              <img
                src={LogoIconLight}
                alt="LogoIconLight"
                className="h-11 w-11"
              />
              <div>
                <h1 className="text-xl text-gray-600">HelpDesk</h1>
                <span className="text-xxs text-blue-light uppercase">
                  Técnico
                </span>
              </div>
            </div>
          </div>

          <div>
            <img
              src={avatar}
              alt="avatar"
              className="absolute top-8 right-10"
            />
          </div>
        </div>
      </section>

      <form
        onSubmit={onSubmit}
        noValidate
        className="w-full flex flex-col xl:px-14 gap-4 bg-white absolute xl:relative py-24 rounded-3xl xl:rounded-none xl:rounded-tl-2xl mt-28 xl:mt-4"
      >
        <div className="w-full h-full flex flex-col px-6">
          <div className="flex flex-col">
            <Link
              to="/technicians"
              className="flex items-center gap-2 text-sm text-gray-700  font-bold transition ease-linear mb-4 relative left-0 xl:left-30 cursor-pointer"
            >
              <span className="text-lg font-bold">←</span>
              Voltar
            </Link>

            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-8 xl:px-30">
              <h1 className="text-2xl font-bold text-blue-dark">
                {technicianId ? "Editar técnico" : "Perfil de técnico"}
              </h1>

              <div className="flex justify-between gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/technicians")}
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-500 text-gray-700 text-sm cursor-pointer"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={isLoading || isFetchingTechnician}
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 text-gray-600 text-sm cursor-pointer hover:bg-gray-300 disabled:opacity-50"
                >
                  {isLoading ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </div>
          </div>

          {isFetchingTechnician ? (
            <div className="px-6 py-8 text-sm text-gray-400">
              Carregando dados do técnico...
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-[290px_1fr] gap-10 xl:px-28">
              <div className="border border-gray-500 rounded-xl p-6 bg-white">
                <h2 className="text-base font-semibold mb-1">Dados pessoais</h2>
                <p className="text-xs">
                  Defina as informações do perfil de técnico
                </p>

                <span className="w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center mt-6 mb-6 text-2xl">
                  {name
                    ? name
                        .split(" ")
                        .slice(0, 2)
                        .map((part) => part[0]?.toUpperCase())
                        .join("")
                    : "TC"}
                </span>

                <div className="flex flex-col gap-2">
                  <Input
                    name="name"
                    required
                    legend="NOME"
                    type="text"
                    value={name}
                    placeholder="Carlos Silva"
                    error={errors.name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  <Input
                    name="email"
                    required
                    legend="E-MAIL"
                    type="email"
                    placeholder="carlos.silva@test.com"
                    value={email}
                    error={errors.email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                  />
                </div>            
              </div>

              <div className="border border-gray-500 rounded-xl p-6 bg-white">
                <h2 className="text-base font-semibold mb-1">
                  Horários de atendimento
                </h2>
                <p className="text-xs mb-6">
                  Selecione os horários de disponibilidade do técnico para atendimento
                </p>

                <h3 className="text-xs font-bold mb-2">MANHÃ</h3>
                <div className="flex flex-wrap gap-3 mb-6">
                  {morningHours.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => toggleHour(h)}
                      className={`px-2.5 py-1.5 border rounded-full text-xs transition ease-linear cursor-pointer ${
                        isSelected(h)
                          ? "bg-blue-700 text-white border-blue-700"
                          : "border-gray-300 hover:bg-gray-500 hover:border-gray-500"
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>

                <h3 className="text-xs font-bold mb-2">TARDE</h3>
                <div className="flex flex-wrap gap-3 mb-6">
                  {afternoonHours.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => toggleHour(h)}
                      className={`px-2.5 py-1.5 border rounded-full text-xs transition ease-linear cursor-pointer ${
                        isSelected(h)
                          ? "bg-blue-700 text-white border-blue-700"
                          : "border-gray-300 hover:bg-gray-500 hover:border-gray-500"
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>

                <h3 className="text-xs font-bold mb-2">NOITE</h3>
                <div className="flex flex-wrap gap-3">
                  {nightHours.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => toggleHour(h)}
                      className={`px-2.5 py-1.5 border rounded-full text-xs transition ease-linear cursor-pointer ${
                        isSelected(h)
                          ? "bg-blue-700 text-white border-blue-700"
                          : "border-gray-300 hover:bg-gray-500 hover:border-gray-500"
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}