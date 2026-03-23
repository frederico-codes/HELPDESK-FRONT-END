import menu from "../assets/icons/Menu.png"
import LogoIconLight from "../assets/Logo_IconLight.png"
import avatar from "../assets/Avatar.svg"
import { Link } from "react-router-dom"
import { Sidebar } from "../componentes/Sidebar";
import { Input } from "../componentes/Input"

export function DetailedTechnicians(){


  return(
    <div className="w-screen h-screen  xl:grid xl:grid-cols-[280px_1fr] bg-gray-100 xl:overflow-hidden">

      <Sidebar />
      
       <section className="block  xl:hidden w-screen h-screen  absolute  ">        
          <div className="flex justify-between items-center  ">
            {/* GRUPO ESQUERDA */}
            <div className="flex justify-center items-center gap-3.5 absolute top-7 left-6">
              <img src={menu} alt="menu" className=""/>

              <div className="flex justify-center gap-4 ">
                <img src= { LogoIconLight } alt="LogoIconLight" className="h-11 w-11"/>
                <div>
                  <h1 className="text-xl text-gray-600 ">HelpDesk</h1>
                  <span className="text-xxs text-blue-light uppercase">Técnico</span>
                </div>
              </div>
            </div>
            {/* GRUPO DIREITA */}
            <div>
              <img src={avatar} alt="avatar" className="absolute top-8 right-10" />
            </div>
          </div>            
      </section>     

      <div   className="w-full  flex flex-col   xl:px-14 gap-4 bg-white absolute xl:relative py-24  rounded-3xl xl:rounded-none xl:rounded-tl-2xl mt-28  xl:mt-4">
        <div className="w-full h-full flex flex-col  bg-gray-50 px-6">
              
          {/* VOLTAR */}

          {/* TÍTULO + BOTÕES (MOBILE VAI PARA BAIXO) */}
      

          <div className="flex flex-col"> 
            <Link to="/technicians" className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-500">
              <span className="text-lg">←</span>
              Voltar
            </Link>
            
            <div className="flex flex-col  xl:flex-row xl:items-center xl:justify-between gap-4 mb-8 xl:px-30">
              <h1 className="text-2xl font-bold text-blue-dark">
                Perfil de técnico
              </h1>
              <div className="flex justify-between gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-500 text-gray-700 text-sm cursor-pointer">
                  Cancelar
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 text-gray-600 text-sm cursor-pointer">
                  Salvar
                </button>
              </div>
            </div>
          </div>

          {/* GRID PRINCIPAL */}
          <div className="grid grid-cols-1 xl:grid-cols-[290px_1fr] gap-10 xl:px-28">

            {/* CARD DADOS PESSOAIS */}
            <div className="border border-gray-500 rounded-xl p-6">
              <h2 className="text-base font-semibold mb-1">Dados pessoais</h2>
              <p className="text-xs mb-6">
                Defina as informações do perfil de técnico
              </p>

              {/* Nome */}
            <div className="flex flex-col gap-2">
              <Input
                name = "titulo"
                required
                legend="TÍTULO"
                type="text"
                placeholder="Nome do serviço"
              />
            </div>

              {/* Email */}
            <div className="flex flex-col gap-2 mt-4">
              <Input
                name = "email"
                required
                legend="E-mail"
                type="email"
                placeholder="exemplo@mail.com"
              />
            </div>

              {/* Senha */}
            <div className="flex flex-col gap-2 mt-4">
              <Input
                name = "senha"
                required
                legend="SENHA"
                type="password"
                placeholder="123456"
              />
            </div>

              <p className="text-xs text-gray-400 mt-2">Mínimo de 6 dígitos</p>
            </div>

            {/* CARD HORÁRIOS */}
            <div className=" border border-gray-500 rounded-xl p-6">
              <h2 className="text-base font-semibold mb-1">Horários de atendimento</h2>
              <p className="text-xs mb-6">
                Selecione os horários de disponibilidade do técnico para atendimento
              </p>

              {/* MANHÃ */}
              <h3 className="text-xs font-bold mb-2">MANHÃ</h3>
              <div className="flex flex-wrap gap-3 mb-6">
                {["07:00", "08:00", "09:00", "10:00", "11:00", "12:00"].map((h) => (
                  <button
                    key={h}
                    className="px-2.5 py-1.5 border border-gray-300 rounded-full text-xs"
                  >
                    {h}
                  </button>
                ))}
              </div>

              {/* TARDE */}
              <h3 className="text-xs font-bold mb-2">TARDE</h3>
              <div className="flex flex-wrap gap-3 mb-6">
                {["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map((h) => (
                  <button
                    key={h}
                    className="px-2.5 py-1.5 border border-gray-300 rounded-full text-xs"
                  >
                    {h}
                  </button>
                ))}
              </div>

              {/* NOITE */}
              <h3 className="text-xs font-bold mb-2">NOITE</h3>
              <div className="flex flex-wrap gap-3">
                {["19:00", "20:00", "21:00", "22:00", "23:00"].map((h) => (
                  <button
                    key={h}
                    className="px-2.5 py-1.5 border border-gray-300 rounded-full text-xs"
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>    
  )
}


 
