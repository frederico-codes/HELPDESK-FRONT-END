import Defaultogo from "../assets/Defaultogo.svg"
import list from "../assets/icons/clipboard-list.svg"
import menu from "../assets/icons/Menu.png"
import LogoIconLight from "../assets/Logo_IconLight.png"
import avatar from "../assets/Avatar.svg"
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom"
import plus from "../assets/icons/plus.svg"



export function MyNewCallingCustomer(){
const location = useLocation();


  return(
    <div className="w-screen h-screen  xl:grid xl:grid-cols-[280px_1fr] relative  bg-gray-100 xl:overflow-hidden ">
      <section className="hidden xl:flex xl:flex-col xl:justify-between  bg-gray-100 p-6">
        <div>
          <div className="flex gap-3">
            <img src={Defaultogo} alt="Logo padrão"/>
            <div className="flex flex-col">
              <h1 className="text-gray-600 text-xl">HelpDesk</h1>
              <span className="text-xxs text-blue-light uppercase">cliente</span>
            </div>
          </div>
          <div className="flex flex-col gap-[730px]">
            <nav className="pt-5 px-4">
          
                <Link to = "/"
                  className={`
                    w-[180px] flex items-center gap-2 text-sm p-3 outline-0 rounded-sm
                    ${location.pathname === "/"
                      ? "bg-blue-dark text-white"
                      : "text-gray-400"
                    }
                  `}
                >
                  <img
                    src={list}
                    alt=""
                    className={location.pathname === "/calls" ? "invert brightness-0" : ""}
                  />
                  Meus chamados
                </Link>
          
                <Link to="/chamados/novo"
          
                  className={`
                    w-[180px] flex items-center gap-2 text-sm p-3 outline-0 rounded-sm
                    ${location.pathname === "/chamados/novo"
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
        <div className="flex items-center gap-2  text-white mb-5">
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
            <img src={menu} alt="menu" className=""/>

            <div className="flex justify-center gap-4 ">
              <img src= { LogoIconLight } alt="LogoIconLight" className="h-11 w-11"/>
              <div>
                <h1 className="text-xl text-gray-600 ">HelpDesk</h1>
                <span className="text-xxs text-blue-light uppercase">cliente</span>
              </div>
            </div>
          </div>
          {/* GRUPO DIREITA */}
          <div>
            <img src={avatar} alt="avatar" className="absolute top-8 right-10" />
          </div>
        </div>            
      </section>       

      <div   className="w-full h-screen flex flex-col px-6 xl:px-6  gap-4 bg-white absolute xl:relative pt-2  rounded-3xl xl:rounded-none xl:rounded-tl-2xl mt-28 xl:mt-4">
        <div className="min-h-screen px-4 py-6 lg:px-44">
          {/* TÍTULO */}
          <h1 className="text-xl font-semibold text-blue-700 mb-6">
            Novo chamado
          </h1>

          {/* GRID */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
            
            {/* ===================== */}
            {/* INFORMAÇÕES */}
            {/* ===================== */}
            <div className="bg-white rounded-xl border border-gray-500 p-6 ">
              <h2 className="text-base font-semibold text-gray-900">
                Informações
              </h2>

              <p className="text-sm  mt-1">
                Configure os dias e horários em que você está disponível para atender chamados
              </p>

              {/* TÍTULO */}
              <div className="pt-6">
                <label className="block text-xs font-semibold">
                  TÍTULO
                </label>
                <input
                  type="text"
                  placeholder="Digite um título para o chamado"
                  className="w-full border-b border-gray-500 py-2 text-sm text-gray-700 
                            focus:outline-none focus:border-blue-600 px-4"
                />
              </div>

              {/* DESCRIÇÃO */}
              <div className="mt-6">
                <label className="block text-xs font-semibold ">
                  DESCRIÇÃO
                </label>
                <textarea
                  placeholder="Descreva o que está acontecendo"
                  rows={6}
                  className="w-full border border-gray-500 py-2 px-4 text-sm text-gray-700 
                            resize-none focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* CATEGORIA */}
              <div className="pt-6">
                <label className="block text-xs font-semibold mb-2">
                  CATEGORIA DE SERVIÇO
                </label>

                <div className="relative w-full">
                  <select
                    className="
                      w-full appearance-none
                      bg-transparent
                      border border-gray-500
                      py-2 pr-8
                      text-sm 
                      focus:outline-none focus:border-blue-600 cursor-pointer
                    "
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Selecione a categoria de atendimento
                    </option>

                    <option value="rede">Erro de rede</option>
                    <option value="hardware">Problema de hardware</option>
                    <option value="software">Erro de software</option>
                    <option value="instalacao">Instalação / Configuração</option>
                  </select>

                  {/* Ícone seta */}
                  <svg
                    className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* ===================== */}
            {/* RESUMO */}
            {/* ===================== */}
            <div className="bg-white rounded-xl border border-gray-500 p-6 h-fit">
              <h2 className="text-base font-semibold text-gray-900">
                Resumo
              </h2>

              <p className="text-sm mt-1">
                Valores e detalhes
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-xs font-semibold">
                    Categoria de serviço
                  </p>
                  <p className="text-sm">
                    Erro de rede
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold">
                    Custo inicial
                  </p>
                  <p className="text-lg font-semibold">
                    R$ 200,00
                  </p>
                </div>

                <p className="text-xs">
                  O chamado será automaticamente atribuído a um técnico disponível
                </p>
              </div>

              {/* BOTÃO */}
              <button
                className="mt-6 w-full rounded-lg bg-gray-900 py-3 text-sm text-gray-50 font-medium
                          hover:bg-gray-500 hover:text-gray-200 ease-linear transition cursor-pointer"
              >
                Criar chamado
              </button>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  )

}


 
