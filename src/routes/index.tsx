import { BrowserRouter } from "react-router";
import { AuthRoutes } from "./auth-routes";
import { AdminRoutes } from "./admin-routes";
import { CustomerRoutes } from "./customer-routes";
import { TechniciansRoutes } from "./technicians-routes";
import { useAuth } from "../hooks/useAuth";

export function Routes() {
  const { session, isLoading } = useAuth();

  function Route() {
    switch (session?.user.role) {
      case "customer":
        return <CustomerRoutes />;
      case "manager":
        return <AdminRoutes />;
      case "technical":
        return <TechniciansRoutes />;
      default:
        return <AuthRoutes />;
    }
  }

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}