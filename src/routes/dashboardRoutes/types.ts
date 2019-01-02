import React from "react";
import { RouteComponentProps } from "react-router";

export interface IDashboardRoute {
  name: string;
  icon: string;
  url: string;
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}
