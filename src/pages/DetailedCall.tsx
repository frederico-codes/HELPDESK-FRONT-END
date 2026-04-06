import clockOpen from "../assets/icons/clock-open.svg";
import clock from "../assets/icons/clock.svg";
import circleCheckBig from "../assets/icons/circle-check-big.svg";
import trash from "../assets/icons/trash.svg";
import plus from "../assets/icons/plus.svg";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "../componentes/Sidebar";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { MyCallingsTechniciansDetailModalAdditionalService } from "../componentes/MyCallingsTechniciansDetailModalAdditionalService";

interface Call {
  id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "closed";
  createdAt: string;
  updatedAt: string;
  technician: {
    id: string;
    name: string;
    email: string;
  };
  customer: {
    id: string;
    name: string;
  };
  service: {
    id: string;
    name: string;
    basePrice: number;
  };
  additionalServices: {
    id: string;
    service: {
      id: string;
      name: string;
      basePrice: number;
    };
  }[];
}

export function DetailedCall() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [call, setCall] = useState<Call | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  async function loadCallById() {
    try {
      if (!id) return;

      setLoading(true);

      const response = await api.get<Call>(`/calls/${id}`);
      setCall(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message ?? "Erro ao buscar chamado.");
        return;
      }

      alert("Não foi possível carregar o chamado.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCallById();
  }, [id]);

  async function handleUpdateStatus(status: "in_progress" | "closed") {
    try {
      if (!id) return;

      setIsUpdatingStatus(true);

      await api.patch(`/calls/${id}/status`, { status });

      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message ?? "Erro ao atualizar status.");
        return;
      }

      alert("Não foi possível atualizar o status.");
    } finally {
      setIsUpdatingStatus(false);
    }
  }

  async function handleRemoveAdditionalService(additionalServiceId: string) {
    try {
      if (!id) return;

      await api.delete(`/calls/${id}/additional-services/${additionalServiceId}`);
      await loadCallById();
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message ?? "Erro ao remover serviço.");
        return;
      }

      alert("Não foi possível remover o serviço adicional.");
    }
  }

  if (loading) {
    return <div className="p-10">Carregando...</div>;
  }

  if (!call) {
    return <div className="p-10">Chamado não encontrado</div>;
  }

  const getStatusStyle = () => {
    switch (call.status) {
      case "open":
        return {
          label: "Aberto",
          class: "bg-red-100 text-red-700",
          icon: clockOpen,
        };
      case "in_progress":
        return {
          label: "Em atendimento",
          class: "bg-blue-100 text-blue-700",
          icon: clock,
        };
      case "closed":
        return {
          label: "Encerrado",
          class: "bg-green-100 text-green-700",
          icon: circleCheckBig,
        };
      default:
        return { label: call.status, class: "", icon: null };
    }
  };

  const status = getStatusStyle();

  const additionalTotal = call.additionalServices.reduce(
    (sum, item) => sum + item.service.basePrice,
    0
  );

  const totalPrice = call.service.basePrice + additionalTotal;

  const formattedBasePrice = `R$ ${call.service.basePrice
    .toFixed(2)
    .replace(".", ",")}`;

  const formattedAdditionalTotal = `R$ ${additionalTotal
    .toFixed(2)
    .replace(".", ",")}`;

  const formattedTotalPrice = `R$ ${totalPrice.toFixed(2).replace(".", ",")}`;

  return (
    <div className="w-screen h-screen xl:grid xl:grid-cols-[280px_1fr] bg-gray-100 xl:overflow-hidden">
      <Sidebar />

      <div
        className="w-full h-screen flex flex-col px-6 xl:px-6 gap-4 bg-white absolute xl:relative py-24 
        rounded-3xl xl:rounded-none xl:rounded-tl-2xl mt-28 xl:mt-4"
      >
        <div className="w-full px-8 xl:px-10 2xl:px-72">
          <div className="flex flex-col xl:ml-24 xl:w-[800px]">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-500"
            >
              ← Voltar
            </Link>

            <div className="flex flex-col xl:flex-row justify-between mb-8">
              <h1 className="text-2xl font-bold text-blue-dark">
                Chamado detalhado
              </h1>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={
                    isUpdatingStatus ||
                    call.status === "in_progress" ||
                    call.status === "closed"
                  }
                  onClick={() => handleUpdateStatus("in_progress")}
                  className="h-10 px-4 rounded-lg bg-gray-500 text-gray-700 text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <img src={clock} alt="" className="w-4 h-4" />
                  {isUpdatingStatus && call.status !== "in_progress"
                    ? "Salvando..."
                    : "Em atendimento"}
                </button>

                <button
                  type="button"
                  disabled={isUpdatingStatus || call.status === "closed"}
                  onClick={() => handleUpdateStatus("closed")}
                  className="h-10 px-4 rounded-lg bg-gray-500 text-gray-700 text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <img src={circleCheckBig} alt="" className="w-4 h-4" />
                  {isUpdatingStatus && call.status !== "closed"
                    ? "Salvando..."
                    : "Encerrado"}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[480px_300px] gap-8 mx-auto max-w-[900px] w-full">
            <div>
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-400">{call.id.slice(0, 5)}</p>
                  <span
                    className={`inline-flex items-center gap-2 text-sm px-4 py-1.5 rounded-full ${status.class}`}
                  >
                    {status.icon && <img src={status.icon} alt="" />}
                    {status.label}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  {call.title}
                </h2>

                <div className="mb-6">
                  <h3 className="text-xs text-gray-400">Descrição</h3>
                  <p className="text-sm mt-1">
                    {call.description || "Sem descrição informada"}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm text-gray-400">Categoria</h3>
                  <p className="text-sm text-gray-700 mt-1">
                    {call.service.name}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm text-gray-400">Criado em</h3>
                    <p className="text-sm text-gray-700 mt-1">
                      {new Date(call.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-400">Atualizado em</h3>
                    <p className="text-sm text-gray-700 mt-1">
                      {new Date(call.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm text-gray-400">Cliente</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs">
                      {call.customer.name.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-700">
                      {call.customer.name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 mt-8">
                <div className="flex justify-between items-center mb-4 border-b border-gray-500 pb-4">
                  <h3 className="text-sm text-gray-400">Serviços adicionais</h3>
                  <button
                    type="button"
                    onClick={() => {
                      if (call?.status === "closed") return;
                      setModalOpen(true);
                    }}
                    disabled={call?.status === "closed"}
                    className={`
                    w-9 h-9 rounded-md flex items-center justify-center
                      ${
                        call?.status === "closed"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gray-900 text-white hover:bg-gray-700"
                      }
                  `}
                  >
                    <img src={plus} alt="" />
                  </button>
                </div>

                {call.additionalServices.length === 0 ? (
                  <div className="py-4 text-sm text-gray-400">
                    Nenhum serviço adicional cadastrado.
                  </div>
                ) : (
                  <div className="divide-y divide-gray-500">
                    {call.additionalServices.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center py-3"
                      >
                        <div>
                          <p className="text-sm text-gray-800">
                            {item.service.name}
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-700">
                            R${" "}
                            {item.service.basePrice
                              .toFixed(2)
                              .replace(".", ",")}
                          </span>

                          <button
                            onClick={() =>
                             handleRemoveAdditionalService(item.id)
                            }
                            disabled={call.status === "closed"}
                            className={`
                              p-2 rounded-md
                              ${
                                call.status === "closed"
                                  ? "bg-gray-300 cursor-not-allowed"
                                  : "bg-gray-100 hover:bg-gray-200"
                              }
                            `}
                          >
                           <img src={trash} alt="Excluir" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-sm text-gray-400 mb-2">
                Técnico responsável
              </h3>

              <div className="flex items-center gap-3 mb-6">
                <span className="w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs">
                  {call.technician.name.slice(0, 2).toUpperCase()}
                </span>

                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {call.technician.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {call.technician.email}
                  </p>
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-700 mt-2">
                <span>Preço base</span>
                <span className="font-medium">{formattedBasePrice}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-700 mt-2">
                <span>Adicionais</span>
                <span className="font-medium">{formattedAdditionalTotal}</span>
              </div>

              <div className="flex justify-between text-sm font-semibold text-gray-900 border-t pt-4 mt-4">
                <span>Total</span>
                <span>{formattedTotalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MyCallingsTechniciansDetailModalAdditionalService
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdded={loadCallById}
      />
    </div>
  );
}