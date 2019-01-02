import React, { Component, ComponentProps } from "react";
import { connect, MapStateToProps } from "react-redux";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router";
import DashboardLayout from "../../components/dashboardLayout/dashboardLayout";
import Sidebar from "../../components/sidebar/sidebar";
import SidebarItem from "../../components/sidebar/sidebarItem/sidebarItem";
import Icon from "../../components/sidebar/sidebarItem/sidebarLink/icon/icon";
import { IDashboardRoute } from "../../routes/dashboardRoutes/types";
import { IApplicationState } from "../../store";
import { dashboardRoutesSelector } from "../../store/auth/selectors";

export interface IDashboardMapStateToProps {
  routes: IDashboardRoute[];
}

export type IDashboardType = IDashboardMapStateToProps &
  RouteComponentProps &
  ComponentProps<any>;

class Dashboard extends Component<IDashboardType> {
  render() {
    const { routes } = this.props;

    return (
      <React.Fragment>
        <Sidebar>
          {!!routes.length &&
            routes.map((route: IDashboardRoute) => (
              <SidebarItem to={route.url} key={route.name}>
                <Icon src={route.icon} />
                {route.name}
              </SidebarItem>
            ))}
        </Sidebar>

        <DashboardLayout>
          <Switch>
            {!!routes.length &&
              routes.map((route: IDashboardRoute) => (
                <Route
                  path={route.url}
                  component={route.component}
                  key={route.url}
                />
              ))}

            {!!routes.length && <Redirect to={routes[0].url} />}
          </Switch>
        </DashboardLayout>
      </React.Fragment>
    );
  }
}

const mapStateToProps: MapStateToProps<
  IDashboardMapStateToProps,
  RouteComponentProps,
  IApplicationState
> = state => ({
  routes: dashboardRoutesSelector(state)
});

export default connect(mapStateToProps)(Dashboard);
