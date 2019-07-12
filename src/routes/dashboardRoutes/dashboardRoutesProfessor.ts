import checklistIcon from "../../assets/icons/checklist.svg";
import ReviewRoutes from "./reviewRoutes/reviewRoutes";
import { IDashboardRoute } from "./types";

export const dashboardRoutesProfessor: IDashboardRoute[] = [
  {
    name: "Pendientes por revisar",
    icon: checklistIcon,
    url: "/dashboard/revision",
    component: ReviewRoutes
  }
];
