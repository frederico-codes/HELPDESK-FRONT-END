import Logo_IconLight from "../assets/icons/Logo_IconLight.svg";
import list from "../assets/icons/clipboard-list.svg"
import menu from "../assets/icons/Menu.png"
import LogoIconLight from "../assets/Logo_IconLight.png"
import avatar from "../assets/Avatar.svg"
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom"
import clockOpen from "../assets/icons/clock-open.svg"


export function MyCallingsCustomersDetail(){
  const location = useLocation();  


  return(
    <div className="w-screen h-screen  xl:grid xl:grid-cols-[280px_1fr] bg-gray-100 xl:overflow-hidden ">
      <section className=" hidden xl:flex xl:flex-col xl:justify-between bg-gray-100 pl-6 pt-14 pb-0 ">
        <div>
          <div className="flex gap-3">
            <img src={Logo_IconLight} alt="Logo padrão" />
            <div className="flex flex-col">
              <h1 className="text-gray-600 text-xl">HelpDesk</h1>
              <span className="text-xxs text-blue-light">cliente</span>
            </div>
          </div>
          <div className="flex flex-col">
            <nav className="pt-5 px-4">
              {/* CHAMADOS */}
                <Link to = "#"
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
            </nav>
          </div>
        </div>
        <div className="flex items-center gap-2  text-white  mb-11">
            <span className="w-8 h-8 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center">
              CS
            </span>
            <div className="flex flex-col" >
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

      <div  className="w-full h-screen flex flex-col px-2 xl:px-44  gap-4 bg-white absolute xl:relative rounded-3xl xl:rounded-none xl:rounded-tl-2xl mt-28 xl:mt-4 ">  
        <div className=" bg-gray-50 px-4 py-6 xl:px-0 mt-6">
          {/* VOLTAR */}
          <Link to="/" className="mb-4 flex items-center gap-2 text-sm text-gray-700 hover:text-gray-500 cursor-pointer">
            ← Voltar
          </Link>

          {/* TÍTULO */}
          <h1 className="mb-6 text-xl font-semibold text-blue-700">
            Chamado detalhado
          </h1>

          {/* GRID */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_309px]">
            {/* ===================== */}
            {/* CARD ESQUERDO */}
            {/* ===================== */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              {/* ID + STATUS */}
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  00004
                </span>

                <span className="inline-flex items-center gap-1 rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-600">
                  <img src={clockOpen} alt="" />
                  Aberto
                </span>
              </div>

              {/* TÍTULO */}
              <h2 className="mb-4 text-base font-semibold text-gray-900">
                Backup não está funcionando
              </h2>

              {/* DESCRIÇÃO */}
              <div className="mb-4">
                <p className="mb-1 text-xs font-medium text-gray-400">
                  Descrição
                </p>
                <p className="text-sm text-gray-700">
                  O sistema de backup automático parou de funcionar.
                  Última execução bem-sucedida foi há uma semana.
                </p>
              </div>

              {/* CATEGORIA */}
              <div className="mb-6">
                <p className="mb-1 text-xs font-medium text-gray-400">
                  Categoria
                </p>
                <p className="text-sm text-gray-800">
                  Recuperação de Dados
                </p>
              </div>

              {/* DATAS */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Criado em
                  </p>
                  <p className="text-gray-800">
                    12/04/25 09:12
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Atualizado em
                  </p>
                  <p className="text-gray-800">
                    12/04/25 15:20
                  </p>
                </div>
              </div>
            </div>

            {/* ===================== */}
            {/* CARD DIREITO */}
            {/* ===================== */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              {/* TÉCNICO */}
              <div className="mb-6">
                <p className="mb-3 text-xs font-medium text-gray-400">
                  Técnico responsável
                </p>

                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
                    CS
                  </span>

                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Carlos Silva
                    </p>
                    <p className="text-xs text-gray-700">
                      carlos.silva@test.com
                    </p>
                  </div>
                </div>
              </div>

              {/* VALORES */}
              <div>
                <p className="mb-3 text-xs font-medium text-gray-400">
                  Valores
                </p>

                <div className="mb-3 flex justify-between text-sm">
                  <span className="text-gray-700">Preço base</span>
                  <span className="text-gray-900">R$ 200,00</span>
                </div>

                <div className="mb-3">
                  <p className="mb-2 text-xs font-medium text-gray-400">
                    Adicionais
                  </p>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      Assinatura de backup
                    </span>
                    <span className="text-gray-900">
                      R$ 120,00
                    </span>
                  </div>

                  <div className="mt-1 flex justify-between text-sm">
                    <span className="text-gray-700">
                      Formatação do PC
                    </span>
                    <span className="text-gray-900">
                      R$ 75,00
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex justify-between border-t pt-4 text-sm font-semibold">
                  <span>Total</span>
                  <span>R$ 395,00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>    
   
    </div>
  )
}
  
    
    


 
