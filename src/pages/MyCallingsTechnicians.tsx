import Defaultogo from "../assets/Defaultogo.svg";
import { ProfileOptionsModal } from "../componentes/ProfileOptionsModal";
import { ProfileTechnicianModal } from "../componentes/ProfileTechnicianModal";
import list from "../assets/icons/clipboard-list.svg";
import menu from "../assets/icons/Menu.png";
import LogoIconLight from "../assets/Logo_IconLight.png";
import avatar from "../assets/Avatar.svg";
import closed from "../assets/icons/closed.svg";
import circleCheck from "../assets/icons/circle-check-big.svg";
import currently_assisting from "../assets/icons/currently_assisting.svg";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import clock_open from "../assets/icons/clock-open.svg";
import pen from "../assets/icons/pen-line.svg";
import { useState } from "react";
import { AlterProfileModalTechnicians } from "../componentes/AlterProfileModalTechnicians";


export function MyCallingsTechnicians() {
  const location = useLocation();  
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openAlterProfile, setOpenAlterProfile] = useState(false)

  return (
    <div className="w-screen h-screen  xl:grid xl:grid-cols-[280px_1fr] relative  bg-gray-100 ">
      <section className="  hidden xl:block  bg-gray-100 p-6 ">
        <div className="flex gap-3">
          <img src={Defaultogo} alt="Logo padrão" />
          <div className="flex flex-col">
            <h1 className="text-gray-600 text-xl">HelpDesk</h1>
            <span className="text-xxs text-blue-light">Técnico</span>
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
          </nav>
          <div
            className="flex items-center gap-2  text-white cursor-pointer"
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

      <div className="w-full h-screen flex flex-col px-6 xl:px-6  gap-4 bg-white absolute xl:relative rounded-3xl xl:rounded-none xl:rounded-tl-2xl mt-28 xl:mt-4">
        <div className="w-full max-w-6xl px-4 pt-3">
          {/* Título */}
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Meus chamados
          </h1>

          {/* ============================= */}
          {/* SEÇÃO: EM ATENDIMENTO */}
          {/* ============================= */}
          <div className="mb-5">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
              <img src={currently_assisting} alt="" />
              Em atendimento
            </span>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* CARD */}
              <div className="border rounded-xl shadow-sm p-5 bg-white">
                <div className="flex justify-between items-end">
                  <span className="text-gray-400 text-sm">00003</span>

                  <div className="flex gap-1">
                    <Link
                      to="/mycallingstecdetail"
                      className="flex justify-center items-center rounded-lg cursor-pointer bg-gray-500 w-8 h-8"
                    >
                      <img src={pen} alt="" />
                    </Link>
                    <button className="px-3 py-1 bg-gray-900 text-white text-sm rounded-md flex items-center gap-1">
                      <img src={circleCheck} />
                      Encerrar
                    </button>
                  </div>
                </div>

                <h2 className="font-semibold text-gray-100 mt-2">Rede lenta</h2>
                <p className="text-gray-200 text-sm -mt-1">
                  Instalação de Rede
                </p>

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-gray-200 text-sm">10/04/25 15:13</span>
                  <span className="text-gray-800 font-semibold">R$ 200,00</span>
                </div>

                {/* Técnico */}
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                      AC
                    </div>
                    <span className="text-gray-700 text-sm">André Costa</span>
                  </div>

                  <button>
                    <img src={currently_assisting} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ============================= */}
          {/* SEÇÃO: ABERTO */}
          {/* ============================= */}
          <div className="mb-5">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-pink-700 bg-pink-100 px-3  rounded-full">
              <img src={clock_open} alt="" />
              Aberto
            </span>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* CARD */}
              <div className="border rounded-xl shadow-sm p-5 bg-white">
                <div className="flex justify-between items-end">
                  <span className="text-gray-400 text-sm">00003</span>
                  <div className="flex gap-1">
                    <Link
                      to="/mycallingstecdetail"
                      className="flex justify-center items-center rounded-lg cursor-pointer bg-gray-500 w-8 h-8"
                    >
                      <img src={pen} alt="" />
                    </Link>
                    <button className="px-3 py-1 bg-gray-900 text-white text-sm rounded-md flex items-center gap-1">
                      <img src={circleCheck} />
                      Iniciar
                    </button>
                  </div>
                </div>

                <h2 className="font-semibold text-gray-100 mt-2">Rede lenta</h2>
                <p className="text-gray-200 text-sm -mt-1">
                  Instalação de Rede
                </p>

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-gray-200 text-sm">10/04/25 15:13</span>
                  <span className="text-gray-800 font-semibold">R$ 200,00</span>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                      AC
                    </div>
                    <span className="text-gray-700 text-sm">André Costa</span>
                  </div>

                  <button>
                    <img src={clock_open} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ============================= */}
          {/* SEÇÃO: ENCERRADO */}
          {/* ============================= */}
          <div className="mb-5">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
              <img src={closed} alt="" />
              Encerrado
            </span>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* CARD */}
              <div className="border rounded-xl shadow-sm p-5 bg-white">
                <div className="flex justify-between items-end">
                  <span className="text-gray-400 text-sm">00003</span>
                  <Link
                    to="/mycallingstecdetail"
                    className="flex justify-center items-center rounded-lg cursor-pointer bg-gray-500 w-8 h-8"
                  >
                    <img src={pen} alt="" />
                  </Link>
                </div>
                <h2 className="font-semibold text-gray-100 mt-2">Rede lenta</h2>
                <p className="text-gray-200 text-sm -mt-1">
                  Instalação de Rede
                </p>

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-gray-200 text-sm">10/04/25 15:13</span>
                  <span className="text-gray-800 font-semibold">R$ 200,00</span>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                      CS
                    </div>
                    <span className="text-gray-700 text-sm">Carlos Silva</span>
                  </div>

                  <img src={closed} />
                </div>
              </div>
            </div>
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
      <ProfileTechnicianModal 
        open={openProfile} 
        onClose={() => setOpenProfile(false)} 
        onOpenAlterProfile={() => {
        setOpen(false); // fecha o modal preto
        setOpenProfile(false); // abre o modal de perfil
        setOpenAlterProfile(true)
      }}
      /> 

     <AlterProfileModalTechnicians
        open={openAlterProfile}
        onClose={() => setOpenAlterProfile(false)}      
      />
  
    </div>
  );
}
