import React, { FunctionComponent } from "react";
import styled from "styled-components/macro";
import tw from "tailwind.macro";
import SubmitMessage from "../submitMessage";
import SubmitMessageType from "../submitMessageType";

const StyledSubmitError = styled(SubmitMessage)`
  ${tw`bg-red-lightest border-red-light text-red-dark`}
`;

const SubmitError: FunctionComponent = ({children}) => {
  return (
    <StyledSubmitError>
      <SubmitMessageType>
        Error
      </SubmitMessageType>

      {children}
    </StyledSubmitError>
  )
};

export default SubmitError;