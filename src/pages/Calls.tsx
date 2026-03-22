
import clockOpen from "../assets/icons/clock-open.svg";
import pen from "../assets/icons/pen-line.svg";
import { Link } from "react-router-dom";
import { Sidebar } from "../componentes/Sidebar";

export function Calls() {  

  return (
    <div className="w-screen h-screen  xl:grid xl:grid-cols-[280px_1fr] bg-gray-100 xl:overflow-hidden ">

      <Sidebar />

      <div className="w-full h-screen flex flex-col px-6 xl:px-6  gap-4 bg-white absolute xl:relative py-24  rounded-3xl xl:rounded-none xl:rounded-tl-2xl mt-28 xl:mt-4">
        <h1 className="text-2xl font-bold">Chamados</h1>
        <div
          className="w-full bg-white rounded-2xl shadow-sm xl
        :overflow-hidden"
        >
          <table className="w-full text-left">
            {/* Cabeçalho */}
            <thead className="border-b border-gray-500">
              <tr className="text-sm text-gray-400">
                <th className="py-4 xl:px-6 font-medium">Atualizado em</th>
                <th className="py-4 px-6 font-medium hidden xl:table-cell">
                  Id
                </th>
                <th className="xl:py-4 xl:px-6 font-medium truncate max-w-[120px]">
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

            {/* Primeira linha */}
            <tbody>
              <tr className="border-b last:border-none">
                {/* Atualizado em */}
                <td className="py-4 xl:px-6 text-xs text-gray-700">
                  13/04/25 20:56
                </td>

                {/* ID */}
                <td className="py-4 px-6 font-semibold text-xs text-gray-800 hidden xl:table-cell">
                  00003
                </td>

                {/* Título e Serviço */}
                <td className="py-4 xl:px-6">
                  <div className="font-bold text-gray-800 text-sm truncate max-w-[120px]">
                    Backup não está funcionando{" "}
                  </div>
                  <div className="text-gray-400 text-xs truncate max-w-[120px]">
                    Recuperação de Dados{" "}
                  </div>
                </td>

                {/* Valor total */}
                <td className="py-4 px-6 text-sm text-gray-700 hidden xl:table-cell">
                  R$ 180,00
                </td>

                {/* Cliente */}
                <td className="py-4 px-6 text-sm hidden xl:table-cell ">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center">
                      AC
                    </span>
                    André Costa
                  </div>
                </td>

                {/* Técnico */}
                <td className="py-4 px-6 text-sm hidden xl:table-cell">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center">
                      CS
                    </span>
                    Carlos Silva
                  </div>
                </td>

                {/* Status */}
                <td className="py-4 xl:px-6">
                  <span
                    className="
                        inline-flex items-center justify-center
                        h-8 w-8 rounded-full
                        bg-pink-100 text-pink-600
                        xl:h-auto xl:w-auto
                        xl:rounded-full
                        xl:px-3 xl:py-1 xl:gap-1
                      "
                  >
                    {/* Ícone sempre visível */}
                    <img src={clockOpen} alt="ícone de relógio vermelho" />

                    {/* Texto só no XL */}
                    <span className="hidden xl:inline">Aberto</span>
                  </span>
                </td>

                {/* Botão Editar */}
                <td className="py-4 xl:px-6">
                  <div className="h-9 w-9 bg-gray-500 flex justify-center items-center rounded-sm hover:bg-gray-600 transition ease-linear">
                    <Link
                      to="/detailcalls"
                      className="rounded-lg cursor-pointer"
                    >
                      <img src={pen} alt="" />
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>     
    </div>
  );
}
