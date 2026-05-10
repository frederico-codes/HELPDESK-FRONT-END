import Logo_IconLight from "../assets/icons/Logo_IconLight.svg";
import { ProfileOptionsModal } from "../componentes/ProfileOptionsModal";
import { ProfileTechnicianModal } from "../componentes/ProfileTechnicianModal";
import list from "../assets/icons/clipboard-list.svg";
import menu from "../assets/icons/Menu.png";
import LogoIconLight from "../assets/Logo_IconLight.png";
import circleGreen from "../assets/icons/circle-green.svg";
import CircleCheckClose from "../assets/icons/circle-check-big-close.svg";
import clock2 from "../assets/icons/clock-2.svg";
import { useLocation, Link } from "react-router-dom";
import  circleHelp  from "../assets/icons/circle-help.svg";
import pen from "../assets/icons/pen-line.svg";
import { useEffect, useMemo, useState } from "react";
import { AlterProfileModalTechnicians } from "../componentes/AlterProfileModalTechnicians";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { useUser } from "../hooks/useUser";
import { Tooltip } from "react-tooltip";



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
};

type CallCard = {
  id: string;
  shortId: string;
  title: string;
  service: string;
  updatedAt: string;
  totalValue: string;
  customer: {
    initials: string;
    name: string;
  };
  status: "open" | "in_progress" | "closed";
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

function CallCardItem({
  call,
  actionLabel,
  actionIcon,
  statusIcon,
  onAction,
  isUpdating,
}: {
  call: CallCard;
  actionLabel?: string;
  actionIcon?: string;
  statusIcon: string;
  onAction?: () => void;
  isUpdating?: boolean;
}) {
  return (
    <div className="h-[200px] border rounded-xl shadow-sm p-5 bg-white">
      <div className="flex justify-between items-end">
        <span className="text-gray-400 text-sm">{call.shortId}</span>

        <div className="flex gap-1">
          <Link
            to={`/detailcalls/${call.id}`}
            className="flex justify-center items-center rounded-lg cursor-pointer bg-gray-500 w-8 h-8 hover:bg-gray-600 transition"
            data-tooltip-id="tooltip-info"
            data-tooltip-content="Detalhes do Serviço"
          >
            <img src={pen} alt="Detalhar chamado" />
            <Tooltip id="tooltip-info" />
          </Link>

          {actionLabel && actionIcon && (
            <button
              type="button"
              onClick={onAction}
              disabled={isUpdating}
              className="px-3 py-1 bg-gray-900 text-white text-sm rounded-md flex items-center gap-1 hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <img src={actionIcon} alt="" />
              {isUpdating ? "Salvando..." : actionLabel}
            </button>
          )}
        </div>
      </div>

      <h2 className="font-semibold text-gray-900 mt-2">{call.title}</h2>
      <p className="text-gray-400 text-sm -mt-1 truncate w-[250px] cursor-pointer"
      data-tooltip-id="tooltip-info"
      data-tooltip-content={call.service}
      >{call.service}</p>
      <Tooltip id="global-tooltip" place="top" />

      <div className="mt-4 flex justify-between items-center">
        <span className="text-gray-700 text-sm">{call.updatedAt}</span>
        <span className="text-gray-800 font-semibold">{call.totalValue}</span>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center shrink-0">
            {call.customer.initials}
          </div>
          <span className="text-gray-700 text-sm truncate">
            {call.customer.name}
          </span>
        </div>

        <button type="button">
          <img src={statusIcon} alt="" />
        </button>
      </div>
    </div>
  );
}




export function MyCallingsTechnicians() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openAlterProfile, setOpenAlterProfile] = useState(false);
  const [calls, setCalls] = useState<CallCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [updatingCallId, setUpdatingCallId] = useState<string | null>(null);
  
  const { user, setUser } = useUser();
  const { session } = useAuth();
  
  const displayName = session?.user.name ?? user.name ?? "";
  const displayEmail = session?.user.email ?? user.email ?? "";
  const displayAvatar = user.avatar ?? session?.user.avatar;
  const userInitials = getInitials(displayName);

  async function handleUpdateStatus(
    callId: string,
    status: "in_progress" | "closed",
  ) {
    try {
      setUpdatingCallId(callId);

      await api.patch(`/calls/${callId}/status`, { status });

      await loadCalls();
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message ?? "Erro ao atualizar status.");
        return;
      }

      alert("Não foi possível atualizar o status do chamado.");
    } finally {
      setUpdatingCallId(null);
    }
  }

  async function loadCalls() {
    try {
      setIsLoading(true);

      const response = await api.get<ApiCall[]>("/calls");

      const formattedCalls: CallCard[] = response.data.map((call) => ({
        id: call.id,
        shortId: formatShortId(call.id),
        title: call.title,
        service: call.service.name,
        updatedAt: formatDateTime(call.updatedAt || call.createdAt),
        totalValue: `R$ ${call.service.basePrice.toFixed(2).replace(".", ",")}`,
        customer: {
          initials: getInitials(call.customer.name),
          name: call.customer.name,
        },
        status: call.status,
      }));

      setCalls(formattedCalls);
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message ?? "Erro ao buscar chamados.");
        return;
      }

      alert("Não foi possível carregar os chamados.");
    } finally {
      setIsLoading(false);
    }
  }
  


  useEffect(() => {

    loadCalls();
  }, []);

  const inProgressCalls = useMemo(
    () => calls.filter((call) => call.status === "in_progress"),
    [calls]
  );

  const openCalls = useMemo(
    () => calls.filter((call) => call.status === "open"),
    [calls]
  );

  const closedCalls = useMemo(
    () => calls.filter((call) => call.status === "closed"),
    [calls]
  );

  async function handleSaveProfile(data: {
    name: string;
    email: string;
    avatarFile: File | null;
  }) {
    try {
      if (!session?.user.id) {
        alert("Usuário não identificado.");
        return;
      }

      setIsSavingProfile(true);

      const response = await api.put(`/users/${session.user.id}`, {
        name: data.name,
        email: data.email,
      });

      setUser((prev) => ({
        ...prev,
        name: response.data.name,
        email: response.data.email,
      }));

      if (data.avatarFile) {
        const formData = new FormData();
        formData.append("avatar", data.avatarFile);

        const avatarResponse = await api.patch(
          `/users/${session.user.id}/avatar`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        setUser((prev) => ({
          ...prev,
          avatar: avatarResponse.data.avatar,
        }));
      }

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
    <div className="w-screen h-screen xl:grid xl:grid-cols-[280px_1fr] bg-gray-100 xl:overflow-hidden">
      <section className="hidden xl:flex xl:flex-col xl:justify-between bg-gray-100 pl-6 pt-10 pb-10">
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
            <span className="text-xs text-gray-400 max-w-[150px] truncate">
              {displayEmail}
            </span>
          </div>
        </div>
      </section>

      <section className="block xl:hidden w-screen h-screen absolute top-0">
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
                <span className="text-xxs text-blue-light">Técnico</span>
              </div>
            </div>
          </div>

          <div>
            <span className="w-13 h-13 rounded-full bg-blue-700 text-white  flex items-center justify-center absolute top-8 right-10">
              {userInitials}
            </span>
          </div>
        </div>
      </section>

      <div className="w-full h-screen px-6 xl:px-6 gap-4 bg-white absolute xl:relative rounded-3xl xl:rounded-none xl:rounded-tl-2xl mt-28 xl:mt-4 overflow-y-auto">
        <div className="w-full max-w-6xl px-4 pt-3">
          <h1 className="text-2xl font-semibold text-gray-800 mt-8 mb-6">
            Meus chamados
          </h1>

          {isLoading && (
            <div className="text-sm text-gray-400 py-4">
              Carregando chamados...
            </div>
          )}

          {!isLoading && calls.length === 0 && (
            <div className="text-sm text-gray-400 py-4">
              Nenhum chamado encontrado.
            </div>
          )}

          {!isLoading && (
            <>
              <div className="mb-5">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                  <img src={clock2} alt="" />
                  Em atendimento
                </span>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {inProgressCalls.map((call) => (
                    <CallCardItem
                      key={call.id}
                      call={call}
                      actionLabel="Encerrar"
                      actionIcon={CircleCheckClose}
                      statusIcon={clock2}
                      onAction={() => handleUpdateStatus(call.id, "closed")}
                      isUpdating={updatingCallId === call.id}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-pink-700 bg-pink-100 px-3 py-1 rounded-full">
                  <img src={circleHelp} alt="" />
                  Aberto
                </span>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {openCalls.map((call) => (
                    <CallCardItem
                      key={call.id}
                      call={call}
                      actionLabel="Iniciar"
                      actionIcon={CircleCheckClose}
                      statusIcon={circleHelp}
                      onAction={() =>
                        handleUpdateStatus(call.id, "in_progress")
                      }
                      isUpdating={updatingCallId === call.id}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                  <img src={circleGreen} alt="" />
                  Encerrado
                </span>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {closedCalls.map((call) => (
                    <CallCardItem
                      key={call.id}
                      call={call}
                      statusIcon={circleGreen}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
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

      <ProfileTechnicianModal
        open={openProfile}
        onClose={() => setOpenProfile(false)}
        onOpenAlterProfile={() => {
          setOpen(false);
          setOpenProfile(false);
          setOpenAlterProfile(true);
        }}
        onSave={handleSaveProfile}
        initialName={displayName}
        initialEmail={displayEmail}
        initialAvatar={
          displayAvatar
            ? `${import.meta.env.VITE_API_URL}/uploads/${displayAvatar}`
            : undefined
        }
        isLoading={isSavingProfile}
        availability={session?.user.availability ?? []}
      />

      <AlterProfileModalTechnicians
        open={openAlterProfile}
        onClose={() => setOpenAlterProfile(false)}
      />
    </div>
  );
}