import Logo_IconLight from "../assets/icons/Logo_IconLight.svg";
import list from "../assets/icons/clipboard-list.svg";
import menu from "../assets/icons/Menu.png";
import LogoIconLight from "../assets/Logo_IconLight.png";
import avatar from "../assets/Avatar.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import plus from "../assets/icons/plus.svg";
import { Input } from "../componentes/Input";
import { Select } from "../componentes/Select";
import { useEffect, useMemo, useState } from "react";
import { AxiosError } from "axios";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";
import { z } from "zod";

type Service = {
  id: string;
  name: string;
  basePrice: number;
  active: boolean;
};

type Technician = {
  id: string;
  name: string;
  email: string;
  availability?: string[];
};

type FormErrors = {
  title?: string;
  description?: string;
  serviceId?: string;
  technicianId?: string;
};

function getInitials(name: string) {
  const parts = name.trim().split(" ").filter(Boolean);

  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0][0].toUpperCase();

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function CallForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { session } = useAuth();
  const { user } = useUser();

  const displayName = session?.user.name ?? user.name;
  const displayEmail = session?.user.email ?? user.email;
  const userInitials = getInitials(displayName);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [technicianId, setTechnicianId] = useState("");
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [isLoadingTechnicians, setIsLoadingTechnicians] = useState(true);
  const [errors, setErrors] = useState<FormErrors>({});

  const schema = z.object({
    title: z.string().trim().min(1, "Título obrigatório"),
    description: z.string().trim().min(1, "Descrição obrigatória"),
    serviceId: z.string().min(1, "Selecione uma categoria de serviço"),
    technicianId: z.string().min(1, "Selecione um técnico disponível"),
  });

  async function loadTechnicians() {
    try {
      setIsLoadingTechnicians(true);

      const response = await api.get<Technician[]>("/technicals");
      setTechnicians(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message ?? "Erro ao buscar técnicos.");
        return;
      }

      alert("Não foi possível carregar os técnicos.");
    } finally {
      setIsLoadingTechnicians(false);
    }
  }

  async function loadServices() {
    try {
      setIsLoadingServices(true);

      const response = await api.get<Service[]>("/services");
      setServices(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message ?? "Erro ao buscar serviços.");
        return;
      }

      alert("Não foi possível carregar os serviços.");
    } finally {
      setIsLoadingServices(false);
    }
  }

  useEffect(() => {
    loadServices();
    loadTechnicians();
  }, []);

  const selectedService = useMemo(
    () => services.find((service) => service.id === serviceId),
    [services, serviceId]
  );

  const selectedServiceName =
    selectedService?.name ?? "Selecione a categoria de atendimento";

  const selectedServicePrice = selectedService?.basePrice ?? 0;

  const selectedTechnician = useMemo(
    () => technicians.find((technician) => technician.id === technicianId),
    [technicians, technicianId]
  );

  const selectedTechnicianName =
    selectedTechnician?.name ?? "Selecione um técnico disponível";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    if (!session?.user.id) {
      alert("Usuário não identificado.");
      return;
    }

    const result = schema.safeParse({
      title,
      description,
      serviceId,
      technicianId,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        title: fieldErrors.title?.[0],
        description: fieldErrors.description?.[0],
        serviceId: fieldErrors.serviceId?.[0],
        technicianId: fieldErrors.technicianId?.[0],
      });

      return;
    }

    try {
      setIsSubmitting(true);

      await api.post("/calls", {
        title: result.data.title,
        description: result.data.description,
        serviceId: result.data.serviceId,
        technicianId: result.data.technicianId,
      });

      alert("Chamado criado com sucesso.");

      setTitle("");
      setDescription("");
      setServiceId("");
      setTechnicianId("");
      setErrors({});

      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message ?? "Erro ao criar chamado.");
        return;
      }

      alert("Não foi possível criar o chamado.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-screen h-screen xl:grid xl:grid-cols-[280px_1fr] relative bg-gray-100 xl:overflow-hidden">
      <section className="hidden xl:flex xl:flex-col xl:justify-between bg-gray-100 pl-6 pt-10 pb-6">
        <div>
          <div className="flex gap-3">
            <img src={Logo_IconLight} alt="Logo padrão" />
            <div className="flex flex-col">
              <h1 className="text-gray-600 text-xl">HelpDesk</h1>
              <span className="text-xxs text-blue-light uppercase">
                cliente
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-[730px]">
            <nav className="pt-5 px-4">
              <Link
                to="/"
                className={`w-[180px] flex items-center gap-2 text-sm p-3 outline-0 rounded-sm ${
                  location.pathname === "/"
                    ? "bg-blue-dark text-white"
                    : "text-gray-400"
                }`}
              >
                <img
                  src={list}
                  alt=""
                  className={
                    location.pathname === "/" ? "invert brightness-0" : ""
                  }
                />
                Meus chamados
              </Link>

              <Link
                to="/chamados/novo"
                className={`w-[180px] flex items-center gap-2 text-sm p-3 outline-0 rounded-sm ${
                  location.pathname === "/chamados/novo"
                    ? "bg-blue-dark text-white"
                    : "text-gray-400"
                }`}
              >
                <img src={plus} alt="" />
                Criar chamado
              </Link>
            </nav>
          </div>
        </div>

        <div className="flex items-center gap-2 text-white mb-5">
          <span className="w-8 h-8 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center">
            {userInitials}
          </span>
          <div className="flex flex-col">
            <span className="text-sm">{displayName}</span>
            <span className="text-xs text-gray-400">{displayEmail}</span>
          </div>
        </div>
      </section>

      <section className="block xl:hidden w-screen h-screen absolute top-0">
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-3.5 absolute top-7 left-6">
            <img src={menu} alt="menu" className="" />

            <div className="flex justify-center gap-4">
              <img
                src={LogoIconLight}
                alt="LogoIconLight"
                className="h-11 w-11"
              />
              <div>
                <h1 className="text-xl text-gray-600">HelpDesk</h1>
                <span className="text-xxs text-blue-light uppercase">
                  cliente
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

      <div className="w-full h-screen flex flex-col px-6 xl:px-6 gap-4 bg-white absolute xl:relative pt-2 rounded-3xl xl:rounded-none xl:rounded-tl-2xl mt-28 xl:mt-4">
        <div className="min-h-screen px-4 py-6 lg:px-44">
          <h1 className="text-xl font-semibold text-blue-700 mb-6">
            Novo chamado
          </h1>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]"
          >
            <div className="bg-white rounded-xl border border-gray-500 p-6">
              <h2 className="text-base font-semibold text-gray-900">
                Informações
              </h2>

              <p className="text-sm mt-1">
                Descreva o problema e selecione o serviço desejado
              </p>

              <div className="pt-6">
                <Input
                  name="titulo"
                  required
                  legend="TÍTULO"
                  type="text"
                  value={title}
                  placeholder="Digite um título para o chamado"
                  error={errors.title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setErrors((prev) => ({ ...prev, title: undefined }));
                  }}
                />
              </div>

              <div className="mt-6">
                <label className="block text-xs font-semibold mb-2">
                  DESCRIÇÃO
                </label>
                <textarea
                  name="descricao"
                  required
                  placeholder="Descreva o que está acontecendo"
                  rows={6}
                  className="w-full border border-gray-500 py-2 px-4 text-sm text-gray-700 resize-none focus:outline-none focus:border-blue-600"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setErrors((prev) => ({ ...prev, description: undefined }));
                  }}
                />
                {errors.description && (
                  <span className="text-red-600 text-xs mt-1 block">
                    {errors.description}
                  </span>
                )}
              </div>

              <div className="pt-6">
                <Select
                  required
                  legend="CATEGORIA DE SERVIÇO"
                  value={serviceId}
                  onChange={(e) => {
                    setServiceId(e.target.value);
                    setErrors((prev) => ({ ...prev, serviceId: undefined }));
                  }}
                  disabled={isLoadingServices}
                  error={errors.serviceId}
                >
                  <option value="" disabled hidden>
                    {isLoadingServices
                      ? "Carregando serviços..."
                      : "Selecione a categoria de atendimento"}
                  </option>

                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </Select>
              
              </div>

              <div className="pt-6">
                <Select
                  required
                  legend="TÉCNICO DISPONÍVEL"
                  value={technicianId}
                  error={errors.technicianId}
                  onChange={(e) => {
                    setTechnicianId(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      technicianId: undefined,
                    }));
                  }}
                  disabled={isLoadingTechnicians}
                >
                  <option value="" disabled hidden>
                    {isLoadingTechnicians
                      ? "Carregando técnicos..."
                      : "Selecione um técnico disponível"}
                  </option>

                  {technicians.map((technician) => (
                    <option key={technician.id} value={technician.id}>
                      {technician.name}
                    </option>
                  ))}
                </Select>
            
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-500 p-6 h-fit">
              <h2 className="text-base font-semibold text-gray-900">Resumo</h2>

              <p className="text-sm mt-1">Valores e detalhes</p>

              <div>
                <p className="text-xs font-semibold">Técnico</p>
                <p className="text-sm">{selectedTechnicianName}</p>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-xs font-semibold">Categoria de serviço</p>
                  <p className="text-sm">{selectedServiceName}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold">Custo inicial</p>
                  <p className="text-lg font-semibold">
                    R$ {selectedServicePrice.toFixed(2).replace(".", ",")}
                  </p>
                </div>

                <p className="text-xs">
                  O cliente deve selecionar um técnico disponível para este
                  chamado
                </p>
              </div>

              <button
                type="submit"
                disabled={
                  isSubmitting || isLoadingServices || isLoadingTechnicians
                }
                className="mt-6 w-full rounded-lg bg-gray-900 py-3 text-sm text-gray-50 font-medium hover:bg-gray-500 hover:text-gray-200 ease-linear transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Criando..." : "Criar chamado"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}