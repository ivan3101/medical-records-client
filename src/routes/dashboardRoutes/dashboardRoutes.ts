import { dashboardRoutesAdmin } from "./dashboardRoutesAdmin";
import { dashboardRoutesArchive } from "./dashboardRoutesArchive";
import { dashboardRoutesProfessor } from "./dashboardRoutesProfessor";
import { dashboardRoutesStudent } from "./dashboardRoutesStudent";

export const dashboardRoutes = {
  admin: dashboardRoutesAdmin,
  estudiante: dashboardRoutesStudent,
  profesor: dashboardRoutesProfessor,
  archivo: dashboardRoutesArchive
};
