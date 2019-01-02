import { createSelector, OutputSelector, Selector } from "reselect";
import { dashboardRoutes } from "../../routes/dashboardRoutes/dashboardRoutes";
import { IDashboardRoute } from "../../routes/dashboardRoutes/types";
import { IApplicationState } from "../index";
import { UserRole } from "./types";

const roleSelector: Selector<IApplicationState, UserRole | undefined> = state =>
  state.auth.role;

export const dashboardRoutesSelector: OutputSelector<
  IApplicationState,
  IDashboardRoute[],
  (role: UserRole | undefined) => IDashboardRoute[]
> = createSelector<IApplicationState, UserRole | undefined, IDashboardRoute[]>(
  roleSelector,
  role => {
    if (role === UserRole.PROFESSOR) return dashboardRoutes.profesor;
    else if (role === UserRole.STUDENT) return dashboardRoutes.estudiante;
    else if (role === UserRole.ADMIN) return dashboardRoutes.admin;
    else if (role === UserRole.ARCHIVE) return dashboardRoutes.archivo;
    else return [];
  }
);
