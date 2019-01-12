import patientsIcon from "../../assets/icons/patients.svg";
import personalIcon from "../../assets/icons/personal.svg";
import studentsIcon from "../../assets/icons/students.svg";
import Personal from "../../views/dashboard/personal/personal";
import PatientRoutes from "./patientRoutes/patientRoutes";
import StudentRoutes from "./studentRoutes/studentRoutes";
import { IDashboardRoute } from "./types";

export const dashboardRoutesAdmin: IDashboardRoute[] = [
  {
    name: "Pacientes",
    icon: patientsIcon,
    url: "/dashboard/pacientes",
    component: PatientRoutes
  },
  {
    name: "Estudiantes",
    icon: studentsIcon,
    url: "/dashboard/estudiantes",
    component: StudentRoutes
  },
  {
    name: "Personal",
    icon: personalIcon,
    url: "/dashboard/personal",
    component: Personal
  }
];
