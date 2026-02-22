import Defaultogo from "../assets/Defaultogo.svg";
import tecnicos from "../assets/icons/tecnicos.svg";
import briefcase from "../assets/icons/briefcase.svg";
import wrench from "../assets/icons/wrench.svg";
import list from "../assets/icons/clipboard-list.svg";
import menu from "../assets/icons/Menu.png";
import LogoIconLight from "../assets/Logo_IconLight.png";
import avatar from "../assets/Avatar.svg";
import clockOpen from "../assets/icons/clock-open.svg";
import pen from "../assets/icons/pen-line.svg";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { CloseOptionsModal } from "../componentes/CloseOptionsModal";
import { useState } from "react";

export function Calls() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="w-screen h-screen  xl:grid xl:grid-cols-[280px_1fr] bg-gray-100 xl:overflow-hidden ">
      <section className=" hidden xl:flex xl:flex-col xl:justify-between  bg-gray-100 p-6 ">
        <div>
          <div className="flex gap-3">
            <img src={Defaultogo} alt="Logo padrão" />
            <div className="flex flex-col">
              <h1 className="text-gray-600 text-xl">HelpDesk</h1>
              <span className="text-xxs text-blue-light">Admin</span>
            </div>
          </div>
          <div className="flex flex-col">
            <nav className="pt-5 px-4">
              {/* CHAMADOS */}
              <Link
                to="/"
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
                Chamados
              </Link>
              {/* TÉCNICOS */}
              <Link
                to="/technicians"
                className={`
                    w-[180px] flex items-center gap-2 text-sm p-3 outline-0 rounded-sm
                    ${
                      location.pathname === "/technicians"
                        ? "bg-blue-dark text-white"
                        : "text-gray-400"
                    }
                  `}
              >
                <img
                  src={tecnicos}
                  alt=""
                  className={
                    location.pathname === "/technicians"
                      ? "invert brightness-0"
                      : ""
                  }
                />
                Técnicos
              </Link>
              {/* CLIENTES */}
              <Link
                to="/customers"
                className={`
                    w-[180px] flex items-center gap-2 text-sm p-3 outline-0 rounded-sm
                    ${
                      location.pathname === "/customers"
                        ? "bg-blue-dark text-white"
                        : "text-gray-400"
                    }
                  `}
              >
                <img
                  src={briefcase}
                  alt=""
                  className={
                    location.pathname === "/customers"
                      ? "invert brightness-0"
                      : ""
                  }
                />
                Clientes
              </Link>
              {/* SERVIÇOS */}
              <Link
                to="/services"
                className={`
                    w-[180px] flex items-center gap-2 text-sm p-3 outline-0 rounded-sm
                    ${
                      location.pathname === "/services"
                        ? "bg-blue-dark text-white"
                        : "text-gray-400"
                    }
                  `}
              >
                <img
                  src={wrench}
                  alt=""
                  className={
                    location.pathname === "/services" ? "invert brightness-0" : ""
                  }
                />
                Serviços
              </Link>
            </nav>
          </div>
        </div>
        <div className="flex items-center gap-2  text-white mb-5">
          <span className="w-8 h-8 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center">
            CS
          </span>
          <div
              className="flex flex-col cursor-pointer"
              onClick={() => setOpen(true)}
              >
              <span className="text-sm">Carlos Silva</span>
              <span className="text-xs text-gray-400">user.adm@test.com</span>
          </div>
        </div>
      </section>

      <section className="block  xl:hidden w-screen h-screen absolute">
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
                <span className="text-xxs text-blue-light ">Admin</span>
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

      <CloseOptionsModal
        open={open}
        onClose={() => setOpen(false)}
        onOpenProfile={() => {
          setOpen(false); // fecha o modal preto
        }}
      />
    </div>
  );
}
