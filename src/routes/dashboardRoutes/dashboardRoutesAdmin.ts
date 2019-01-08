import patientsIcon from "../../assets/icons/patients.svg";
import personalIcon from "../../assets/icons/personal.svg";
import studentsIcon from "../../assets/icons/students.svg";
import Patients from "../../views/dashboard/components/patients/patients";
import Personal from "../../views/dashboard/components/personal/personal";
import Students from "../../views/dashboard/components/students/students";
import { IDashboardRoute } from "./types";

export const dashboardRoutesAdmin: IDashboardRoute[] = [
  {
    name: "Pacientes",
    icon: patientsIcon,
    url: "/dashboard/pacientes",
    component: Patients
  },
  {
    name: "Estudiantes",
    icon: studentsIcon,
    url: "/dashboard/estudiantes",
    component: Students
  },
  {
    name: "Personal",
    icon: personalIcon,
    url: "/dashboard/personal",
    component: Personal
  }
];
