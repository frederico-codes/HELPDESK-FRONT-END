import clockOpen from "../assets/icons/clock-open.svg";
import pen from "../assets/icons/pen-line.svg";
import { Link } from "react-router-dom";
import { Sidebar } from "../componentes/Sidebar";
import { useEffect, useState } from "react";
import { api } from "../services/api";


type Call = {
  id: string;
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
};

function AvatarBadge({
  initials,
  name,
}: {
  initials: string;
  name: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-7 h-7 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center">
        {initials}
      </span>
      {name}
    </div>
  );
}

function StatusBadge({
  label,
  icon,
  alt,
}: {
  label: string;
  icon: string;
  alt: string;
}) {
  return (
    <span
      className="
        inline-flex items-center justify-center
        h-8 w-8 rounded-full
        bg-pink-100 text-pink-600
        xl:h-auto xl:w-auto
        xl:px-3 xl:py-1 xl:gap-1
      "
    >
      <img src={icon} alt={alt} />
      <span className="hidden xl:inline">{label}</span>
    </span>
  );
}

export function Calls() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCalls() {
      try {
        const response = await api.get("/calls");

        const formattedCalls = response.data.map((call: any) => ({
          id: String(call.id),
          updatedAt: call.updatedAt,
          title: call.title,
          service: call.service,
          totalValue: call.totalValue,
          client: {
            initials: call.client.initials,
            name: call.client.name,
          },
          technician: {
            initials: call.technician.initials,
            name: call.technician.name,
          },
          status: call.status,
          statusIcon: clockOpen,
          statusAlt: "ícone de relógio vermelho",
        }));

        setCalls(formattedCalls);
      } catch (error) {
        console.error("Erro ao buscar chamados", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCalls();
  }, []);

  return (
    <div className="w-screen h-screen xl:grid xl:grid-cols-[280px_1fr] bg-gray-100 xl:overflow-hidden">
      <Sidebar />

      <div className="w-full h-screen flex flex-col px-6 xl:px-6 gap-4 bg-white absolute xl:relative py-24 rounded-3xl xl:rounded-none xl:rounded-tl-2xl mt-28 xl:mt-4">
        <h1 className="text-2xl font-bold">Chamados</h1>

        <div className="w-full bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="border-b border-gray-500">
              <tr className="text-sm text-gray-400">
                <th className="py-4 xl:px-6 font-medium">Atualizado em</th>
                <th className="py-4 px-6 font-medium hidden xl:table-cell">
                  Id
                </th>
                <th className="py-4 xl:px-6 font-medium">
                  Título e Serviço
                </th>
                <th className="py-4 px-6 font-medium hidden xl:table-cell">
                  Valor total
                </th>
                <th className="py-4 px-6 font-medium hidden xl:table-cell">
                  Cliente
                </th>
                <th className="py-4 px-6 font-medium hidden xl:table-cell">
                  Técnico
                </th>
                <th className="py-4 xl:px-6 font-medium">Status</th>
                <th className="py-4 xl:px-6 font-medium"></th>
              </tr>
            </thead>

            <tbody>
              {calls.map((call) => (
                <tr key={call.id} className="border-b last:border-none">
                  <td className="py-4 xl:px-6 text-xs text-gray-700">
                    {call.updatedAt}
                  </td>

                  <td className="py-4 px-6 font-semibold text-xs text-gray-800 hidden xl:table-cell">
                    {call.id}
                  </td>

                  <td className="py-4 xl:px-6">
                    <div className="font-bold text-gray-800 text-sm truncate max-w-[120px] xl:max-w-[220px]">
                      {call.title}
                    </div>
                    <div className="text-gray-400 text-xs truncate max-w-[120px] xl:max-w-[220px]">
                      {call.service}
                    </div>
                  </td>

                  <td className="py-4 px-6 text-sm text-gray-700 hidden xl:table-cell">
                    {call.totalValue}
                  </td>

                  <td className="py-4 px-6 text-sm hidden xl:table-cell">
                    <AvatarBadge
                      initials={call.client.initials}
                      name={call.client.name}
                    />
                  </td>

                  <td className="py-4 px-6 text-sm hidden xl:table-cell">
                    <AvatarBadge
                      initials={call.technician.initials}
                      name={call.technician.name}
                    />
                  </td>

                  <td className="py-4 xl:px-6">
                    <StatusBadge
                      label={call.status}
                      icon={call.statusIcon}
                      alt={call.statusAlt}
                    />
                  </td>

                  <td className="py-4 xl:px-6">
                    <div className="h-9 w-9 bg-gray-500 flex justify-center items-center rounded-sm hover:bg-gray-600 transition ease-linear">
                      <Link
                        to="/detailcalls"
                        className="rounded-lg cursor-pointer"
                      >
                        <img src={pen} alt="Editar chamado" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {calls.length === 0 && (
            <div className="px-6 py-8 text-sm text-gray-400">
              Nenhum chamado encontrado.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}