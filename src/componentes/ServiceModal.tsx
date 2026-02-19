export type ServiceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  mode: "create" | "edit";
  data?: { title: string; value: number } | undefined;
};


export function ServiceModal({ isOpen, onClose, onSubmit, mode, data }: ServiceModalProps) {
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
            <label className="text-xxs font-bold text-gray-300 uppercase">
              Título
            </label>

            <input
              name="title"
              defaultValue={data?.title || ""}
              className="border-b border-gray-500 focus:border-blue-500 outline-none py-2"
              placeholder="Nome do serviço"
              required
            />
          </div>

          {/* Campo Valor */}
          <div className="flex flex-col gap-2">
            <label className="text-xxs font-bold text-gray-300 uppercase">
              Valor
            </label>

            <div className="flex items-center gap-2 border-b border-gray-500 py-2">
              <span className="text-gray-300 ">R$</span>
              <input
                name="value"
                type="number"
                step="0.01"
                defaultValue={data?.value || ""}
                placeholder="0,00"
                className="w-full outline-none"
                required
              />
            </div>
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
