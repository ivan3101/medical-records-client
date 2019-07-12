import patientsIcon from "../../assets/icons/patients.svg";
import uploadIcon from "../../assets/icons/upload.svg";
import OnholdsByStudent from "../../views/dashboard/onhold/onholdsByStudent/onholdsByStudent";
import PatientRoutesStudent from "./patientRoutesStudent/patientRoutesStudent";
import { IDashboardRoute } from "./types";

export const dashboardRoutesStudent: IDashboardRoute[] = [
  {
    name: "Paciente",
    icon: patientsIcon,
    url: "/dashboard/pacientes",
    component: PatientRoutesStudent
  },
  {
    name: "Mis Subidas",
    icon: uploadIcon,
    url: "/dashboard/mis-subidas",
    component: OnholdsByStudent
  }
];
