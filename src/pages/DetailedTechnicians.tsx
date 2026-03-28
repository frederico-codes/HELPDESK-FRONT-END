import { useParams } from "react-router-dom";
import { TechnicianForm } from "../componentes/TechnicianForm";

export function DetailedTechnicians() {
  const { id } = useParams();

  return <TechnicianForm technicianId={id} />;
}