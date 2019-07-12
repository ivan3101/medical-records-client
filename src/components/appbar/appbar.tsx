import React, { FunctionComponent } from "react";
import styled from "styled-components/macro";
import tw from "tailwind.macro";
import Logo from "./logo/logo";
import LogoutButton from "./logoutButton/logoutButton";

const AppbarContainer = styled.header`
  ${tw`flex items-center flex-wrap bg-white p-4 flex-wrap h-24 relative`}
`;

const Appbar: FunctionComponent = () => {
  return (
    <AppbarContainer>
      <Logo />
      <LogoutButton />
    </AppbarContainer>
  );
};

export default Appbar;
