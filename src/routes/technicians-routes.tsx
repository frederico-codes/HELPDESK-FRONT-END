import { Routes, Route } from "react-router-dom";
import { MyCallingsTechnicians } from "../pages/MyCallingsTechnicians";
import {MyCallingsTechniciansDetail} from "../pages/MyCallingsTechniciansDetail"
import { NotFound } from "../pages/NotFound";
import { DetailedCall } from "../pages/DetailedCall";

export function TechniciansRoutes() {
  return (
    <Routes>     
      <Route path="/" element={<MyCallingsTechnicians />} />
      <Route path="/mycallingstecdetail" element={<MyCallingsTechniciansDetail />} />
      <Route path="/detailcalls/:id" element={<DetailedCall />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
