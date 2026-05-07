import { Navigate, Route, Routes } from "react-router";
import { MyCallingsTechnicians } from "../pages/MyCallingsTechnicians";
import {MyCallingsTechniciansDetail} from "../pages/MyCallingsTechniciansDetail"
import { DetailedCall } from "../pages/DetailedCall";

export function TechniciansRoutes() {
  return (
    <Routes>     
      <Route path="/" element={<MyCallingsTechnicians />} />
      <Route path="/mycallingstecdetail" element={<MyCallingsTechniciansDetail />} />
      <Route path="/detailcalls/:id" element={<DetailedCall />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
