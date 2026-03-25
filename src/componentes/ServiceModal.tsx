import { Input } from "../componentes/Input"
import { useState } from "react";

export type ServiceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  mode: "create" | "edit";
  data?: { title: string; value: number } | undefined;
};


export function ServiceModal({ isOpen, onClose, mode }: ServiceModalProps) {
  const [service, setService] = useState("");
  const [value, setValue] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    console.log({service, value})
  }
 

  if (!isOpen) return null;

  const isEdit = mode === "edit";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-500">
          <h2 className="text-lg font-semibold">
            {isEdit ? "Serviço" : "Cadastro de serviço"}
          </h2>

          <button onClick={onClose} className="text-gray-200 hover:text-gray-700">
            ✕
          </button>
        </div>

        {/* Corpo do Modal */}
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-6 px-6 py-6"
        >
          {/* Campo Título */}
          <div className="flex flex-col gap-2">
              <Input
                name = "titulo"
                required
                legend="TÍTULO"
                type="text"
                placeholder="Nome do serviço"
                value={service}
                onChange={(e) => setService(e.target.value)}

              />
          </div>

          {/* Campo Valor */}
          <div className="flex flex-col gap-2">              
               <Input
                name = "valor"
                required
                legend="VALOR"
                type="number"
                placeholder="R$ 0,00"
                value={value}
                onChange={(e) => setValue(e.target.value)}        
              />
          </div>         

          {/* Botão Salvar */}
          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-md"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
