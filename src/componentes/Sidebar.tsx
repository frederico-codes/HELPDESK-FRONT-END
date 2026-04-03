
import tecnicos from "../assets/icons/tecnicos.svg";
import briefcase from "../assets/icons/briefcase.svg";
import wrench from "../assets/icons/wrench.svg";
import list from "../assets/icons/clipboard-list.svg";
import menu from "../assets/icons/Menu.png";
import LogoIconLight from "../assets/Logo_IconLight.png";
import avatar from "../assets/Avatar.svg";
import { useLocation } from "react-router-dom";
import { CloseOptionsModal } from "./CloseOptionsModal";
import { Link } from "react-router-dom";
import { useState } from "react";
import Logo_IconLight from "../assets/icons/Logo_IconLight.svg";
import { useAuth } from "../hooks/useAuth";


export function Sidebar() {
  const [open, setOpen] = useState(false);
  const { session } = useAuth();
  const role = session?.user?.role;

  const roleLabel = {
    manager: "Admin",
    technical: "Técnico",
    customer: "Cliente",
  }[role ?? "customer"];
  
  const name = session?.user?.name ?? "";
  const email = session?.user?.email ?? "";
  
  const location = useLocation();

  function getInitials(name: string) {
    const parts = name.trim().split(" ").filter(Boolean);
  
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0][0].toUpperCase();
  
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  
  const initials = getInitials(name);
  return (
    <div>
      <section className="h-screen hidden xl:flex xl:flex-col xl:justify-between  bg-gray-100 pl-6 pb-1 pt-12 ">
        <div>
          <div className="flex gap-3">
            <img src={Logo_IconLight} alt="Logo padrão" />
            <div className="flex flex-col">
              <h1 className="text-gray-600 text-xl">HelpDesk</h1>
              <span className="text-xxs text-blue-light">{roleLabel}</span>
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
                    location.pathname === "/services"
                      ? "invert brightness-0"
                      : ""
                  }
                />
                Serviços
              </Link>
            </nav>
          </div>
        </div>
        <div className="flex items-center gap-2  text-white mb-5">
          <div className="flex items-center gap-2 text-white mb-5">
            <span className="w-8 h-8 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center">
              {initials}
            </span>

            <div
              className="flex flex-col cursor-pointer min-w-0"
              onClick={() => setOpen(true)}
            >
              <span className="text-sm truncate">{name}</span>
              <span className="text-xs text-gray-400 truncate">{email}</span>
            </div>
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