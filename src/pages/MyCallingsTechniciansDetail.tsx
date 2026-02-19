import Defaultogo from "../assets/Defaultogo.svg";
import list from "../assets/icons/clipboard-list.svg";
import menu from "../assets/icons/Menu.png";
import LogoIconLight from "../assets/Logo_IconLight.png";
import avatar from "../assets/Avatar.svg";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import clock_open from "../assets/icons/clock-open.svg";
import clock from "../assets/icons/clock.svg";
import clock_2 from "../assets/icons/clock_2.svg";
import bin from "../assets/icons/bin.svg";
import { useState } from "react";
import { MyCallingsTechniciansDetailModalAdditionalService } from "../componentes/MyCallingsTechniciansDetailModalAdditionalService";



export function MyCallingsTechniciansDetail() {
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-screen h-screen  xl:grid xl:grid-cols-[280px_1fr] relative  bg-gray-100 ">
      <section className=" hidden xl:block  bg-gray-100 px-6 pt-6 ">
        <div className="flex gap-3">
          <img src={Defaultogo} alt="Logo padrão" />
          <div className="flex flex-col">
            <h1 className="text-gray-600 text-xl">HelpDesk</h1>
            <span className="text-xxs text-blue-light uppercase">Técnico</span>
          </div>
        </div>
        <div className="flex flex-col gap-[720px]">
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
          <div className="flex items-center gap-2  text-white">
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
                <span className="text-xxs text-blue-light uppercase">Técnico</span>
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

      <div className="w-full h-screen flex flex-col px-2 xl:px-6  gap-4 bg-white absolute xl:relative rounded-3xl xl:rounded-none xl:rounded-tl-2xl mt-28 xl:mt-4 ">
        <main className="max-w-6xl mx-auto px-4  pt-10">
          {/* Linha de voltar + título + botões */}
          <header className="mb-6 md:mb-8 ">
            {/* Voltar */}
            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-500"
            >
              <span className="text-lg">←</span>
              Voltar
            </Link>

            {/* Título + botões de ação */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between max-w-[1090px] mx-auto px-4 ">
              <h1 className="text-2xl font-semibold text-blue-800">
                Chamado detalhado
              </h1>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button className="flex items-center justify-center gap-2 rounded-md  bg-gray-500 px-5 py-2 text-sm font-medium text-gray-800 hover:bg-gray-600 ease-linear cursor-pointer">
                  {/* Ícone de check/fechar */}
                  <img src={clock} alt="" />
                  Encerrar
                </button>

                <button className="flex items-center justify-center gap-2 rounded-md bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-300 ease-linear cursor-pointer">
                  {/* Ícone de relógio */}
                  <img src={clock_2} alt="" />
                  Iniciar atendimento
                </button>
              </div>
            </div>
          </header>

          {/* Conteúdo principal */}
          <section className=" ">
            {/* Grid principal: info do chamado + técnico/valores */}
            <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
              {/* Card principal do chamado */}
              <div className="rounded-2xl border border-gray-500 bg-white p-5 md:p-6">
                {/* Cabeçalho do card */}
                <div className="mb-4 flex items-start justify-between">
                  <span className="text-sm text-gray-400">00004</span>

                  <span className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-700">
                    <img src={clock_open} alt="" />
                    Aberto
                  </span>
                </div>

                {/* Título */}
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  Backup não está funcionando
                </h2>

                {/* Descrição */}
                <div className="mb-6">
                  <p className="mb-1 text-xs font-semibold text-gray-400">
                    Descrição
                  </p>
                  <p className="text-sm text-gray-700">
                    O sistema de backup automático parou de funcionar. Última
                    execução bem-sucedida foi há uma semana.
                  </p>
                </div>

                {/* Categoria */}
                <div className="mb-6">
                  <p className="mb-1 text-xs font-semibold text-gray-400">
                    Categoria
                  </p>
                  <p className="text-sm text-gray-800">Recuperação de Dados</p>
                </div>

                {/* Criado / Atualizado */}
                <div className="mb-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="mb-1 text-xs font-semibold text-gray-400">
                      Criado em
                    </p>
                    <p className="text-sm text-gray-800">12/04/25 09:12</p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-semibold text-gray-400">
                      Atualizado em
                    </p>
                    <p className="text-sm text-gray-800">12/04/25 15:20</p>
                  </div>
                </div>

                {/* Cliente */}
                <div>
                  <p className="mb-2 text-xs font-semibold text-gray-200">
                    Cliente
                  </p>
                  <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                      AC
                    </span>
                    <span className="text-sm text-gray-800">André Costa</span>
                  </div>
                </div>
              </div>

              {/* Card do técnico / valores */}
              <div className="rounded-2xl border border-gray-500 bg-white p-5 md:p-6">
                {/* Técnico responsável */}
                <div className="mb-6">
                  <p className="mb-3 text-xs font-semibold text-gray-400">
                    Técnico responsável
                  </p>

                  <div className="flex items-center gap-3 ">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                      CS
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">
                        Carlos Silva
                      </span>
                      <span className="text-xs text-gray-500">
                        carlos.silva@test.com
                      </span>
                    </div>
                  </div>
                </div>

                {/* Valores */}
                <div>
                  <p className="mb-3 text-xs font-semibold text-gray-400">
                    Valores
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between text-gray-700">
                      <span>Preço base</span>
                      <span>R$ 200,00</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-700">
                      <span>Adicionais</span>
                      <span>R$ 195,00</span>
                    </div>
                  </div>

                  <hr className="my-4 border-gray-500" />

                  <div className="flex items-center justify-between text-sm font-semibold text-gray-900">
                    <span>Total</span>
                    <span>R$ 395,00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Serviços adicionais – embaixo e ocupando toda a largura */}
            <div className="mt-6 rounded-2xl border border-gray-500 bg-white p-5 md:p-6 lg:col-span-2 xl:w-[665px] ">
              <div className="border-b border-gray-500 flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-800">
                  Serviços adicionais
                </p>

                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gray-900 text-lg text-white hover:bg-gray-50 cursor-pointer hover:text-gray-200 ease-linear transition"
                  onClick={() => setModalOpen(true)}
                >
                  +
                </button>
              </div>

              <div className="divide-y divide-gray-500 text-sm">
                {/* Serviço 1 */}
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-800">Assinatura de backup</span>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-800">R$ 120,00</span>
                    <img
                      src={bin}
                      alt="icone de lixeira"
                      className="cursor-pointer"
                    />
                  </div>
                </div>

                {/* Serviço 2 */}
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-800">Formatação do PC</span>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-800">R$ 75,00</span>
                    <img
                      src={bin}
                      alt="icone de lixeira"
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <MyCallingsTechniciansDetailModalAdditionalService
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
