import React, { Component, ComponentProps } from "react";
import { connect, MapStateToProps } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { IApplicationState } from "../../store";

export interface IAuthCheckMapStateToProps {
  isAuthenticated: boolean;
  redirectUrl: string;
}

export type AuthCheckPropsType = IAuthCheckMapStateToProps &
  RouteComponentProps<{}> &
  ComponentProps<any>;

class AuthCheck extends Component<AuthCheckPropsType> {
  componentDidUpdate(prevProps: Readonly<IAuthCheckMapStateToProps>): void {
    const isLoggingIn =
      !prevProps.isAuthenticated && this.props.isAuthenticated;
    const isLoggingOut =
      prevProps.isAuthenticated && !this.props.isAuthenticated;

    if (isLoggingIn) {
      if (this.props.redirectUrl.split("/")[1] === "dashboard") {
        this.props.history.replace(this.props.redirectUrl);
      } else {
        this.props.history.push("/dashboard");
      }
    } else if (isLoggingOut) {
      this.props.history.push("/login");
    }
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

const mapStateToProps: MapStateToProps<
  IAuthCheckMapStateToProps,
  RouteComponentProps<{}>,
  IApplicationState
> = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  redirectUrl: state.auth.redirectUrl
});

export default withRouter(
  connect<
    IAuthCheckMapStateToProps,
    {},
    RouteComponentProps<{}>,
    IApplicationState
  >(mapStateToProps)(AuthCheck)
);
