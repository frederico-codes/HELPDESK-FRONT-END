import { X } from "lucide-react";
import { Input } from "./Input";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { AxiosError } from "axios";



interface CustomerModalProps {
  open: boolean;
  onClose: () => void;
customer: {
  id: string;
  initials: string;
  name: string;
  email: string;
};
}

export function EditCustomerModal({
  open,
  onClose,
  customer,
}: CustomerModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (open) {
      setName(customer.name || "");
      setEmail(customer.email || "");
    }
  }, [open, customer]);

 async function onSubmit(e: React.FormEvent) {
  e.preventDefault();

  try {
    await api.put(`/clients/${customer.id}`, {
      name,
      email,
    });

    alert("Cliente atualizado com sucesso.");
    onClose();

    // opcional: recarregar lista (ideal é via props)
    window.location.reload();

  } catch (error) {
    if (error instanceof AxiosError) {
      alert(error.response?.data?.message ?? "Erro ao atualizar cliente.");
      return;
    }

    alert("Não foi possível atualizar o cliente.");
  }
}

  if (!open) return null;

  return (
    <form
      onSubmit={onSubmit}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
    >
      <div className="bg-white rounded-2xl w-full max-w-md shadow-lg animate-fade">
       
        <div className="flex justify-between items-center px-6 py-4 border-b border-b-gray-500">
          <h2 className="text-base text-gray-700">Cliente</h2>

          <button type="button" onClick={onClose} className="text-gray-400 hover:text-black">
            <X size={20} />
          </button>
        </div>

       
        <div className="px-6 py-6 flex flex-col gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center text-lg font-medium">
              {customer.initials}
            </div>
          </div>

         
          <Input
            name="nome"
            required
            legend="Nome"
            type="text"
            placeholder="Nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          
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

        
        <div className="px-6 py-4 border-t border-t-gray-500">
          <button
            type="submit"
            className="w-full bg-gray-900 text-sm text-gray-600 py-2.5 rounded-md hover:bg-gray-800 cursor-pointer"
          >
            Salvar
          </button>
        </div>
      </div>
    </form>
  );
}
