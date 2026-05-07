import pen from "../assets/icons/pen-line.svg";
import { Link } from "react-router-dom";
import plus from "../assets/icons/plus.svg";
import { Sidebar } from "../componentes/Sidebar";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Tooltip } from "react-tooltip";


type Technician = {
  id: string;
  name: string;
  email: string;
  availability: string[];
};

export function Technicians() {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTechnicians() {
      try {
        const response = await api.get("/users?role=technical");

        setTechnicians(response.data);
      } catch (error) {
        console.error("Erro ao buscar técnicos", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTechnicians();
  }, []);

  function getInitials(name: string) {
    return name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join("");
  }

  return (
    <div className="w-screen h-screen xl:grid xl:grid-cols-[280px_1fr] bg-gray-100 xl:overflow-hidden">
      
      <Sidebar />

      <div
        className="w-full h-screen flex flex-col px-6 xl:px-6 gap-4 bg-white absolute xl:relative py-24 
      rounded-3xl xl:rounded-none xl:rounded-tl-2xl mt-28 xl:mt-4"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Técnicos</h1>

          <Link
            to="/technicians/new"
            className="flex justify-center items-center gap-2 bg-gray-800 px-3 py-2 rounded-sm hover:bg-gray-300 cursor-pointer transition ease-linear"
          >
            <img src={plus} alt="" className="w-4 h-4" />
            <span className="text-gray-600 text-sm hidden xl:block">Novo</span>
          </Link>
        </div>

        {isLoading ? (
          <div className="text-gray-400 text-sm px-6 py-6">
            Carregando técnicos...
          </div>
        ) : (
          <div className="w-full h-full bg-white rounded-2xl  overflow-y-auto max-h-[700px] border border-gray-500 overflow-hidden">
            <table className="w-full text-left">
              <thead className="border-b border-gray-500 sticky top-0 bg-white ">
                <tr className="text-sm text-gray-400 ">
                  <th className="py-4 px-6 font-medium xl:w-[300px]">Nome</th>
                  <th className="py-4 px-6 font-medium hidden xl:table-cell">
                    E-mail
                  </th>
                  <th className="py-4 px-6 font-medium">Disponibilidade</th>
                  <th className="py-4 px-6 font-medium"></th>
                </tr>
              </thead>

              <tbody>
                {technicians.map((technician) => (
                  <tr
                    key={technician.id}
                    className="border-b border-gray-500 last:border-none "
                  >
                    <td className="py-4 px-6 text-sm">
                      <div className="flex items-center gap-2 max-w-[150px] truncate sm:truncate-none ">
                        <span className="w-7 h-7 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center">
                          {getInitials(technician.name)}
                        </span>

                        <span
                          className="font-bold truncate max-w-[50px] xl:max-w-full cursor-pointer"
                          data-tooltip-id="tooltip-info"
                          data-tooltip-content={technician.name}
                        >
                          {technician.name}
                        </span>
                        <Tooltip id="tooltip-info" />
                      </div>
                    </td>

                    <td className="py-6 px-6 hidden xl:table-cell">
                      <div className="text-sm text-gray-400">
                        {technician.email}
                      </div>
                    </td>

                    <td className="py-6 px-6">
                      <div className="flex gap-2 flex-wrap">
                        {technician.availability?.slice(0, 1).map((hour) => (
                          <span
                            key={`mobile-${technician.id}-${hour}`}
                            className="px-3 py-1 bg-gray-50 text-gray-200 text-xs rounded-full border border-gray-500 xl:hidden"
                          >
                            {hour}
                          </span>
                        ))}

                        {technician.availability?.length > 1 && (
                          <span className="px-3 py-1 bg-gray-50 text-gray-200 text-xs rounded-full border border-gray-500 xl:hidden">
                            +{technician.availability.length - 1}
                          </span>
                        )}

                        {technician.availability?.slice(0, 3).map((hour) => (
                          <span
                            key={`desktop-${technician.id}-${hour}`}
                            className="hidden xl:inline-flex px-3 py-1 bg-gray-50 text-gray-200 text-xs rounded-full border border-gray-500"
                          >
                            {hour}
                          </span>
                        ))}

                        {technician.availability?.length > 3 && (
                          <span className="hidden xl:inline-flex px-3 py-1 bg-gray-50 text-gray-200 text-xs rounded-full border border-gray-500">
                            +{technician.availability.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-1 w-4">
                      <div
                        className="h-9 w-9 bg-gray-500 hover:bg-gray-600 flex justify-center items-center rounded-sm cursor-pointer transition ease-linear"
                        data-tooltip-id="tooltip-info"
                        data-tooltip-content="Editar técnico"
                      >
                        <Link
                          to={`/technicians/${technician.id}/edit`}
                          className="rounded-lg"
                        >
                          <img src={pen} alt="Editar técnico" />
                        </Link>
                        <Tooltip id="tooltip-info" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {technicians.length === 0 && (
              <div className="px-6 py-8 text-sm text-gray-400">
                Nenhum técnico encontrado.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}