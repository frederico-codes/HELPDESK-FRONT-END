import { X } from "phosphor-react"
import { useState } from "react";
import { Input } from "../componentes/Input"

interface Props {
  open: boolean
  onClose: () => void
}

export function MyCallingsTechniciansDetailModalAdditionalService({ open, onClose }: Props) {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");


  function onSubmit(e: React.FormEvent){
  e.preventDefault()

  console.log({description, value})
}



  if (!open) return null

  return (
    <form
      onSubmit={onSubmit}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      {/* CONTAINER DO MODAL */}
      <div
        className="
        bg-white rounded-2xl w-full max-w-[440px]
        pt-5 pb-6
        shadow-lg animate-fade
      "
        onClick={(e) => e.stopPropagation()} // ← impede que clique dentro feche o modal
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 border-b border-gray-500 pb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Serviço adicional
          </h2>

          <button onClick={onClose}>
            <X
              size={22}
              className="text-gray-700 hover:text-gray-500 ease-linear transition cursor-pointer"
            />
          </button>
        </div>

        {/* FORM */}
        <div className="px-6 mt-4 space-y-5">
          <Input
            name="nome"
            required
            legend="DESCRIÇÃO"
            type="text"
            placeholder="Instalação de rede"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          
          <Input
            name="value"
            required
            legend="VALOR"
            type="number"
            placeholder="R$ 180,00"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />          
        </div>

        {/* BOTÃO SALVAR */}
        <div className="px-6 mt-6">
          <button
            type="submit"
            className="
              w-full bg-gray-900 text-white py-3 rounded-md
              font-medium text-sm hover:bg-gray-500 hover:text-gray-200 transition cursor-pointer
            "
          >
            Salvar
          </button>
        </div>
      </div>
    </form>
  );
}
