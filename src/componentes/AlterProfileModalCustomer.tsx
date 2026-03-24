import { X } from "phosphor-react"
import { Input } from "./Input";

interface Props {
  open: boolean
  onClose: () => void
}

export function AlterProfileModalCustomer({ open, onClose }: Props) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      {/* MODAL */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-md
          rounded-2xl bg-white
          shadow-xl
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-500">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="text-gray-700 hover:text-gray-500 cursor-pointer"
            >
              ←
            </button>

            <h2 className="text-base font-semibold">Alterar senha</h2>
          </div>

          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-500 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* CONTEÚDO */}
        <div className="px-6 py-6 space-y-6">
          {/* SENHA ATUAL */}
          <div>
            <Input
              name="password"
              required
              legend="SENHA"
              type="password"
              placeholder="Digite sua senha"
            />
          </div>

          {/* NOVA SENHA */}
          <div>
            <Input
              name="password"
              required
              legend="NOVA SENHA"
              type="password"
              placeholder="Digite sua nova senha"
            />
            <span className="mt-1 block text-xs text-gray-400">
              Mínimo de 6 dígitos
            </span>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 pb-6">
          <button
            className="
              w-full rounded-md
              bg-gray-900 py-3
              text-sm font-medium text-white
              hover:bg-gray-800 transition cursor-pointer
            "
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
