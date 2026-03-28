import { Route, Routes } from "react-router";
import { Calls } from "../pages/Calls";
import { Customers } from "../pages/Customers";
import { Services } from "../pages/Services";
import { Technicians } from "../pages/Technicians";
import { DetailedCall } from "../pages/DetailedCall"
import { DetailedTechnicians } from "../pages/DetailedTechnicians";
import { NotFound } from "../pages/NotFound";

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Calls />} />
      <Route path="/detailcalls" element={<DetailedCall />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/services" element={<Services />} />
      <Route path="/technicians" element={<Technicians />} />
      <Route path="/technicians/new" element={<DetailedTechnicians />} />
      <Route path="/technicians/:id/edit" element={<DetailedTechnicians />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
