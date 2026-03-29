import { X } from "phosphor-react";
import { Input } from "../componentes/Input"
import { Upload } from "./Upload";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onOpenAlterProfile: () => void;
  onSave: (data: { name: string; email: string }) => void;
  initialName?: string;
  initialEmail?: string;
}



export function ProfileModalCustomer({ open, onClose, onOpenAlterProfile, onSave, initialName, initialEmail }: Props) {
  const [name, setName] = useState(initialName || "")
  const [email, setEmail] = useState(initialEmail || "")
  const [password, setPassword] = useState("")
  

   async function onSubmit(e: React.FormEvent) {
     e.preventDefault();

    onSave({ name, email });
    onClose();
   }


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
      <form
        onSubmit={onSubmit}
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
          <Upload filename={null} />

          {/* NOME */}
          <div>
            <Input
              name="Nome"
              required
              legend="Nome"
              type="text"
              placeholder="Carlos Silva"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* EMAIL */}
          <div>
            <Input
              name="email"
              required
              legend="E-mail"
              type="email"
              placeholder="exemplo@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}              
            />
          </div>

          {/* SENHA */}
          <div>
            <div className="flex items-center justify-between gap-3">
              <Input
                name="password"
                required
                legend="SENHA"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
        </div>
        {/* BOTÃO SALVAR */}
        <div className="px-6 pb-6">
          <button
          type="submit"
          className="
          w-full bg-gray-900 text-white py-3 rounded-md
          font-medium text-sm hover:bg-gray-500 transition cursor-pointer hover:text-gray-200
          "
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
