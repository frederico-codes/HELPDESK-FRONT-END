import  circleHelp  from "../assets/icons/circle-help.svg";
import clock2 from "../assets/icons/clock-2.svg";
import pen from "../assets/icons/pen-line.svg";
import circleGreen from "../assets/icons/circle-green.svg";
import { Link } from "react-router-dom";
import { Sidebar } from "../componentes/Sidebar";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { api } from "../services/api";
import { Tooltip } from "react-tooltip";


type ApiCall = {
  id: string;
  title: string;
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
  };
  service: {
    id: string;
    name: string;
    basePrice: number;
  };
};

type CallRow = {
  id: string;
  shortId: string;
  updatedAt: string;
  title: string;
  service: string;
  totalValue: string;
  client: {
    initials: string;
    name: string;
  };
  technician: {
    initials: string;
    name: string;
  };
  status: string;
  statusIcon: string;
  statusAlt: string;
  statusClass: string;
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
        icon: circleHelp,
        alt: "Ícone de chamado aberto",
        className: "bg-pink-100 text-pink-600",
      };
    case "in_progress":
      return {
        label: "Em atendimento",
        icon: clock2,
        alt: "Ícone de chamado em atendimento",
        className: "bg-blue-100 text-blue-600",
      };
    case "closed":
      return {
        label: "Encerrado",
        icon: circleGreen,
        alt: "Ícone de chamado encerrado",
        className: "bg-green-100 text-green-700",
      };
  }
}

function AvatarBadge({
  initials,
  name,
}: {
  initials: string;
  name: string;
}) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <span className="w-7 h-7 rounded-full bg-blue-700 text-white text-xs  flex items-center justify-center shrink-0">
        {initials}
      </span>
      <span className="truncate">{name}</span>
    </div>
  );
}

function StatusBadge({
  label,
  icon,
  alt,
  className,
}: {
  label: string;
  icon: string;
  alt: string;
  className: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full h-8 w-8 xl:h-auto xl:w-auto xl:px-3 xl:py-2 xl:gap-1 text-xs font-medium ${className}`}
    >
      <img src={icon} alt={alt} className="h-4 w-4" />
      <span className="hidden xl:inline">{label}</span>
    </span>
  );
}

export function Calls() {
  const [calls, setCalls] = useState<CallRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCalls() {
      try {
        const response = await api.get<ApiCall[]>("/calls");

        const formattedCalls: CallRow[] = response.data.map((call) => {
          const statusMeta = getStatusMeta(call.status);

          return {
            id: call.id,
            shortId: formatShortId(call.id),
            updatedAt: formatDateTime(call.updatedAt || call.createdAt),
            title: call.title,
            service: call.service.name,
            totalValue: `R$ ${call.service.basePrice.toFixed(2).replace(".", ",")}`,
            client: {
              initials: getInitials(call.customer.name),
              name: call.customer.name,
            },
            technician: {
              initials: getInitials(call.technician.name),
              name: call.technician.name,
            },
            status: statusMeta.label,
            statusIcon: statusMeta.icon,
            statusAlt: statusMeta.alt,
            statusClass: statusMeta.className,
          };
        });

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

    fetchCalls();
  }, []);

  return (
    <div className="w-screen h-screen xl:grid xl:grid-cols-[252px_1fr] bg-gray-100 xl:overflow-hidden">
      
      <Sidebar />

      <div className="w-full h-screen flex flex-col px-6 xl:px-6 gap-4 bg-white absolute xl:relative py-24 rounded-3xl xl:rounded-none xl:rounded-tl-2xl mt-28 xl:mt-4">
        <div className="w-full ">
          <h1 className="text-2xl font-bold mb-6">Chamados</h1>

          <div className="w-full bg-white rounded-2xl border border-gray-500 overflow-hidden">
            <table className="w-full text-left table-fixed">
              <thead className="border-b border-gray-500">
                <tr className="text-sm text-gray-400">
                  <th className="py-4 px-3 xl:px-4 font-medium w-[70px] whitespace-nowrap overflow-hidden text-ellipsis">
                    Atualizado em
                  </th>
                  <th className="py-4 px-3 xl:px-4 font-medium hidden xl:table-cell w-[60px]">
                    Id
                  </th>
                  <th className="py-4 px-3 xl:px-4 font-medium w-[200px]">
                    Título e Serviço
                  </th>
                  <th className="py-4 px-3 xl:px-4 font-medium hidden xl:table-cell w-[110px]">
                    Valor total
                  </th>
                  <th className="py-4 px-3 xl:px-4 font-medium hidden xl:table-cell w-[140px]">
                    Cliente
                  </th>
                  <th className="py-4 px-3 xl:px-4 font-medium hidden xl:table-cell w-[140px]">
                    Técnico
                  </th>
                  <th className="py-4 px-3 xl:px-4 w-[50px]  font-medium  xl:w-[150px]">Status</th>
                  <th className="py-4 px-3 xl:px-4 font-medium w-14"></th>
                </tr>
              </thead>

              <tbody>
                {calls.map((call) => (
                  <tr key={call.id} className="border-b border-gray-500 last:border-none">
                    <td className="py-4 px-3 xl:px-4 text-xs text-gray-700 ">
                      {call.updatedAt}
                    </td>

                    <td className="py-4 px-3 xl:px-4 font-semibold text-xs text-gray-800 hidden xl:table-cell">
                      {call.shortId}
                    </td>

                    <td className="py-4 px-3 xl:px-4 ">
                      <div
                        className="block w-full font-bold text-gray-800 text-sm truncate max-w-[200px]  xl:truncate-none xl:max-w-none cursor-pointer"
                        data-tooltip-id="global-tooltip"
                        data-tooltip-content={call.title}
                      >
                        {call.title}                        
                      </div>
                      <Tooltip id="global-tooltip" place="top" />
                      <div
                        className="block w-full text-gray-400 text-xs truncate max-w-[200px]  xl:truncate-none xl:max-w-none cursor-pointer"
                        data-tooltip-id="global-tooltip"
                        data-tooltip-content={call.service}
                      >
                        {call.service}                        
                      </div>
                      <Tooltip id="global-tooltip" place="top" />
                    </td>

                    <td className="py-4 px-3 xl:px-4 text-sm text-gray-700 hidden xl:table-cell">
                      {call.totalValue}
                    </td>

                    <td className="py-4 px-3 xl:px-4 text-sm hidden xl:table-cell">
                      <AvatarBadge
                        initials={call.client.initials}
                        name={call.client.name}
                      />
                    </td>

                    <td className="py-4 px-3 xl:px-4 text-sm hidden xl:table-cell">
                      <AvatarBadge
                        initials={call.technician.initials}
                        name={call.technician.name}
                      />
                    </td>

                    <td className="py-4 px-3 w-[50px]  xl:w-[150px] xl:px-4 ">
                      <StatusBadge
                        label={call.status}
                        icon={call.statusIcon}
                        alt={call.statusAlt}
                        className={call.statusClass}
                      />
                    </td>

                    <td className="py-4 px-3 xl:px-4">
                      <div
                        className="h-9 w-9 bg-gray-500 flex justify-center items-center rounded-sm hover:bg-gray-600 transition ease-linear"
                        data-tooltip-id="tooltip-info"
                        data-tooltip-content="Detalhes do chamado"
                      >
                        <Link
                          to={`/chamados/${call.id}`}
                          className="rounded-lg cursor-pointer"
                        >
                          <img src={pen} alt="Editar chamado" />
                          <Tooltip id="tooltip-info" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!isLoading && calls.length === 0 && (
              <div className="px-6 py-8 text-sm text-gray-400">
                Nenhum chamado encontrado.
              </div>
            )}

            {isLoading && (
              <div className="px-6 py-8 text-sm text-gray-400">
                Carregando chamados...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}