import { X } from "phosphor-react";
import { Upload } from "./Upload";
import { Input } from "./Input";

interface Props {
  open: boolean
  onClose: () => void  
  onOpenAlterProfile:() => void 
  
}


export function ProfileTechnicianModal({ open, onClose, onOpenAlterProfile }: Props) {
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
          w-full max-w-[440px]
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-500">
          <h2 className="text-lg font-semibold text-gray-900">Perfil</h2>
          <button onClick={onClose}>
            <X
              size={22}
              className="text-gray-700 hover:text-gray-500 cursor-pointer"
            />
          </button>
        </div>

        {/* CONTEÚDO */}
        <div className="px-6 py-5 space-y-6">
          {/* FOTO + BOTÕES */}
          <Upload filename={null} />

          {/* NOME */}
          <Input
            name="name"
            required
            legend="Nome"
            type="text"
            placeholder="Carlos Silva"
          />

          {/* EMAIL */}
          <Input
            name="email"
            required
            legend="E-mail"
            type="email"
            placeholder="exemplo@mail.com"
          />

          {/* SENHA */}
          <div>
            <div className="flex items-center justify-between">
              <Input
                name="password"
                required
                legend="SENHA"
                type="password"
                placeholder="Digite sua senha"
              />

              <button
                className="px-3 py-1.5 rounded-md bg-gray-500 text-gray-700 hover:bg-gray-50 text-sm cursor-pointer"
                onClick={() => {
                  onClose(); // fecha o modal preto
                  onOpenAlterProfile(); // abre o modal de perfil
                }}
              >
                Alterar
              </button>
            </div>
          </div>

          {/* DISPONIBILIDADE  */}
          <div>
            <p className="text-xs font-semibold text-gray-400">
              Disponibilidade
            </p>
            <p className="text-gray-400 mb-2">
              Horários de atendimento definidos pelo admin
            </p>

            <div className="flex flex-wrap gap-2">
              {["09:00", "10:00", "12:00", "13:00", "15:00", "16:00"].map(
                (h, i) => (
                  <button
                    key={i}
                    className="
                    px-3 py-1 rounded-full border border-gray-500
                    text-xs text-gray-700 bg-white
                    hover:bg-gray-500 cursor-pointer
                  "
                  >
                    {h}
                  </button>
                ),
              )}
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
