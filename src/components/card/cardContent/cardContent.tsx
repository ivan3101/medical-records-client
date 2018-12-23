import React, { FunctionComponent } from "react";
import styled from "styled-components";
import tw from "tailwind.macro";

export interface ICardContent {
  children: JSX.Element[] | JSX.Element | string;
}

const StyledCardContent = styled.div`
  ${tw`px-6 py-3`}
`;

const CardContent: FunctionComponent<ICardContent> = ({children}) => {
  return (
    <StyledCardContent>
      {children}
    </StyledCardContent>
  );
};

export default CardContent;
