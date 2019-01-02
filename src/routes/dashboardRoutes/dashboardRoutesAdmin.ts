import patientsIcon from "../../assets/icons/patients.svg";
import personalIcon from "../../assets/icons/personal.svg";
import studentsIcon from "../../assets/icons/students.svg";
import { IDashboardRoute } from "./types";

export const dashboardRoutesAdmin: IDashboardRoute[] = [
  {
    name: "Pacientes",
    icon: patientsIcon,
    url: "/dashboard/pacientes",
    component: null
  },
  {
    name: "Estudiantes",
    icon: studentsIcon,
    url: "/dashboard/estudiantes",
    component: null
  },
  {
    name: "Personal",
    icon: personalIcon,
    url: "/dashboard/personal",
    component: null
  }
];
