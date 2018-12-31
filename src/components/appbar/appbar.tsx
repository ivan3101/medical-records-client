import React, { FunctionComponent } from "react";
import styled from "styled-components/macro";
import tw from "tailwind.macro";
import Logo from "./logo/logo";

const AppbarContainer = styled.nav`
  ${tw`flex items-center flex-wrap bg-white p-4 flex-wrap h-24`}
`;

const Appbar: FunctionComponent = () => {
  return (
    <AppbarContainer>
      <Logo />
    </AppbarContainer>
  );
};

export default Appbar;
