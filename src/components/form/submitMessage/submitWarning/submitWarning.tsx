import React, { FunctionComponent } from "react";
import styled from "styled-components/macro";
import tw from "tailwind.macro";
import SubmitMessage from "../submitMessage";
import SubmitMessageType from "../submitMessageType";

const StyledSubmitWarning = styled(SubmitMessage)`
    ${tw`bg-yellow-lightest border-yellow-light text-yellow-dark`}
`;

const SubmitWarning: FunctionComponent = ({children}) => {
  return (
    <StyledSubmitWarning>
      <SubmitMessageType>
        Advertencia
      </SubmitMessageType>

      {children}
    </StyledSubmitWarning>
  )
};

export default SubmitWarning;