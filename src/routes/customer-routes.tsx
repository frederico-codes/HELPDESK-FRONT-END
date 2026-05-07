import { Navigate, Route, Routes } from "react-router";
import { MyCallingsCustomers } from "../pages/MyCallingsCustomers";
import { CallForm } from "../componentes/CallForm";
import { MyCallingsCustomersDetail } from "../pages/MyCallingsCustomersDetail";


export function CustomerRoutes(){
  return(
    <Routes>
        <Route path="/" element={<MyCallingsCustomers/>}/>
        <Route path="/chamados/:id" element={<MyCallingsCustomersDetail/>}/>
        <Route path="/chamados/novo" element={<CallForm/>}/>
        <Route path="/chamados/:id/edit" element={<CallForm />} />


        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}