import menu from "../assets/icons/Menu.png";
import LogoIconLight from "../assets/Logo_IconLight.png";
import avatar from "../assets/Avatar.svg";
import pen from "../assets/icons/pen-line.svg";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { EditCustomerModal } from "../componentes/EditCustomerModal";
import { DeleteCustomerModal } from "../componentes/DeleteCustomerModal";
import { Trash2 } from "lucide-react";
import { Sidebar } from "../componentes/Sidebar";
import { api } from "../services/api";
import { Tooltip } from "react-tooltip";

type Customer = {
  id: string;
  name: string;
  email: string;
  role: "customer";
};

function getInitials(name: string) {
  const parts = name.trim().split(" ").filter(Boolean);

  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0][0].toUpperCase();

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function Customers() {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  async function loadCustomers() {
    try {
      setIsLoading(true);

      const response = await api.get("/clients");
      setCustomers(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message ?? "Erro ao buscar clientes.");
        return;
      }

      alert("Não foi possível carregar os clientes.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  async function handleDeleteCustomer() {
    if (!selectedCustomer) return;

    try {
      await api.delete(`/clients/${selectedCustomer.id}`);
      await loadCustomers();
      setDeleteModalOpen(false);
      setSelectedCustomer(null);
      alert("Cliente excluído com sucesso.");
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message ?? "Erro ao excluir cliente.");
        return;
      }

      alert("Não foi possível excluir o cliente.");
    }
  }

  return (
    <div className="w-screen h-screen xl:grid xl:grid-cols-[280px_1fr] relative bg-gray-100 xl:overflow-hidden">
      <Sidebar />

      <section className="block xl:hidden w-screen h-screen absolute top-0">
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-3.5 absolute top-7 left-6">
            <img src={menu} alt="menu" />

            <div className="flex justify-center gap-4">
              <img
                src={LogoIconLight}
                alt="LogoIconLight"
                className="h-11 w-11"
              />
              <div>
                <h1 className="text-xl text-gray-600">HelpDesk</h1>
                <span className="text-xxs text-blue-light">Admin</span>
              </div>
            </div>
          </div>

          <div>
            <img
              src={avatar}
              alt="avatar"
              className="absolute top-8 right-10"
            />
          </div>
        </div>
      </section>

      <div className="w-full h-screen flex flex-col px-6 xl:px-16 gap-4 bg-white absolute xl:relative py-24 rounded-3xl xl:rounded-none xl:rounded-tl-2xl mt-28 xl:mt-4">
        <h1 className="text-2xl font-bold">Clientes</h1>

        <div className="w-full bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="border-b border-gray-500">
              <tr className="text-sm text-gray-400">
                <th className="py-4 xl:px-2 font-medium">Nome</th>
                <th className="py-4 xl:px-2 font-medium">E-mail</th>
                <th className="py-4 px-2 font-medium"></th>
                <th className="py-4 px-2 font-medium"></th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-500 last:border-none">
                  <td className="py-4 xl:px-2 text-sm">
                    <div className="flex items-center gap-2 truncate max-w-[120px] xl:max-w-none">
                      <span className="w-7 h-7 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center">
                        {getInitials(customer.name)}
                      </span>

                      <span className="font-bold truncate xl:overflow-visible xl:whitespace-normal">
                        {customer.name}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 xl:px-2">
                    <div className="text-sm text-gray-400 truncate max-w-[120px] xl:truncate-none xl:max-w-full">
                      {customer.email}
                    </div>
                  </td>

                  <td className="py-4 px-1 w-4">
                    <div className="h-9 w-9 bg-gray-500 hover:bg-gray-600 flex justify-center items-center rounded-sm transition ease-linear cursor-pointer">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setDeleteModalOpen(true);
                        }}
                        className="rounded-lg cursor-pointer"
                        data-tooltip-id="tooltip-info"
                        data-tooltip-content="Excluir cliente"
                      >
                        <Trash2 size={15} />
                        <Tooltip id="tooltip-info" />
                      </button>
                    </div>
                  </td>

                  <td className="py-4 px-1 w-4">
                    <div className="h-9 w-9 bg-gray-500 hover:bg-gray-600 flex justify-center items-center rounded-sm cursor-pointer transition ease-linear ">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setModalOpen(true);
                        }}
                        className="rounded-lg"
                        data-tooltip-id="tooltip-info"
                        data-tooltip-content="Editar cliente"
                      >
                        <img
                          src={pen}
                          alt="Editar cliente"
                          className="cursor-pointer"
                        />
                        <Tooltip id="tooltip-info" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!isLoading && customers.length === 0 && (
            <div className="px-6 py-8 text-sm text-gray-400">
              Nenhum cliente encontrado.
            </div>
          )}

          {isLoading && (
            <div className="px-6 py-8 text-sm text-gray-400">
              Carregando clientes...
            </div>
          )}
        </div>
      </div>

      <DeleteCustomerModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedCustomer(null);
        }}
        customer={
          selectedCustomer ? { name: selectedCustomer.name } : { name: "" }
        }
        onConfirm={handleDeleteCustomer}
      />

      <EditCustomerModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedCustomer(null);
        }}
        customer={
          selectedCustomer
            ? {
                id: selectedCustomer.id,
                initials: getInitials(selectedCustomer.name),
                name: selectedCustomer.name,
                email: selectedCustomer.email,
              }
            : {
                id: "",
                initials: "",
                name: "",
                email: "",
              }
        }
      />
    </div>
  );
}
