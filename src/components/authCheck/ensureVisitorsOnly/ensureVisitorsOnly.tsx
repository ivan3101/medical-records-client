import React, { Component, ComponentProps } from "react";
import { connect, MapStateToProps } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { IApplicationState } from "../../../store";

export interface IEnsureVisitorsOnlyMapStateToProps {
  isAuthenticated: boolean;
  currentUrl: string;
}

export type EnsureVisitorsOnlyType = IEnsureVisitorsOnlyMapStateToProps &
  RouteComponentProps &
  ComponentProps<any>;

class EnsureVisitorsOnly extends Component<EnsureVisitorsOnlyType> {
  componentDidMount(): void {
    const { isAuthenticated, currentUrl, history } = this.props;

    if (isAuthenticated && currentUrl.split("/")[1] !== "dashboard") {
      history.replace("/dashboard");
    }
  }

  render() {
    const { isAuthenticated, children } = this.props;

    return isAuthenticated ? null : children;
  }
}

const mapStateToProps: MapStateToProps<
  IEnsureVisitorsOnlyMapStateToProps,
  RouteComponentProps,
  IApplicationState
> = (state, ownProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentUrl: ownProps.location.pathname
});

export default withRouter(
  connect<
    IEnsureVisitorsOnlyMapStateToProps,
    {},
    RouteComponentProps,
    IApplicationState
  >(mapStateToProps)(EnsureVisitorsOnly)
);
