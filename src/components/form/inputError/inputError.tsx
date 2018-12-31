import { ErrorMessage, ErrorMessageProps } from "formik";
import React, { FunctionComponent } from "react";
import styled from "styled-components/macro";
import tw from "tailwind.macro";

const StyledFieldError = styled.div`
  ${tw`text-red-dark text-sm font-bold block mt-2`};
`;

const InputError: FunctionComponent<ErrorMessageProps> = ({ name }) => {
  return <ErrorMessage component={StyledFieldError} name={name} />;
};

export default InputError;
