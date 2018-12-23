import React, { FunctionComponent } from "react";
import styled from "styled-components";
import tw from "tailwind.macro";

export interface IBackground {
  children?: JSX.Element[] | JSX.Element
}

const StyledBackground = styled.main`
  ${tw`bg-black w-full p-8`};
  
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
