import React, { FunctionComponent } from "react";
import styled from "styled-components/macro";
import tw from "tailwind.macro";
import SubmitMessage from "../submitMessage";
import SubmitMessageType from "../submitMessageType";

const StyledSubmitSuccess = styled(SubmitMessage)`
  ${tw`bg-green-lightest border-green-light text-green-dark`}
`;

const SubmitSuccess: FunctionComponent = ({ children }) => {
  return (
    <StyledSubmitSuccess>
      <SubmitMessageType>Exito</SubmitMessageType>

      {" " + children}
    </StyledSubmitSuccess>
  );
};

export default SubmitSuccess;
