import { useAuth } from "../hooks/useAuth"
import { SignOut } from "phosphor-react"

interface Props {
  open: boolean
  onClose: () => void
  onOpenProfile: () => void   // ← ADICIONE ISTO
}


export function CloseOptionsModal({ open, onClose}: Props) {
  if (!open) return null
  const auth = useAuth()

  return (
    <div
      className="fixed inset-0 z-40"
      onClick={onClose} // fecha ao clicar fora
    >
      {/* MENU */}
      <div
        onClick={(e) => e.stopPropagation()} // evita fechar ao clicar dentro
        className="
          absolute bottom-2 left-72
          bg-gray-900 text-white 
          rounded-xl shadow-xl 
          p-5 w-56 
        "
      >        

        {/* SAIR */}
        <button className="w-full flex items-center gap-3 text-sm py-2 text-red-500 hover:text-red-400 cursor-pointer" onClick={()=>auth.remove()}>
          <SignOut size={20} />
          Sair
        </button>
      </div>
    </div>
  )
}
