import Defaultogo from "../assets/Defaultogo.svg"
import tecnicos from "../assets/icons/tecnicos.svg"
import briefcase from "../assets/icons/briefcase.svg"
import wrench from "../assets/icons/wrench.svg"
import list from "../assets/icons/clipboard-list.svg"
import menu from "../assets/icons/Menu.png"
import LogoIconLight from "../assets/Logo_IconLight.png"
import avatar from "../assets/Avatar.svg"
import clockOpen from "../assets/icons/clock-open.svg"
import clock from "../assets/icons/clock.svg"
import { Link } from "react-router-dom"

export function DetailedCall(){

  return(
    <div className="w-screen h-screen  xl:grid xl:grid-cols-[280px_1fr] relative  bg-gray-100 xl:overflow-hidden">
      <section className="hidden xl:block bg-gray-100 p-6 ">
        <div className="flex gap-3">
          <img src={Defaultogo} alt="Logo padrão" />
          <div className="flex flex-col">
            <h1 className="text-gray-600 text-xl">HelpDesk</h1>
            <span className="text-xxs text-blue-light">Admin</span>
          </div>
        </div>
        <div className="h-screen flex flex-col">
          <nav className="pt-5 px-4">
              {/* CHAMADOS */}
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
              Chamados
            </Link>
            {/* TÉCNICOS */}
            <Link to="/technicians"
              className={`
                w-[180px] flex items-center gap-2 text-sm p-3 outline-0 rounded-sm
                ${location.pathname === "/technicians"
                  ? "bg-blue-dark text-white"
                  : "text-gray-400"
                }
              `}
            >
              <img
                src={tecnicos}
                alt=""
                className={location.pathname === "/technicians" ? "invert brightness-0" : ""}
              />
              Técnicos
            </Link>
            {/* CLIENTES */}
            <Link to="/customers"
              className={`
                w-[180px] flex items-center gap-2 text-sm p-3 outline-0 rounded-sm
                ${location.pathname === "/customers"
                  ? "bg-blue-dark text-white"
                  : "text-gray-400"
                }
              `}
            >
              <img
                src={briefcase}
                alt=""
                className={location.pathname === "/customers" ? "invert brightness-0" : ""}
              />
              Clientes
            </Link>
            {/* SERVIÇOS */}
            <Link to="/services"
              className={`
                w-[180px] flex items-center gap-2 text-sm p-3 outline-0 rounded-sm
                ${location.pathname === "/services"
                  ? "bg-blue-dark text-white"
                  : "text-gray-400"
                }
              `}
              >
              <img
                src={wrench}
                alt=""
                className={location.pathname === "/services" ? "invert brightness-0" : ""}
              />
              Serviços
            </Link>
          </nav>
          <div className="flex items-center gap-2  text-white absolute bottom-12">         
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
            <img src={menu} alt="menu" className=""/>

            <div className="flex justify-center gap-4 ">
              <img src= { LogoIconLight } alt="LogoIconLight" className="h-11 w-11"/>
              <div>
                <h1 className="text-xl text-gray-600 ">HelpDesk</h1>
                <span className="text-xxs text-blue-light ">Admin</span>
              </div>
            </div>
          </div>
          {/* GRUPO DIREITA */}
          <div>
            <img src={avatar} alt="avatar" className="absolute top-8 right-10" />
          </div>
        </div>            
      </section>      

      <div className="w-full h-screen flex flex-col  xl:px-0  gap-4 bg-white absolute xl:relative rounded-3xl xl:rounded-none xl:rounded-tl-2xl mt-28 xl:mt-4 py-24">
        <div className="w-full px-8 xl:px-10 2xl:px-72">          
          <div className="flex flex-col xl:ml-24 xl:w-[800px] "> 
            <Link to="/" className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-500">
              <span className="text-lg">←</span>
              Voltar
            </Link>
            
            <div className="flex flex-col  xl:flex-row xl:items-center xl:justify-between gap-4 mb-8">
              <h1 className="text-2xl font-bold text-blue-dark">
                Chamado detalhado
              </h1>
              <div className="flex justify-between gap-3">
                <span className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-500 text-gray-700 text-sm">
                  <img src={clock} alt="" /> Em atendimento
                </span>
                <span className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-500 text-gray-700 text-sm">
                  ✔ Encerrado
                </span>
              </div>
            </div>
          </div>

          {/* CONTAINER DO CONTEÚDO */}
          <div className="grid grid-cols-1 xl:grid-cols-[480px_300px] gap-8 mx-auto max-w-[900px] w-full">


            {/* COLUNA ESQUERDA */}
            <div className="bg-white border border-gray-500 rounded-xl p-6">

            <div className="flex justify-between">
              <p className="text-sm text-gray-200 mb-1">00004</p>
              <span className="inline-flex items-center gap-2 text-sm bg-red-100 text-red-700 px-4 py-1.5 rounded-full mb-6">
                <img src={clockOpen} alt="ícone relógio vermelho" /> Aberto
              </span>
            </div>

              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Backup não está funcionando
              </h2>
                

              {/* Descrição */}
              <div className="mb-6">
                <h3 className="text-xs text-gray-400">Descrição</h3>
                <p className="text-sm text-gray-400 mt-1">
                  O sistema de backup automático parou de funcionar. Última execução
                  bem-sucedida foi há uma semana.
                </p>
              </div>

              {/* Categoria */}
              <div className="mb-6">
                <h3 className="text-sm text-gray-400">Categoria</h3>
                <p className="text-sm text-gray-700 mt-1">
                  Recuperação de Dados
                </p>
              </div>

              {/* Criado e Atualizado */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm text-gray-400">Criado em</h3>
                  <p className="text-sm text-gray-700 mt-1">
                    12/04/25 09:12
                  </p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Atualizado em</h3>
                  <p className="text-sm text-gray-700 mt-1">
                    12/04/25 15:20
                  </p>
                </div>
              </div>

              {/* Cliente */}
              <div>
                <h3 className="text-sm text-gray-400">Cliente</h3>
                <div className="flex items-center gap-3 mt-2">
                  <span className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs">
                    AC
                  </span>
                  <span className="text-sm text-gray-700">André Costa</span>
                </div>
              </div>
            </div>

            {/* COLUNA DIREITA */}
            <div className="bg-white border border-gray-500 rounded-xl p-6">              
              <h3 className="text-sm text-gray-400 mb-2">Técnico responsável</h3>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs">
                  CS
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-800">Carlos Silva</p>
                  <p className="text-xs text-gray-400">carlos.silva@test.com</p>
                </div>
              </div>             
              <div className="mb-6">
                <h3 className="text-sm text-gray-400">Valores</h3>
                <div className="flex justify-between text-sm text-gray-700 mt-2">
                  <span>Preço base</span>
                  <span className="font-medium">R$ 200,00</span>
                </div>
              </div>              
              <div className="mb-6">
                <h3 className="text-sm text-gray-400">Adicionais</h3>
                <div className="flex justify-between text-sm text-gray-700 mt-2">
                  <span>Assinatura de backup</span>
                  <span>R$ 120,00</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700 mt-1">
                  <span>Formatação do PC</span>
                  <span>R$ 75,00</span>
                </div>
              </div>

              {/* TOTAL */}
              <div className="flex justify-between text-sm font-semibold text-gray-900 border-t border-gray-200 pt-4">
                <span>Total</span>
                <span className="bold">R$ 395,00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}
 
