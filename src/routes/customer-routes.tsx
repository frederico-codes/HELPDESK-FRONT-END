import { Route, Routes } from "react-router";
import { MyCallingsCustomers } from "../pages/MyCallingsCustomers";
import { MyNewCallingCustomer } from "../pages/MyNewCallingCustomer";
import { MyCallingsCustomersDetail } from "../pages/MyCallingsCustomersDetail"
import { NotFound } from "../pages/NotFound";


export function CustomerRoutes(){
  return(
    <Routes>
        <Route path="/" element={<MyCallingsCustomers/>}/>
        <Route path="/chamados/novo" element={<MyNewCallingCustomer/>}/>
        <Route path="/chamados/:id" element={<MyCallingsCustomersDetail/>} />
        <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}