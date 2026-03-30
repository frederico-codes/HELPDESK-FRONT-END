import Logo_IconLight from "../assets/icons/Logo_IconLight.svg";
import list from "../assets/icons/clipboard-list.svg";
import menu from "../assets/icons/Menu.png";
import LogoIconLight from "../assets/Logo_IconLight.png";
import avatar from "../assets/Avatar.svg";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import plus from "../assets/icons/plus.svg";
import { Input } from "../componentes/Input";
import { Select } from "../componentes/Select";
import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories";
import { useState } from "react";
import { useEffect} from "react";
import { useUser } from "../contexts/UserContext";

const callsMock = [
  {
    id: "00001",
    title: "Computador não liga",
    description: "Ao apertar o botão, nada acontece.",
    category: "hardware",
  },
  {
    id: "00002",
    title: "Internet lenta",
    description: "A conexão está muito instável.",
    category: "network",
  },
  {
    id: "00003",
    title: "Backup não está funcionando",
    description:
      "O sistema de backup automático parou de funcionar. Última execução bem-sucedida foi há uma semana.",
    category: "data_recovery",
  },
  {
    id: "00004",
    title: "Erro ao instalar software",
    description: "A instalação trava em 50%.",
    category: "software",
  },
];

function getInitials(name: string) {
  const parts = name.trim().split(" ").filter(Boolean);

  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0][0].toUpperCase();

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}



export function CallForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser(); // ✅ AGORA VEM DO CONTEXT

  const userInitials = getInitials(user.name);
  const isEditMode = !!id;
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const categoryLabel = category
? CATEGORIES[category as keyof typeof CATEGORIES]?.name
: "Selecione a categoria de atendimento";

useEffect(() => {
  const stateData = location.state as
    | {
        title?: string;
        description?: string;
        category?: string;
      }
    | undefined;

  if (stateData) {
    setTitle(stateData.title || "");
    setDescription(stateData.description || "");
    setCategory(stateData.category || "");
    return;
  }

  if (!id) return;

  const call = callsMock.find((item) => item.id === id);
  if (!call) return;

  setTitle(call.title);
  setDescription(call.description);
  setCategory(call.category);
}, [id, location.state]);


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = {
      title,
      description,
      category,
    };


  if (isEditMode) {
    console.log("Atualizar chamado:", id, payload);

    setTitle("");
    setDescription("");
    setCategory("");

    navigate("/chamados/novo");
    return;
  }

    const fakeNewId = "00005";

      navigate(`/chamados/${fakeNewId}/edit`, {
      state: payload,
    });
  }

  return (
    <div className="w-screen h-screen  xl:grid xl:grid-cols-[280px_1fr] relative  bg-gray-100 xl:overflow-hidden ">
      <section className="hidden xl:flex xl:flex-col xl:justify-between  bg-gray-100 pl-6 pt-10 pb-6">
        <div>
          <div className="flex gap-3">
            <img src={Logo_IconLight} alt="Logo padrão" />
            <div className="flex flex-col">
              <h1 className="text-gray-600 text-xl">HelpDesk</h1>
              <span className="text-xxs text-blue-light uppercase">
                cliente
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-[730px]">
            <nav className="pt-5 px-4">
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
                    location.pathname === "/" ? "invert brightness-0" : ""
                  }
                />
                Meus chamados
              </Link>

              <Link
                to="/chamados/novo"
                className={`
                    w-[180px] flex items-center gap-2 text-sm p-3 outline-0 rounded-sm
                    ${
                      location.pathname === "/chamados/novo"
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
            {userInitials}
          </span>
          <div className="flex flex-col">
            <span className="text-sm">{user.name}</span>
            <span className="text-xs text-gray-400">{user.email}</span>
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

      <div className="w-full h-screen flex flex-col px-6 xl:px-6  gap-4 bg-white absolute xl:relative pt-2  rounded-3xl xl:rounded-none xl:rounded-tl-2xl mt-28 xl:mt-4">
        <div className="min-h-screen px-4 py-6 lg:px-44">
          {/* TÍTULO */}
          <h1 className="text-xl font-semibold text-blue-700 mb-6">
            {isEditMode ? "Editar chamado" : "Novo chamado"}
          </h1>

          {/* GRID */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]"
          >
            <div className="bg-white rounded-xl border border-gray-500 p-6 ">
              <h2 className="text-base font-semibold text-gray-900">
                Informações
              </h2>

              <p className="text-sm  mt-1">
                Configure os dias e horários em que você está disponível para
                atender chamados
              </p>

              
              <div className="pt-6">
                <Input
                  name="titulo"
                  required
                  legend="TÍTULO"
                  type="text"
                  value={title}
                  placeholder="Digite um título para o chamado"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

             
              <div className="mt-6">
                <label className="block text-xs font-semibold focus:outline-none focus:border-blue-600 mb-2">
                  DESCRIÇÃO
                </label>
                <textarea
                  name="descricao"
                  placeholder="Descreva o que está acontecendo"
                  rows={6}
                  className="w-full border border-gray-500 py-2 px-4 text-sm text-gray-700 resize-none focus:outline-none focus:border-blue-600 text-imheight"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              
              <div className="pt-6">
                <div className="relative w-full">
                  <div className="flex gap-4">
                    <Select
                      required
                      legend=" CATEGORIA DE SERVIÇO"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      // disabled={!!params.id}
                    >
                    <option value="">
                      Selecione a categoria de atendimento
                    </option>
                    {CATEGORIES_KEYS.map((categoryKey) => (
                      <option key={categoryKey} value={categoryKey}>
                        {CATEGORIES[categoryKey].name}
                      </option>
                    ))}
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* ===================== */}
            {/* RESUMO */}
            {/* ===================== */}
            <div className="bg-white rounded-xl border border-gray-500 p-6 h-fit">
              <h2 className="text-base font-semibold text-gray-900">Resumo</h2>

              <p className="text-sm mt-1">Valores e detalhes</p>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-xs font-semibold">Categoria de serviço</p>
                   <p className="text-sm">{categoryLabel}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold">Custo inicial</p>
                  <p className="text-lg font-semibold">R$ 200,00</p>
                </div>

                <p className="text-xs">
                  O chamado será automaticamente atribuído a um técnico
                  disponível
                </p>
              </div>
             
              <button
                type="submit"
                className="mt-6 w-full rounded-lg bg-gray-900 py-3 text-sm text-gray-50 font-medium
                          hover:bg-gray-500 hover:text-gray-200 ease-linear transition cursor-pointer"
              >
                {isEditMode ? "Salvar alterações" : "Criar chamado"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
