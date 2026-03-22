import menu from "../assets/icons/Menu.png";
import LogoIconLight from "../assets/Logo_IconLight.png";
import avatar from "../assets/Avatar.svg";
import pen from "../assets/icons/pen-line.svg";
import { useState } from "react";
import { ServiceModal } from "../componentes/ServiceModal"; // importar modal
import disable from "../assets/icons/disable.svg";
import clock_open from "../assets/icons/clock-open.svg";
import plus from "../assets/icons/plus.svg";
import { CloseOptionsModal } from "../componentes/CloseOptionsModal";
import { Sidebar } from "../componentes/Sidebar";

export type Service = {
  id: number;
  title: string;
  value: number;
  status: "active" | "inactive";
};

export function Services() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selected, setSelected] = useState<Service | null>(null);  
  const [open, setOpen] = useState(false);

  function openCreate() {
    setModalMode("create");
    setSelected(null);
    setModalOpen(true);
  }

  function openEdit(service: Service) {
    setModalMode("edit");
    setSelected(service);
    setModalOpen(true);
  }

  return (
    <div className="w-screen h-screen  xl:grid xl:grid-cols-[280px_1fr] relative  bg-gray-100 xl:overflow-hidden">
      
      <Sidebar />

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

      <div className="w-full h-screen flex flex-col px-6 xl:px-16  gap-4 bg-white absolute xl:relative py-24  rounded-3xl xl:rounded-none xl:rounded-tl-2xl mt-28 xl:mt-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Serviços</h1>
          <a
            className="flex justify-center items-center gap-2 bg-gray-800 px-3 py-2 rounded-sm hover:bg-gray-300 cursor-pointer
          transition ease-linear"
            onClick={openCreate}
          >
            <img src={plus} alt="" className="w-4 h-4" />
            <span className="text-gray-600 text-sm hidden xl:block">Novo</span>
          </a>
        </div>
        <div className="w-full bg-white rounded-2xl shadow-sm">
          <table className="w-full text-left">
            {/* Cabeçalho */}
            <thead className="border-b border-gray-500">
              <tr className="text-sm text-gray-400">
                <th className="py-4 px-2 font-medium">Título</th>
                <th className="py-4 px-2 font-medium">Valor</th>
                <th className="py-4 px-2 xl:px-6 font-medium">Status</th>
                <th className="py-4 px-2 font-medium"></th>
                <th className="py-4 px-2 font-medium"></th>
              </tr>
            </thead>

            {/* Primeira linha */}
            <tbody>
              <tr className="border-b last:border-none">
                {/* Título e Serviço */}
                <td className="py-4 px-2  xl:px-2">
                  <div className="font-bold text-gray-800 text-sm truncate max-w-[60px] xl:truncate-none xl:max-w-full">
                    Backup não está funcionando{" "}
                  </div>
                </td>

                <td className="py-4 px-2 ">
                  <div className="text-sm text-gray-400">R$ 180,00 </div>
                </td>
                {/* Status */}
                <td className="py-4 px-4 xl:px-2">
                  <span className="flex items-center gap-2">
                    <img
                      src={clock_open}
                      alt="ícone de relógio vermelho"
                      className="block xl:hidden"
                    />
                    <span className="  inline-flex items-center justify-center
                        h-8 w-8 rounded-full
                        bg-pink-100 text-pink-600
                        xl:h-auto xl:w-auto
                        xl:rounded-full
                        xl:px-3 xl:py-1 xl:gap-1">
                      Inativo
                    </span>
                  </span>
                </td>

                <td className="py-4 px-6 w-4 xl:px-6 flex gap-1">
                  <div className="h-9 w-9 flex justify-center items-center rounded-sm transition ease-linear">
                    <a
                      className="
                        flex items-center justify-center
                        h-8 w-8 rounded-full                      
                        xl:h-auto xl:w-auto
                        xl:rounded-full
                        xl:px-3 xl:py-1 xl:gap-1 
                      "
                    >
                      <div className="flex gap-1">
                        <img src={disable} alt="" />
                        <span className="hidden xl:block">Desativar</span>
                      </div>
                    </a>
                  </div>
                </td>

                <td className="py-4 px-1  w-4">
                  <a
                    onClick={() =>
                      openEdit({
                        id: 1,
                        title: "Backup não está funcionando",
                        value: 180,
                        status: "active",
                      })
                    }
                    className="rounded-lg h-9 w-9 bg-gray-500  hover:bg-gray-600 flex justify-center items-center cursor-pointer transition ease-linear"
                  >
                    <img src={pen} alt="" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      <ServiceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(data) => {
          console.log("Enviado:", data);
          setModalOpen(false);
        }}
        mode={modalMode} // agora está tipado corretamente
        data={
          selected
            ? { title: selected.title, value: selected.value }
            : undefined
        }
      />

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
