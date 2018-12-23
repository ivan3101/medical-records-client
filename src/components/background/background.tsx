import React, { FunctionComponent } from "react";
import styled from "styled-components/macro";
import tw from "tailwind.macro";

export interface IBackground {
  children?: JSX.Element[] | JSX.Element
}

const StyledBackground = styled.main`
  ${tw`bg-black w-full p-6 md:p-12`};
  
  height: calc(100vh - 6rem);
`;

const Background: FunctionComponent<IBackground> = ({ children }) => {
  return (
    <StyledBackground>
      { children }
    </StyledBackground>
  );
};

export default Background;
