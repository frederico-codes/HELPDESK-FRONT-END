import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AxiosError } from "axios";
import { api } from "../services/api";
import LogoIcon from "../assets/icons/Logo_IconLight.svg";
import LogoIconMobile from "../assets/Logo_IconLight.png";
import list from "../assets/icons/clipboard-list.svg";
import menu from "../assets/icons/Menu.png";
import avatar from "../assets/Avatar.svg";
import eye from "../assets/icons/eye.svg";
import plus from "../assets/icons/plus.svg";
import clockOpen from "../assets/icons/clock-open.svg";
import currentlyAssisting from "../assets/icons/currently_assisting.svg";
import closed from "../assets/icons/closed.svg";
import { ProfileModalCustomer } from "../componentes/ProfileModalCustomer";
import { AlterProfileModalCustomer } from "../componentes/AlterProfileModalCustomer";
import { ProfileOptionsModal } from "../componentes/ProfileOptionsModal";
import { useUser } from "../hooks/useUser";
import { useAuth } from "../hooks/useAuth";

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

function StatusBadge({ status }: { status: CallStatus }) {
  const config = getStatusConfig(status);

  return (
    <span
      className={`
        inline-flex items-center justify-center
        h-8 w-8 rounded-full
        xl:h-auto xl:w-auto xl:px-3 xl:py-1 xl:gap-1
        ${config.wrapperClass}
      `}
    >
      <img src={config.icon} alt={config.label} />
      <span className="hidden xl:inline text-xs font-medium">
        {config.label}
      </span>
    </span>
  );
}

function TechnicianBadge({
  name,
  colorClass,
}: {
  name: string;
  colorClass: string;
}) {
  const initials = getInitials(name);

  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs text-white ${colorClass}`}
      >
        {initials}
      </span>
      {name}
    </div>
  );
}

export function MyCallingsCustomers() {  
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openAlterProfile, setOpenAlterProfile] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const { user, setUser } = useUser();
  const { session } = useAuth();

  const displayName = session?.user.name ?? user.name;
  const displayEmail = session?.user.email ?? user.email;
  const userInitials = getInitials(displayName);

  async function handleSaveProfile(data: { name: string; email: string }) {
    try {

      if (!session?.user.id) {
        alert("Usuário não identificado.");
        return;
      }

      setIsSavingProfile(true);

      const response = await api.put(`/clients/${session.user.id}`, data);

      setUser((prev) => ({
        ...prev,
        name: response.data.name,
        email: response.data.email,
      }));

      alert("Perfil atualizado com sucesso.");
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message ?? "Erro ao atualizar perfil.");
        return;
      }

      alert("Não foi possível atualizar o perfil.");
    } finally {
      setIsSavingProfile(false);
    }
  }

  return (
    <div className="w-screen h-screen xl:grid xl:grid-cols-[280px_1fr] relative bg-gray-100 xl:overflow-hidden">
      <section className="hidden xl:flex xl:flex-col justify-between bg-gray-100 pl-6 pt-10 pb-6">
        <div>
          <div className="flex gap-3">
            <img src={LogoIcon} alt="Logo padrão" />
            <div className="flex flex-col">
              <h1 className="text-gray-600 text-xl">HelpDesk</h1>
              <span className="text-xxs text-blue-light uppercase">
                Cliente
              </span>
            </div>
          </div>

          <nav className="pt-5 px-4 flex flex-col gap-2">
            <Link
              to="/"
              className={`w-[180px] flex items-center gap-2 text-sm p-3 rounded-sm ${
                location.pathname === "/"
                  ? "bg-blue-dark text-white"
                  : "text-gray-400"
              }`}
            >
              <img
                src={list}
                alt=""
                className={
                  location.pathname === "/meus-chamados"
                    ? "invert brightness-0"
                    : ""
                }
              />
              Meus chamados
            </Link>

            <Link
              to="/chamados/novo"
              className={`w-[180px] flex items-center gap-2 text-sm p-3 rounded-sm ${
                location.pathname === "/chamados/novo"
                  ? "bg-blue-dark text-white"
                  : "text-gray-400"
              }`}
            >
              <img
                src={plus}
                alt=""
                className={
                  location.pathname === "/chamados/novo"
                    ? "invert brightness-0"
                    : ""
                }
              />
              Criar chamado
            </Link>
          </nav>
        </div>

        <div
          className="flex items-center gap-2 text-white cursor-pointer mb-5"
          onClick={() => setOpen(true)}
        >
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
            <img src={menu} alt="menu" />
            <div className="flex justify-center gap-4">
              <img src={LogoIconMobile} alt="Logo" className="h-11 w-11" />
              <div>
                <h1 className="text-xl text-gray-600">HelpDesk</h1>
                <span className="text-xxs text-blue-light uppercase">
                  Cliente
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

      <div className="w-full h-screen flex flex-col px-2 xl:px-6 gap-4 bg-white absolute xl:relative py-0 rounded-3xl xl:rounded-none xl:rounded-tl-2xl mt-28 xl:mt-4">
        <div className="w-full max-w-6xl px-0 pt-12 xl:px-0">
          <h1 className="mb-6 text-xl font-semibold text-blue-700">
            Meus chamados
          </h1>

          <div className="bg-white rounded-xl border border-gray-500 overflow-hidden xl:overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-500 text-left text-gray-500">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-400">
                    Atualizado em
                  </th>
                  <th className="hidden px-4 py-3 font-medium text-gray-400 xl:table-cell">
                    Id
                  </th>
                  <th className="px-4 py-3 font-medium text-gray-400">
                    Título
                  </th>
                  <th className="hidden px-4 py-3 font-medium text-gray-400 xl:table-cell">
                    Serviço
                  </th>
                  <th className="hidden px-4 py-3 font-medium text-gray-400 xl:table-cell">
                    Valor total
                  </th>
                  <th className="hidden px-4 py-3 font-medium text-gray-400 xl:table-cell">
                    Técnico
                  </th>
                  <th className="px-4 py-3 font-medium text-gray-400">
                    Status
                  </th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-500">
                {calls.map((call) => {
                  const [date, time] = call.updatedAt.split(" ");

                  return (
                    <tr
                      key={call.id}
                      className="cursor-pointer hover:bg-gray-50 transition"
                    >
                      <td className="flex gap-3 items-center px-4 py-6 text-gray-700">
                        <div>{date}</div>
                        <div>{time}</div>
                      </td>

                      <td className="hidden px-4 py-4 font-semibold xl:table-cell">
                        {call.id}
                      </td>

                      <td className="px-4 py-4 font-medium text-gray-900 truncate max-w-[110px]">
                        {call.title}
                      </td>

                      <td className="hidden px-4 py-4 xl:table-cell">
                        {call.service}
                      </td>

                      <td className="hidden px-4 py-4 xl:table-cell">
                        {call.totalValue}
                      </td>

                      <td className="hidden px-4 py-4 xl:table-cell">
                        <TechnicianBadge
                          name={call.technician.name}
                          colorClass={call.technician.colorClass}
                        />
                      </td>

                      <td className="px-4 py-4">
                        <StatusBadge status={call.status} />
                      </td>

                      <td className="px-4 py-4">
                        <img
                          src={eye}
                          alt="Ver chamado"
                          onClick={() => navigate(`/chamados/${call.id}`)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ProfileOptionsModal
        open={open}
        onClose={() => setOpen(false)}
        onOpenProfile={() => {
          setOpen(false);
          setOpenProfile(true);
        }}
      />

      <ProfileModalCustomer
        open={openProfile}
        onClose={() => setOpenProfile(false)}
        onOpenAlterProfile={() => {
          setOpen(false);
          setOpenProfile(false);
          setOpenAlterProfile(true);
        }}
        onSave={handleSaveProfile}
        initialName={session?.user.name ?? ""}
        initialEmail={session?.user.email ?? ""}
        isLoading={isSavingProfile}
      />

      <AlterProfileModalCustomer
        open={openAlterProfile}
        onClose={() => setOpenAlterProfile(false)}
      />
    </div>
  );
}