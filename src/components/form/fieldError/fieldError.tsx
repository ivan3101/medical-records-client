import { ErrorMessage, ErrorMessageProps } from "formik";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import tw from "tailwind.macro";

const StyledFieldError = styled.div`
  ${tw`text-red-dark text-sm font-medium block`};
`;

const FieldError: FunctionComponent<ErrorMessageProps> = ({name}) => {
  return (
    <ErrorMessage component={StyledFieldError} name={name}/>
  )
};

export default FieldError;