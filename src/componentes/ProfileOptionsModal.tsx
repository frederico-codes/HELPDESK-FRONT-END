import { useAuth } from "../hooks/useAuth"
import { User, SignOut } from "phosphor-react"


interface Props {
  open: boolean
  onClose: () => void
  onOpenProfile: () => void   // ← ADICIONE ISTO
}


export function ProfileOptionsModal({ open, onClose, onOpenProfile  }: Props) {
  



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
        <h3 className="text-xs font-semibold text-gray-400 mb-4">OPÇÕES</h3>

        {/* PERFIL */}
        <button className="w-full flex items-center gap-3 text-sm py-2 hover:text-gray-300 cursor-pointer"  onClick={() => {
          onClose();        // fecha o modal preto
          onOpenProfile();  // abre o modal de perfil
        }}>
          <User size={20} />
          Perfil
        </button>

        {/* SAIR */}
        <button className="w-full flex items-center gap-3 text-sm py-2 text-red-500 hover:text-red-400 cursor-pointer" onClick={()=>auth.remove()}>
          <SignOut size={20} />
          Sair
        </button>
      </div>
    </div>
  )
}
