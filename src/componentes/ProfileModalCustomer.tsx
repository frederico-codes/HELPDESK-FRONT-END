import { X } from "phosphor-react";
import bin from "../assets/icons/bin.svg"
import uiface from "../assets/uifaces-popular-avatar (2).jpg"

interface Props {
  open: boolean
  onClose: () => void  
  onOpenAlterProfile:() => void   
}


export function ProfileModalCustomer({ open, onClose, onOpenAlterProfile }: Props) {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 bg-black/40 z-50
        flex items-center justify-center
        px-4 sm:px-0
      "
      onClick={onClose}
    >
      {/* MODAL */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          bg-white rounded-2xl shadow-lg animate-fade
          w-full max-w-xl
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-500">
          <h2 className="text-lg font-semibold text-gray-900">Perfil</h2>
          <button onClick={onClose}>
            <X size={22} className="text-gray-700 hover:text-gray-500 cursor-pointer" />
          </button>
        </div>

        {/* CONTEÚDO */}
        <div className="px-6 py-5 space-y-6">

          {/* FOTO + BOTÕES */}
          <div className="flex items-center gap-4">
            <img
              src={uiface}
              alt="uiavatar"
              className="h-14 w-14 rounded-full object-cover"
            />

            <div className="flex items-center gap-2">
             
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 px-3 py-2 
                bg-gray-500 rounded-lg cursor-pointer
                text-sm font-medium text-gray-800
                hover:bg-gray-50 transition">

                  {/* Ícone upload (SVG inline ou componente) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 16V4" />
                    <path d="M8 8l4-4 4 4" />
                    <path d="M20 16v4H4v-4" />
                  </svg>
                  Nova imagem
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>

              <button className="p-1 rounded-md bg-gray-500  hover:bg-rgray-50 cursor-pointer">
                <img src={bin} alt="" />
              </button>
            </div>
          </div>

          {/* NOME */}
          <div>
            <label className="text-xs font-semibold">NOME</label>
            <input
              type="text"
              placeholder="Carlos Silva"
              className="
                w-full border-b border-gray-500 focus:border-blue-600
                outline-none py-2 text-gray-700
              "
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-xs font-semibold">E-MAIL</label>
            <input
              type="email"
              placeholder="carlos.silva@test.com"
              className="
                w-full border-b border-gray-500 focus:border-blue-600
                outline-none py-2 text-gray-700
              "
            />            
          </div>

          {/* SENHA */}
          <div>
            <label className="text-xs font-semibold">SENHA</label>
            <div className="flex items-center gap-3">
              <input
                type="password"
                placeholder="123456"
                className="
                  w-full border-b border-gray-500 focus:border-blue-600
                  outline-none py-2 text-gray-700 tracking-widest
                "
              />

              <button className="px-3 py-1.5 rounded-md bg-gray-500 text-gray-700
               hover:bg-gray-50 text-sm cursor-pointer" onClick={() => {
                onClose();        // fecha o modal preto
                onOpenAlterProfile();  // abre o modal de perfil
              }}>
                Alterar
              </button>
            </div>
          </div>       
        </div>

        {/* BOTÃO SALVAR */}
        <div className="px-6 pb-6">
          <button
            className="
              w-full bg-gray-900 text-white py-3 rounded-md
              font-medium text-sm hover:bg-gray-500 transition cursor-pointer hover:text-gray-200
            "
          >
            Salvar
          </button>
        </div>
      </div>      
    </div>
  );
}
