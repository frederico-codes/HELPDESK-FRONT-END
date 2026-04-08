import Logo_IconLight from "../assets/icons/Logo_IconLight.svg";
import list from "../assets/icons/clipboard-list.svg";
import menu from "../assets/icons/Menu.png";
import arrowLeft from "../assets/icons/arrow-left.svg";
import LogoIconLight from "../assets/Logo_IconLight.png";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { api } from "../services/api";
import clockOpen from "../assets/icons/clock-open.svg";
import currentlyAssisting from "../assets/icons/currently_assisting.svg";
import closed from "../assets/icons/closed.svg";
import { useUser } from "../hooks/useUser";
import { useAuth } from "../hooks/useAuth";

type CallStatus = "aberto" | "em_atendimento" | "encerrado";

type CallApiResponse = {
  id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "closed";
  createdAt: string;
  updatedAt?: string | null;
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
};

interface CallItem {
  id: string;
  updatedAt: string;
  title: string;
  description: string;
  service: string;
  totalValue: string;
  technician: {
    name: string;
    email: string;
    colorClass: string;
  };
  status: CallStatus;
}

function getInitials(name: string) {
  const parts = name.trim().split(" ").filter(Boolean);

  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0][0].toUpperCase();

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function getTechnicianColorClass(name: string) {
  const colors = [
    "bg-blue-600",
    "bg-indigo-600",
    "bg-violet-600",
    "bg-cyan-600",
    "bg-purple-600",
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash += name.charCodeAt(i);
  }

  return colors[hash % colors.length];
}

function formatStatus(status: "open" | "in_progress" | "closed"): CallStatus {
  if (status === "open") return "aberto";
  if (status === "in_progress") return "em_atendimento";
  return "encerrado";
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

function getStatusConfig(status: CallStatus) {
  switch (status) {
    case "aberto":
      return {
        label: "Aberto",
        icon: clockOpen,
        wrapperClass: "bg-pink-100 text-pink-600",
      };
    case "em_atendimento":
      return {
        label: "Em atendimento",
        icon: currentlyAssisting,
        wrapperClass: "bg-blue-100 text-blue-600",
      };
    case "encerrado":
      return {
        label: "Encerrado",
        icon: closed,
        wrapperClass: "bg-green-100 text-green-700",
      };
  }
}

export function MyCallingsCustomersDetail() {
  const location = useLocation();
  const { id } = useParams();

  const { user } = useUser();
  const { session } = useAuth();

  const displayName = session?.user.name ?? user.name;
  const displayEmail = session?.user.email ?? user.email;
  const userInitials = getInitials(displayName);

  const [call, setCall] = useState<CallItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCallDetail() {
      try {
        if (!id) return;

        setIsLoading(true);

        const response = await api.get<CallApiResponse>(`/calls/${id}`);
        const data = response.data;

        setCall({
          id: data.id,
          updatedAt: formatDateTime(data.updatedAt || data.createdAt),
          title: data.title,
          description: data.description,
          service: data.service.name,
          totalValue: `R$ ${data.service.basePrice.toFixed(2).replace(".", ",")}`,
          technician: {
            name: data.technician.name,
            email: data.technician.email ?? "tecnico@test.com",
            colorClass: getTechnicianColorClass(data.technician.name),
          },
          status: formatStatus(data.status),
        });
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

    loadCallDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white border border-gray-300 rounded-xl p-6 text-sm text-gray-400">
          Carregando chamado...
        </div>
      </div>
    );
  }

  if (!call) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white border border-gray-300 rounded-xl p-6">
          <h1 className="text-lg font-semibold text-blue-700 mb-2">
            Chamado não encontrado
          </h1>
          <Link to="/" className="text-sm text-blue-600 hover:underline">
            Voltar para meus chamados
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(call.status);

  return (
    <div className="w-screen h-screen xl:grid xl:grid-cols-[252px_1fr] bg-gray-100 xl:overflow-hidden">
      <section className="hidden xl:flex xl:flex-col xl:justify-between bg-gray-100 pl-6 pt-14 pb-6 border-r border-gray-900">
        <div>
          <div className="flex gap-3">
            <img src={Logo_IconLight} alt="Logo padrão" />
            <div className="flex flex-col">
              <h1 className="text-gray-600 text-xl">HelpDesk</h1>
              <span className="text-xxs text-blue-light uppercase">cliente</span>
            </div>
          </div>

          <div className="flex flex-col">
            <nav className="pt-5 px-4">
              <Link
                to="/"
                className={`w-[180px] flex items-center gap-2 text-sm p-3 outline-0 rounded-sm ${
                  location.pathname.startsWith("/chamados")
                    ? "bg-blue-dark text-white"
                    : "text-gray-400"
                }`}
              >
                <img
                  src={list}
                  alt="Meus chamados"
                  className={
                    location.pathname.startsWith("/chamados")
                      ? "invert brightness-0"
                      : ""
                  }
                />
                Meus chamados
              </Link>
            </nav>
          </div>
        </div>

        <div className="flex items-center gap-2 text-white mb-4 pr-4">
          <span className="w-8 h-8 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center">
            {userInitials}
          </span>
          <div className="flex flex-col min-w-0">
            <span className="text-sm truncate">{displayName}</span>
            <span className="text-xs text-gray-400 truncate">{displayEmail}</span>
          </div>
        </div>
      </section>

      <section className="block xl:hidden w-screen h-screen absolute top-0">
        <div className="flex justify-between items-center px-6 pt-7">
          <div className="flex justify-center items-center gap-3.5">
            <img src={menu} alt="menu" />
            <div className="flex justify-center gap-4">
              <img src={LogoIconLight} alt="LogoIconLight" className="h-11 w-11" />
              <div>
                <h1 className="text-xl text-gray-600">HelpDesk</h1>
                <span className="text-xxs text-blue-light uppercase">cliente</span>
              </div>
            </div>
          </div>

          <div className="w-10 h-10 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center">
            {userInitials}
          </div>
        </div>
      </section>

      <div className="w-full h-screen flex flex-col px-2 xl:px-44 gap-4 bg-white absolute xl:relative rounded-3xl xl:rounded-none xl:rounded-tl-2xl mt-28 xl:mt-4">
        <div className="px-4 py-6 xl:px-0 mt-6">
          <Link
            to="/"
            className="mb-4 flex items-center gap-2 text-xs text-gray-700 cursor-pointer"
          >
            <img src={arrowLeft} alt="Voltar" />
             <span>Voltar</span>
          </Link>

          <h1 className="mb-6 text-xl font-semibold text-blue-700">
            Chamado detalhado
          </h1>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_309px]">
            <div className="border border-gray-500 rounded-xl bg-white p-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {call.id}
                </span>

                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${statusConfig.wrapperClass}`}
                >
                  <img src={statusConfig.icon} alt={statusConfig.label} />
                  {statusConfig.label}
                </span>
              </div>

              <h2 className="mb-4 text-base font-semibold text-gray-900">
                {call.title}
              </h2>

              <div className="mb-4">
                <p className="mb-1 text-xs font-medium text-gray-400">
                  Descrição
                </p>
                <p className="text-sm text-gray-700">{call.description}</p>
              </div>

              <div className="mb-6">
                <p className="mb-1 text-xs font-medium text-gray-400">
                  Categoria
                </p>
                <p className="text-sm text-gray-800">{call.service}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Atualizado em
                  </p>
                  <p className="text-gray-800">{call.updatedAt}</p>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Valor total
                  </p>
                  <p className="text-gray-800">{call.totalValue}</p>
                </div>
              </div>
            </div>

            <div className="border border-gray-500 rounded-xl bg-white p-6">
              <div className="mb-6">
                <p className="mb-3 text-xs font-medium text-gray-400">
                  Técnico responsável
                </p>

                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-white ${call.technician.colorClass}`}
                  >
                    {getInitials(call.technician.name)}
                  </span>

                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {call.technician.name}
                    </p>
                    <p className="text-xs text-gray-700">
                      {call.technician.email}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-medium text-gray-400">
                  Valores
                </p>

                <div className="mb-3 flex justify-between text-sm">
                  <span className="text-gray-700">Preço base</span>
                  <span className="text-gray-900">{call.totalValue}</span>
                </div>

                <div className="mt-4 flex justify-between border-t pt-4 text-sm font-semibold">
                  <span>Total</span>
                  <span>{call.totalValue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}