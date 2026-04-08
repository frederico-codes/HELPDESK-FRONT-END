import Logo_IconLight from "../assets/icons/Logo_IconLight.svg";
import list from "../assets/icons/clipboard-list.svg";
import LogoIconLight from "../assets/Logo_IconLight.png";
import arrowLeft from "../assets/icons/arrow-left.svg";
import clock_open from "../assets/icons/clock-open.svg";
import menu from "../assets/icons/Menu.png";
import clock from "../assets/icons/clock.svg";
import clock_2 from "../assets/icons/clock_2.svg";
import avatar from "../assets/Avatar.svg";
import closed from "../assets/icons/closed.svg";
import bin from "../assets/icons/bin.svg";
import { useLocation, Link, useParams } from "react-router-dom";
import currently_assisting from "../assets/icons/currently_assisting.svg";
import { useEffect, useState } from "react";
import { CloseOptionsModal } from "../componentes/CloseOptionsModal";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import { AxiosError } from "axios";

type ApiCall = {
  id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "closed";
  createdAt: string;
  updatedAt?: string | null;
  customer: {
    id: string;
    name: string;
    email?: string;
  };
  technician: {
    id: string;
    name: string;
    email?: string;
  };
  service: {
    id: string;
    name: string;
    basePrice: number;
  };
  additionalServices: {
    id: string;
    service: {
      id: string;
      name: string;
      basePrice: number;
    };
  }[];
};

function getInitials(name: string) {
  const parts = name.trim().split(" ").filter(Boolean);

  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0][0].toUpperCase();

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function formatDateTime(dateString: string) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function formatShortId(id: string) {
  return id.slice(0, 5);
}

function getStatusMeta(status: ApiCall["status"]) {
  switch (status) {
    case "open":
      return {
        label: "Aberto",
        icon: clock_open,
        className: "bg-pink-100 text-pink-700",
      };
    case "in_progress":
      return {
        label: "Em atendimento",
        icon: currently_assisting,
        className: "bg-blue-100 text-blue-700",
      };
    case "closed":
      return {
        label: "Encerrado",
        icon: closed,
        className: "bg-green-100 text-green-700",
      };
  }
}

export function MyCallingsTechniciansDetail() {
  const location = useLocation();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [call, setCall] = useState<ApiCall | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function handleRemoveAdditionalService(additionalServiceId: string) {
    try {
      if (!id) return;

      await api.delete(
        `/calls/${id}/additional-services/${additionalServiceId}`,
      );

      const response = await api.get(`/calls/${id}`);
      setCall(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message ?? "Erro ao remover serviço.");
        return;
      }

      alert("Não foi possível remover o serviço adicional.");
    }
  }

  async function loadCallById() {
  try {
    if (!id) return;

    setIsLoading(true);

    const response = await api.get<ApiCall>(`/calls/${id}`);
    setCall(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      alert(error.response?.data?.message ?? "Erro ao buscar chamado.");
      return;
    }

    alert("Não foi possível carregar o chamado.");
  } finally {
    setIsLoading(false);
  }
}
  

  const { session } = useAuth();

  const displayName = session?.user.name ?? "";
  const displayEmail = session?.user.email ?? "";
  const userInitials = getInitials(displayName);

  useEffect(() => {
    loadCallById();
  }, [id]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-xl border border-gray-500 px-6 py-4 text-sm text-gray-400">
          Carregando chamado...
        </div>
      </div>
    );
  }

  if (!call) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-xl border border-gray-500 px-6 py-4 text-sm text-gray-400">
          Chamado não encontrado.
        </div>
      </div>
    );
  }

  const statusMeta = getStatusMeta(call.status);
  const basePrice = `R$ ${call.service.basePrice.toFixed(2).replace(".", ",")}`;

  const additionalTotal = call.additionalServices.reduce(
    (sum, item) => sum + item.service.basePrice,
    0,
  );

  const totalPrice = call.service.basePrice + additionalTotal;

  const formattedAdditionalTotal = `R$ ${additionalTotal
    .toFixed(2)
    .replace(".", ",")}`;

  const formattedTotalPrice = `R$ ${totalPrice.toFixed(2).replace(".", ",")}`;

  return (
    <div className="w-screen h-screen xl:grid xl:grid-cols-[280px_1fr] bg-gray-100 xl:overflow-hidden">
      <section className="hidden xl:flex xl:flex-col xl:justify-between bg-gray-100 pl-6 pt-10 pb-6">
        <div>
          <div className="flex gap-3">
            <img src={Logo_IconLight} alt="Logo padrão" />
            <div className="flex flex-col">
              <h1 className="text-gray-600 text-xl">HelpDesk</h1>
              <span className="text-xxs text-blue-light">Técnico</span>
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
            </nav>
          </div>
        </div>

        <div
          className="flex items-center gap-2 text-white cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <span className="w-8 h-8 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center">
            {userInitials}
          </span>

          <div className="flex flex-col min-w-0">
            <span className="text-sm truncate">{displayName}</span>
            <span className="text-xs text-gray-400 truncate">
              {displayEmail}
            </span>
          </div>
        </div>
      </section>

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

      <div className="w-full px-6 xl:px-6 gap-4 bg-white absolute xl:relative rounded-3xl xl:rounded-none xl:rounded-tl-2xl mt-28 xl:mt-4">
        <main className="max-w-6xl mx-auto px-4 pt-10">
          <header className="mb-6 md:mb-8">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-500"
            >
              <img src={arrowLeft} alt="Voltar" />
              <span>Voltar</span>
            </Link>

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between max-w-[1090px] mx-auto px-4">
              <h1 className="text-2xl font-semibold text-blue-800">
                Chamado detalhado
              </h1>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-md bg-gray-500 px-5 py-2 text-sm font-medium text-gray-800 hover:bg-gray-600 ease-linear cursor-pointer"
                >
                  <img src={clock} alt="" />
                  Encerrar
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-md bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-300 ease-linear cursor-pointer"
                >
                  <img src={clock_2} alt="" />
                  Iniciar atendimento
                </button>
              </div>
            </div>
          </header>

          <section>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
              <div className="rounded-2xl border border-gray-500 bg-white p-5 md:p-6">
                <div className="mb-4 flex items-start justify-between">
                  <span className="text-sm text-gray-400">
                    {formatShortId(call.id)}
                  </span>

                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${statusMeta.className}`}
                  >
                    <img src={statusMeta.icon} alt="" />
                    {statusMeta.label}
                  </span>
                </div>

                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  {call.title}
                </h2>

                <div className="mb-6">
                  <p className="mb-1 text-xs font-semibold text-gray-400">
                    Descrição
                  </p>
                  <p className="text-sm text-gray-900">
                    {call.description || "Sem descrição informada"}
                  </p>
                </div>

                <div className="mb-6">
                  <p className="mb-1 text-xs font-semibold text-gray-400">
                    Categoria
                  </p>
                  <p className="text-sm text-gray-800">{call.service.name}</p>
                </div>

                <div className="mb-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="mb-1 text-xs font-semibold text-gray-400">
                      Criado em
                    </p>
                    <p className="text-sm text-gray-800">
                      {formatDateTime(call.createdAt)}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-semibold text-gray-400">
                      Atualizado em
                    </p>
                    <p className="text-sm text-gray-800">
                      {formatDateTime(call.updatedAt || call.createdAt)}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold text-gray-200">
                    Cliente
                  </p>
                  <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                      {getInitials(call.customer.name)}
                    </span>
                    <span className="text-sm text-gray-800">
                      {call.customer.name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-500 bg-white p-5 md:p-6">
                <div className="mb-6">
                  <p className="mb-3 text-xs font-semibold text-gray-400">
                    Técnico responsável
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                      {getInitials(call.technician.name)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">
                        {call.technician.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {call.technician.email ?? "Sem e-mail"}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-xs font-semibold text-gray-400">
                    Valores
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between text-gray-700">
                      <span>Preço base</span>
                      <span>{basePrice}</span>
                    </div>

                    <div className="flex items-center justify-between text-gray-700">
                      <span>Adicionais</span>
                      <span>{formattedAdditionalTotal}</span>
                    </div>
                  </div>

                  <hr className="my-4 border-gray-500" />

                  <div className="flex items-center justify-between text-sm font-semibold text-gray-900">
                    <span>Total</span>
                    <span>{formattedTotalPrice}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-gray-500 bg-white p-5 md:p-6 lg:col-span-2 xl:w-[665px]">
              <div className="border-b border-gray-500 flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-800">
                  Serviços adicionais
                </p>

                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gray-900 text-lg text-white hover:bg-gray-50 cursor-pointer hover:text-gray-200 ease-linear transition"
                  onClick={() => setModalOpen(true)}
                >
                  +
                </button>
              </div>

              {call.additionalServices.length === 0 ? (
                <div className="py-4 text-sm text-gray-400">
                  Nenhum serviço adicional cadastrado.
                </div>
              ) : (
                <div className="divide-y divide-gray-500">
                  {call.additionalServices.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-4"
                    >
                      <p className="text-sm font-medium text-gray-900">
                        {item.service.name}
                      </p>

                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-800">
                          R${" "}
                          {item.service.basePrice.toFixed(2).replace(".", ",")}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleRemoveAdditionalService(item.id)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-gray-500 hover:bg-gray-50 cursor-pointer hover:text-gray-200 ease-linear transition"
                        >
                          <img src={bin} alt="Remover serviço adicional" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
      </div>

      <CloseOptionsModal
        open={open}
        onClose={() => setOpen(false)}
        onOpenProfile={() => {
          setOpen(false);
        }}
      />
 
    </div>
  );
}