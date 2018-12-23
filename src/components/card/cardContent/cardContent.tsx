import React, { FunctionComponent } from "react";
import styled from "styled-components/macro";
import tw from "tailwind.macro";

const StyledCardContent = styled.div`
  ${tw`px-6 py-3`}
`;

const CardContent: FunctionComponent = ({children}) => {
  return (
    <StyledCardContent>
      {children}
    </StyledCardContent>
  );
};

export default CardContent;
