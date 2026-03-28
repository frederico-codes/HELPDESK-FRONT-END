import pen from "../assets/icons/pen-line.svg";
import { Link } from "react-router-dom";
import plus from "../assets/icons/plus.svg";
import { Sidebar } from "../componentes/Sidebar";

const technicians = [
  {
    id: 1,
    name: "André Costa",
    email: "andre.costa@client.com",
    initials: "AC",
    availability: [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
    ],
  },
];

export function Technicians() {
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

        <div className="w-full h-full bg-white rounded-2xl">
          <table className="w-full text-left">
            <thead className="border-b border-gray-500">
              <tr className="text-sm text-gray-400">
                <th className="py-4 px-6 font-medium">Nome</th>
                <th className="py-4 px-6 font-medium hidden xl:table-cell">
                  E-mail
                </th>
                <th className="py-4 px-6 font-medium">Disponibilidade</th>
                <th className="py-4 px-6 font-medium"></th>
              </tr>
            </thead>

            <tbody>
              {technicians.map((technician) => (
                <tr key={technician.id} className="border-b last:border-none">
                  <td className="py-4 xl:px-6 text-sm">
                    <div className="flex items-center gap-2 truncate max-w-[120px]">
                      <span className="w-7 h-7 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center">
                        {technician.initials}
                      </span>

                      <span className="font-bold truncate max-w-[50px] xl:max-w-full">
                        {technician.name}
                      </span>
                    </div>
                  </td>

                  <td className="py-6 px-6 hidden xl:table-cell">
                    <div className="text-sm text-gray-400">
                      {technician.email}
                    </div>
                  </td>

                  <td className="py-6 px-6">
                    <div className="flex gap-2 flex-wrap">
                      {technician.availability.slice(0, 1).map((hour) => (
                        <span
                          key={`mobile-${technician.id}-${hour}`}
                          className="px-3 py-1 bg-gray-50 text-gray-200 text-xs rounded-full border border-gray-500 xl:hidden"
                        >
                          {hour}
                        </span>
                      ))}

                      {technician.availability.length > 1 && (
                        <span className="px-3 py-1 bg-gray-50 text-gray-200 text-xs rounded-full border border-gray-500 xl:hidden">
                          +{technician.availability.length - 1}
                        </span>
                      )}

                      {technician.availability.map((hour) => (
                        <span
                          key={`desktop-${technician.id}-${hour}`}
                          className="hidden xl:inline-flex px-3 py-1 bg-gray-50 text-gray-200 text-xs rounded-full border border-gray-500"
                        >
                          {hour}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-4 px-1 w-4">
                    <div className="h-9 w-9 bg-gray-500 hover:bg-gray-600 flex justify-center items-center rounded-sm cursor-pointer transition ease-linear">
                      <Link 
                      to={`/technicians/${technician.id}/edit`} 
                      className="rounded-lg">
                        <img src={pen} alt="Editar técnico" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
