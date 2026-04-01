import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { api } from "../services/api";
import { ServiceModal } from "../componentes/ServiceModal";
import { Sidebar } from "../componentes/Sidebar";
import plus from "../assets/icons/plus.svg";
import pen from "../assets/icons/pen-line.svg";

type Service = {
  id: string;
  name: string;
  basePrice: number;
  active: boolean;
};

type ServiceModalData = {
  title: string;
  value: number;
};

export function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  async function loadServices() {
    try {
      const response = await api.get("/services");
      setServices(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  function handleOpenCreateModal() {
    setModalMode("create");
    setSelectedService(null);
    setIsModalOpen(true);
  }

  function handleOpenEditModal(service: Service) {
    setModalMode("edit");
    setSelectedService(service);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedService(null);
    setModalMode("create");
  }

  async function handleCreateService(data: ServiceModalData) {
    try {
      await api.post("/services", data);
      await loadServices();
      handleCloseModal();
      alert("Serviço criado com sucesso.");
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message ?? "Erro ao criar serviço.");
        return;
      }

      alert("Não foi possível criar o serviço.");
    }
  }

  async function handleEditService(data: ServiceModalData) {
    if (!selectedService) return;

    try {
      await api.put(`/services/${selectedService.id}`, data);
      await loadServices();
      handleCloseModal();
      alert("Serviço atualizado com sucesso.");
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message ?? "Erro ao editar serviço.");
        return;
      }

      alert("Não foi possível editar o serviço.");
    }
  }

  async function handleSubmitService(data: ServiceModalData) {
    if (modalMode === "edit") {
      await handleEditService(data);
      return;
    }

    await handleCreateService(data);
  }

  async function handleDeactivateService(id: string) {
    try {
      await api.patch(`/services/${id}/deactivate`);
      await loadServices();
      alert("Serviço desativado com sucesso.");
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message ?? "Erro ao desativar serviço.");
        return;
      }

      alert("Não foi possível desativar o serviço.");
    }
  }

  return (
    <div className="w-screen h-screen xl:grid xl:grid-cols-[280px_1fr] bg-gray-100 xl:overflow-hidden">
      <Sidebar />

      <div
        className="w-full h-screen flex flex-col px-6 xl:px-6 gap-4 bg-white absolute xl:relative py-24 
        rounded-3xl xl:rounded-none xl:rounded-tl-2xl mt-28 xl:mt-4"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Serviços</h1>

          <button
            onClick={handleOpenCreateModal}
            className="flex justify-center items-center gap-2 bg-gray-800 px-3 py-2 rounded-sm hover:bg-gray-300 cursor-pointer transition ease-linear"
          >
            <img src={plus} alt="" className="w-4 h-4" />
            <span className="text-gray-600 text-sm hidden xl:block">Novo</span>
          </button>
        </div>

        <div className="w-full h-full bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="border-b border-gray-500">
              <tr className="text-sm text-gray-400">
                <th className="py-4 px-6 font-medium">Título</th>
                <th className="py-4 px-6 font-medium">Valor</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium"></th>
                <th className="py-4 px-6 font-medium"></th>
              </tr>
            </thead>

            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-b last:border-none">
                  <td className="py-4 px-6 font-bold text-sm text-gray-800">
                    {service.name}
                  </td>

                  <td className="py-4 px-6 text-sm text-gray-400">
                    R$ {service.basePrice}
                  </td>

                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        service.active
                          ? "bg-green-100 text-green-700"
                          : "bg-pink-100 text-pink-600"
                      }`}
                    >
                      {service.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleDeactivateService(service.id)}
                      className="text-sm text-gray-800 hover:text-gray-500 transition ease-linear cursor-pointer"
                    >
                      ⦸ Desativar
                    </button>
                  </td>

                  <td className="py-4 px-6">
                    <div className="h-9 w-9 bg-gray-500 hover:bg-gray-600 flex justify-center items-center rounded-sm cursor-pointer transition ease-linear">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(service)}
                      >
                        <img src={pen} alt="Editar serviço" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {services.length === 0 && (
            <div className="px-6 py-8 text-sm text-gray-400">
              Nenhum serviço encontrado.
            </div>
          )}
        </div>
      </div>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitService}
        mode={modalMode}
        data={
          selectedService
            ? {
                title: selectedService.name,
                value: selectedService.basePrice,
              }
            : undefined
        }
      />
    </div>
  );
}