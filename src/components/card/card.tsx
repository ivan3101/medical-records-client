import React, { FunctionComponent } from "react";
import styled from "styled-components/macro";
import tw from "tailwind.macro";

const StyledCard = styled.div`
  ${tw`rounded h-auto bg-white w-auto max-w-sm h-auto`}
`;

const Card: FunctionComponent = ({children}) => {
  return (
    <StyledCard>
      { children }
    </StyledCard>
  );
};

export default Card;
