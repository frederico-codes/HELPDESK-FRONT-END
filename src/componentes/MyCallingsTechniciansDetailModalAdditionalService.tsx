import { X } from "phosphor-react";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { Select } from "../componentes/Select";
import { api } from "../services/api";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdded: () => Promise<void> | void;
}

type Service = {
  id: string;
  name: string;
  basePrice: number;
  active: boolean;
};

export function MyCallingsTechniciansDetailModalAdditionalService({
  open,
  onClose,
  onAdded,
}: Props) {
  const { id } = useParams();
  const [serviceId, setServiceId] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadServices() {
      try {
        if (!open) return;

        setIsLoadingServices(true);

        const response = await api.get<Service[]>("/services");
        setServices(response.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          alert(error.response?.data?.message ?? "Erro ao buscar serviços.");
          return;
        }

        alert("Não foi possível carregar os serviços.");
      } finally {
        setIsLoadingServices(false);
      }
    }

    loadServices();
  }, [open]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (!id) return;

      if (!serviceId) {
        alert("Selecione um serviço.");
        return;
      }

      setIsSubmitting(true);

      await api.post(`/calls/${id}/additional-services`, {
        serviceId,
      });

      alert("Serviço adicional adicionado com sucesso.");
      setServiceId("");
      await onAdded();
      onClose();
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(
          error.response?.data?.message ??
            "Não foi possível adicionar o serviço adicional."
        );
        return;
      }

      alert("Não foi possível adicionar o serviço adicional.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClose() {
    setServiceId("");
    onClose();
  }

  if (!open) return null;

  return (
    <form
      onSubmit={onSubmit}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-[440px] pt-5 pb-6 shadow-lg animate-fade"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 border-b border-gray-500 pb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Serviço adicional
          </h2>

          <button type="button" onClick={handleClose}>
            <X
              size={22}
              className="text-gray-700 hover:text-gray-500 ease-linear transition cursor-pointer"
            />
          </button>
        </div>

        <div className="px-6 mt-4 space-y-5">
          <Select
            required
            legend="SERVIÇO"
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            disabled={isLoadingServices}
          >
            <option value="" disabled hidden>
              {isLoadingServices
                ? "Carregando serviços..."
                : "Selecione um serviço"}
            </option>

            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} — R$ {service.basePrice.toFixed(2).replace(".", ",")}
              </option>
            ))}
          </Select>
        </div>

        <div className="px-6 mt-6">
          <button
            type="submit"
            disabled={isSubmitting || isLoadingServices}
            className="w-full bg-gray-900 text-white py-3 rounded-md font-medium text-sm hover:bg-gray-500 hover:text-gray-200 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </form>
  );
}