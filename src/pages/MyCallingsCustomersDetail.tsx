import Logo_IconLight from "../assets/icons/Logo_IconLight.svg";
import list from "../assets/icons/clipboard-list.svg";
import menu from "../assets/icons/Menu.png";
import LogoIconLight from "../assets/Logo_IconLight.png";
import avatar from "../assets/Avatar.svg";
import { Link, useLocation, useParams } from "react-router-dom";
import clockOpen from "../assets/icons/clock-open.svg";
import currentlyAssisting from "../assets/icons/currently_assisting.svg";
import closed from "../assets/icons/closed.svg";
import { useUser } from "../contexts/UserContext";

type CallStatus = "aberto" | "em_atendimento" | "encerrado";

interface CallItem {
  id: string;
  updatedAt: string;
  title: string;
  service: string;
  totalValue: string;
  technician: {
    name: string;
    colorClass: string;
  };
  status: CallStatus;
}

const calls: CallItem[] = [
  {
    id: "00003",
    updatedAt: "13/04/25 20:56",
    title: "Rede lenta",
    service: "Instalação de Rede",
    totalValue: "R$ 180,00",
    technician: {
      name: "Carlos Silva",
      colorClass: "bg-blue-600",
    },
    status: "aberto",
  },
  {
    id: "00001",
    updatedAt: "12/04/25 09:01",
    title: "Computador não liga",
    service: "Manutenção de Hardware",
    totalValue: "R$ 150,00",
    technician: {
      name: "Carlos Silva",
      colorClass: "bg-blue-600",
    },
    status: "em_atendimento",
  },
  {
    id: "00002",
    updatedAt: "10/04/25 10:15",
    title: "Instalação de software de gestão",
    service: "Suporte de Software",
    totalValue: "R$ 200,00",
    technician: {
      name: "Ana Oliveira",
      colorClass: "bg-indigo-600",
    },
    status: "encerrado",
  },
];

function getInitials(name: string) {
  const parts = name.trim().split(" ").filter(Boolean);

  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0][0].toUpperCase();

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
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


  const { user } = useUser(); // ✅ AGORA VEM DO CONTEXT

  const userInitials = getInitials(user.name);

  const call = calls.find((item) => item.id === id);

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
    <div className="w-screen h-screen xl:grid xl:grid-cols-[280px_1fr] bg-gray-100 xl:overflow-hidden">
      <section className="hidden xl:flex xl:flex-col xl:justify-between bg-gray-100 pl-6 pt-14 pb-0">
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

        <div className="flex items-center gap-2 text-white mb-11">
          <span className="w-8 h-8 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center">
            {userInitials}
          </span>
          <div className="flex flex-col">
            <span className="text-sm">{user.name}</span>
            <span className="text-xs text-gray-400">{user.email}</span>
          </div>
        </div>
      </section>

      <section className="block xl:hidden w-screen h-screen absolute top-0">
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-3.5 absolute top-7 left-6">
            <img src={menu} alt="menu" />

            <div className="flex justify-center gap-4">
              <img src={LogoIconLight} alt="LogoIconLight" className="h-11 w-11" />
              <div>
                <h1 className="text-xl text-gray-600">HelpDesk</h1>
                <span className="text-xxs text-blue-light uppercase">cliente</span>
              </div>
            </div>
          </div>

          <div>
            <img src={avatar} alt="avatar" className="absolute top-8 right-10" />
          </div>
        </div>
      </section>

      <div className="w-full h-screen flex flex-col px-2 xl:px-44 gap-4 bg-white absolute xl:relative rounded-3xl xl:rounded-none xl:rounded-tl-2xl mt-28 xl:mt-4">
        <div className="bg-gray-50 px-4 py-6 xl:px-0 mt-6">
          <Link
            to="/"
            className="mb-4 flex items-center gap-2 text-sm text-gray-700 hover:text-gray-500 cursor-pointer"
          >
            ← Voltar
          </Link>

          <h1 className="mb-6 text-xl font-semibold text-blue-700">
            Chamado detalhado
          </h1>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_309px]">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
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
                <p className="text-sm text-gray-700">
                  {call.title}
                </p>
              </div>

              <div className="mb-6">
                <p className="mb-1 text-xs font-medium text-gray-400">
                  Categoria
                </p>
                <p className="text-sm text-gray-800">
                  {call.service}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Atualizado em
                  </p>
                  <p className="text-gray-800">
                    {call.updatedAt}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Valor total
                  </p>
                  <p className="text-gray-800">
                    {call.totalValue}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
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
                      tecnico@test.com
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