import React, { Component, ComponentProps } from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { IApplicationState } from "../../../store";
import { putRedirectUrl } from "../../../store/auth/actions";

export interface IEnsureUsersOnlyMapStateToProps {
  isAuthenticated: boolean;
  currentUrl: string;
}

export interface IEnsureUsersOnlyMapDispatchToProps {
  setRedirectUrl: (url: string) => void;
}

export type EnsureUsersOnlyType = IEnsureUsersOnlyMapStateToProps &
  IEnsureUsersOnlyMapDispatchToProps &
  RouteComponentProps &
  ComponentProps<any>;

class EnsureUsersOnly extends Component<EnsureUsersOnlyType> {
  componentDidMount(): void {
    const { currentUrl, isAuthenticated, history, setRedirectUrl } = this.props;

    if (!isAuthenticated && currentUrl.split("/")[1] !== "login") {
      setRedirectUrl(currentUrl);
      history.replace("/login");
    }
  }

  render() {
    return <div />;
  }
}

const mapStateToProps: MapStateToProps<
  IEnsureUsersOnlyMapStateToProps,
  RouteComponentProps,
  IApplicationState
> = (state, ownProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentUrl: ownProps.location.pathname
});

const mapDispatchToProps: MapDispatchToProps<
  IEnsureUsersOnlyMapDispatchToProps,
  RouteComponentProps
> = dispatch => ({
  setRedirectUrl: (url: string) => dispatch(putRedirectUrl(url))
});

export default withRouter(
  connect<
    IEnsureUsersOnlyMapStateToProps,
    IEnsureUsersOnlyMapDispatchToProps,
    RouteComponentProps,
    IApplicationState
  >(
    mapStateToProps,
    mapDispatchToProps
  )(EnsureUsersOnly)
);
