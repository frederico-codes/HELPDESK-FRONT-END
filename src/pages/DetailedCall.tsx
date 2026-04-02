import clockOpen from "../assets/icons/clock-open.svg";
import clock from "../assets/icons/clock.svg";
import { Link, useParams } from "react-router-dom";
import { Sidebar } from "../componentes/Sidebar";
import { useEffect, useState } from "react";
import { api } from "../services/api";

interface Call {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  technician: {
    name: string;
    email: string;
  };
  customer: {
    name: string;
  };
  service: {
    name: string;
    basePrice: number;
  };
}

export function DetailedCall() {
  const { id } = useParams();
  const [call, setCall] = useState<Call | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCall() {
      try {
       const response = await api.get(`/calls/${id}`);
       setCall(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchCall();
    }
  }, [id]);

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
          icon: null,
        };
      default:
        return { label: call.status, class: "", icon: null };
    }
  };

  const status = getStatusStyle();

  return (
    <div className="w-screen h-screen xl:grid xl:grid-cols-[280px_1fr] bg-gray-100 xl:overflow-hidden">
      <Sidebar />

      <div className="w-full h-screen flex flex-col bg-white xl:rounded-tl-2xl py-24">
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

              <span
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm ${status.class}`}
              >
                {status.icon && <img src={status.icon} alt="" />}
                {status.label}
              </span>
            </div>
          </div>

          {/* CONTEÚDO */}
          <div className="grid grid-cols-1 xl:grid-cols-[480px_300px] gap-8 mx-auto max-w-[900px] w-full">
            {/* ESQUERDA */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex justify-between">
                <p className="text-sm text-gray-400">
                  {call.id.slice(0, 5)}
                </p>

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

              {/* Descrição */}
              <div className="mb-6">
                <h3 className="text-xs text-gray-400">Descrição</h3>
                <p className="text-sm  mt-1">
                  {call.description}
                </p>
              </div>

              {/* Serviço */}
              <div className="mb-6">
                <h3 className="text-sm text-gray-400">Categoria</h3>
                <p className="text-sm text-gray-700 mt-1">
                  {call.service.name}
                </p>
              </div>

              {/* Datas */}
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

              {/* Cliente */}
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

            {/* DIREITA */}
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

              {/* VALOR */}
              <div className="flex justify-between text-sm text-gray-700 mt-2">
                <span>Preço base</span>
                <span className="font-medium">
                  R$ {call.service.basePrice.toFixed(2)}
                </span>
              </div>

              {/* TOTAL */}
              <div className="flex justify-between text-sm font-semibold text-gray-900 border-t pt-4 mt-4">
                <span>Total</span>
                <span>
                  R$ {call.service.basePrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}