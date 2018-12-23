import React, { FunctionComponent } from "react";
import styled from "styled-components/macro";
import tw from "tailwind.macro";

const StyledCardHeader = styled.div`
  ${tw`px-6 py-4 border-b-2 border-blue border-solid text-xl`}
`;

const CardHeader: FunctionComponent = ({children}) => {
  return (
    <StyledCardHeader>
      {children}
    </StyledCardHeader>
  );
};

export default CardHeader;
