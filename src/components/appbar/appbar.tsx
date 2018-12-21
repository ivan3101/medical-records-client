import React from "react";
import styled from "styled-components/macro";
import tw from "tailwind.macro";
import Logo from "./logo/logo";

const AppbarContainer = styled.nav`
  ${tw`flex items-center flex-wrap bg-teal p-4 flex-wrap`}
`;

const Appbar = () => {
  return (
    <AppbarContainer>
      <Logo/>
    </AppbarContainer>
  );
};

export default Appbar;
