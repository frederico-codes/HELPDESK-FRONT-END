import Logo_IconLight from "../assets/icons/Logo_IconLight.svg";
import list from "../assets/icons/clipboard-list.svg";
import menu from "../assets/icons/Menu.png";
import LogoIconLight from "../assets/Logo_IconLight.png";
import avatar from "../assets/Avatar.svg";
import clockOpen from "../assets/icons/clock-open.svg";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import eye from "../assets/icons/eye.svg";
import currently_assisting from "../assets/icons/currently_assisting.svg";
import closed from "../assets/icons/closed.svg";
import plus from "../assets/icons/plus.svg";
import { ProfileModalCustomer } from "../componentes/ProfileModalCustomer";
import { useState } from "react";
import { AlterProfileModalCustomer } from "../componentes/AlterProfileModalCustomer";
import { ProfileOptionsModal } from "../componentes/ProfileOptionsModal";

export function MyCallingsCustomers() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openAlterProfile, setOpenAlterProfile] = useState(false);

  return (
    <div className="w-screen h-screen  xl:grid xl:grid-cols-[280px_1fr] relative  bg-gray-100 xl:overflow-hidden ">
      <section className="hidden xl:flex xl:flex-col xl:justify-between  bg-gray-100 pl-6 pt-10 pb-6">
        <div>
          <div className="flex gap-3">
            <img src={Logo_IconLight} alt="Logo padrão" />
            <div className="flex flex-col">
              <h1 className="text-gray-600 text-xl">HelpDesk</h1>
              <span className="text-xxs text-blue-light">cliente</span>
            </div>
          </div>
          <div className="flex flex-col gap-[730px]">
            <nav className="pt-5 px-4">
              {/* CHAMADOS */}
              <Link
                to="#"
                className={`
                    w-[180px] flex items-center gap-2 text-sm p-3 outline-0 rounded-sm
                    ${
                      location.pathname === "/"
                        ? "bg-blue-dark text-white"
                        : "text-gray-400"
                    }
                  `}
              >
                <img
                  src={list}
                  alt=""
                  className={
                    location.pathname === "/calls" ? "invert brightness-0" : ""
                  }
                />
                Meus chamados
              </Link>
              <Link
                to="/chamados/novo"
                className={`
                      w-[180px] flex items-center gap-2 text-sm p-3 outline-0 rounded-sm
                      ${
                        location.pathname === "/technicians"
                          ? "bg-blue-dark text-white"
                          : "text-gray-400"
                      }
                    `}
              >
                <img src={plus} alt="" />
                Criar chamado
              </Link>
            </nav>
          </div>
        </div>
        <div
          className="flex items-center gap-2  text-white cursor-pointer mb-5"
          onClick={() => setOpen(true)}
        >
          <span className="w-8 h-8 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center">
            CS
          </span>
          <div className="flex flex-col">
            <span className="text-sm">Carlos Silva</span>
            <span className="text-xs text-gray-400">user.adm@test.com</span>
          </div>
        </div>
      </section>

      <section className="block  xl:hidden w-screen h-screen  absolute  top-0 ">
        <div className="flex justify-between items-center  ">
          {/* GRUPO ESQUERDA */}
          <div className="flex justify-center items-center gap-3.5 absolute top-7 left-6">
            <img src={menu} alt="menu" className="" />

            <div className="flex justify-center gap-4 ">
              <img
                src={LogoIconLight}
                alt="LogoIconLight"
                className="h-11 w-11"
              />
              <div>
                <h1 className="text-xl text-gray-600 ">HelpDesk</h1>
                <span className="text-xxs text-blue-light uppercase">
                  cliente
                </span>
              </div>
            </div>
          </div>
          {/* GRUPO DIREITA */}
          <div>
            <img
              src={avatar}
              alt="avatar"
              className="absolute top-8 right-10"
            />
          </div>
        </div>
      </section>

      <div className="w-full h-screen flex flex-col px-2 xl:px-6  gap-4 bg-white absolute xl:relative py-0  rounded-3xl xl:rounded-none xl:rounded-tl-2xl mt-28 xl:mt-4">
        <div className="w-full max-w-6xl px-0 pt-12 xl:px-0 ">
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

                  <th className="px-4 py-3 font-medium text-gray-400 truncate max-w-[110px]">
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

              <tbody className="divide-y">
                {/* LINHA */}
                <tr className="border-b border-gray-500">
                  <td className="px-4 py-4 text-gray-700">
                    <div>13/04/25</div>
                    <div className="text-xs text-gray-400">20:56</div>
                  </td>

                  <td className="hidden px-4 py-4 font-semibold xl:table-cell">
                    00003
                  </td>

                  <td className="px-4 py-4 font-medium text-gray-900 truncate max-w-[110px]">
                    Rede lenta
                  </td>

                  <td className="hidden px-4 py-4 xl:table-cell">
                    Instalação de Rede
                  </td>

                  <td className="hidden px-4 py-4 xl:table-cell">R$ 180,00</td>

                  <td className="hidden px-4 py-4 xl:table-cell">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                        CS
                      </span>
                      Carlos Silva
                    </div>
                  </td>

                  <td className="px-4 py-4">
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
                      <img src={clockOpen} alt="" />
                      <span className="hidden xl:inline text-xs font-medium">
                        Aberto
                      </span>
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <Link
                      to={`/chamados/:id`}
                      className="inline-flex items-center justify-center rounded-md bg-gray-500 p-2 hover:bg-gray-50"
                    >
                      <img src={eye} alt="Ver chamado" />
                    </Link>
                  </td>
                </tr>

                {/* OUTRA LINHA */}
                <tr className="border-b border-gray-500">
                  <td className="px-4 py-4 text-gray-700">
                    <div>12/04/25</div>
                    <div className="text-xs text-gray-400">09:01</div>
                  </td>

                  <td className="hidden px-4 py-4 font-semibold xl:table-cell">
                    00001
                  </td>

                  <td className="px-4 py-4 font-medium text-gray-900 truncate max-w-[110px]">
                    Computador não liga
                  </td>

                  <td className="hidden px-4 py-4 xl:table-cell">
                    Manutenção de Hardware
                  </td>

                  <td className="hidden px-4 py-4 xl:table-cell">R$ 150,00</td>

                  <td className="hidden px-4 py-4 xl:table-cell">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                        CS
                      </span>
                      Carlos Silva
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className="
                        inline-flex items-center justify-center
                        h-8 w-8 rounded-full
                        bg-blue-100 text-blue-600
                        xl:h-auto xl:w-auto
                        xl:rounded-full
                        xl:px-3 xl:py-1 xl:gap-1
                      "
                    >
                      <img src={currently_assisting} alt="" />
                      <span className="hidden xl:inline text-xs font-medium">
                        Em atendimento
                      </span>
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <Link
                      to={`/chamados/:id`}
                      className="inline-flex items-center justify-center rounded-md bg-gray-500 p-2 hover:bg-gray-50"
                    >
                      <img src={eye} alt="Ver chamado" />
                    </Link>
                  </td>
                </tr>

                {/* ENCERRADO */}
                <tr>
                  <td className="px-4 py-4 text-gray-700">
                    <div>10/04/25</div>
                    <div className="text-xs text-gray-400">10:15</div>
                  </td>

                  <td className="hidden px-4 py-4 font-semibold xl:table-cell">
                    00002
                  </td>

                  <td className="px-4 py-4 font-medium text-gray-900 truncate max-w-[110px]">
                    Instalação de software de gestão
                  </td>

                  <td className="hidden px-4 py-4 xl:table-cell">
                    Suporte de Software
                  </td>

                  <td className="hidden px-4 py-4 xl:table-cell">R$ 200,00</td>

                  <td className="hidden px-4 py-4 xl:table-cell">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs text-white">
                        AO
                      </span>
                      Ana Oliveira
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className="
                        inline-flex items-center justify-center
                        h-8 w-8 rounded-full
                        bg-green-100 text-green-700
                        xl:h-auto xl:w-auto
                        xl:rounded-full
                        xl:px-3 xl:py-1 xl:gap-1
                      "
                    >
                      <img src={closed} alt="" />
                      <span className="hidden xl:inline text-xs font-medium">
                        Encerrado
                      </span>
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <Link
                      to={`/chamados/:id`}
                      className="inline-flex items-center justify-center rounded-md bg-gray-500 p-2 hover:bg-gray-50"
                    >
                      <img src={eye} alt="Ver chamado" />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ProfileOptionsModal
        open={open}
        onClose={() => setOpen(false)}
        onOpenProfile={() => {
          setOpen(false); // fecha o modal preto
          setOpenProfile(true); // abre o modal de perfil
        }}
      />

      {/* MODAL */}
      <ProfileModalCustomer
        open={openProfile}
        onClose={() => setOpenProfile(false)}
        onOpenAlterProfile={() => {
          setOpen(false); // fecha o modal preto
          setOpenProfile(false); // abre o modal de perfil
          setOpenAlterProfile(true);
        }}
      />

      <AlterProfileModalCustomer
        open={openAlterProfile}
        onClose={() => setOpenAlterProfile(false)}
      />
    </div>
  );
}
