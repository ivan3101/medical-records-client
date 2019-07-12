import React, { FunctionComponent } from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import styled from "styled-components/macro";
import tw from "tailwind.macro";
import { putLogout } from "../../../store/auth/actions";
import Button from "../../button/button";
import { IApplicationState } from "../../../store";

export interface ILogoutButtonMapStateToProps {
  isAuthenticated: boolean;
}

export interface ILogoutButtonMapDispatchToProps {
  logout: () => void;
}

const ButtonContainer = styled(Button)`
  ${tw`ml-auto border-2 border-red-light bg-white text-red-light hover:bg-red-light hover:text-white`};
`;

const LogoutButton: FunctionComponent<
  ILogoutButtonMapDispatchToProps & ILogoutButtonMapStateToProps
> = ({ logout, isAuthenticated }) => {
  if (isAuthenticated) {
    return <ButtonContainer onClick={logout}>Cerrar Sesión</ButtonContainer>;
  } else {
    return null;
  }
};

const mapStateToProps: MapStateToProps<
  ILogoutButtonMapStateToProps,
  {},
  IApplicationState
> = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps: MapDispatchToProps<
  ILogoutButtonMapDispatchToProps,
  {}
> = dispatch => ({
  logout: () => dispatch(putLogout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutButton);
