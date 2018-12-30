import { FastFieldAttributes, FieldAttributes } from "formik";
import React, { ComponentClass, FunctionComponent } from "react";
import styled from "styled-components/macro";
import tw from "tailwind.macro";

export interface IInput {
  isinvalid: number;
  as:
    | ComponentClass<FastFieldAttributes<any>>
    | ComponentClass<FieldAttributes<any>>;
  className?: string;
}

const UnstyledInput: FunctionComponent<IInput> = props => {
  const { as: Component, children, className, ...rest } = props;
  return (
    <Component className={className} {...rest}>
      {children}
    </Component>
  );
};

const Input = styled(UnstyledInput).attrs({
  type: "text"
})<IInput>`
  ${tw`block w-full rounded px-2 py-1 bg-white border text-black`};

  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);

  :focus {
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 6px 0 ${props => (props.isinvalid ? "#cc1f1a" : "#3490dc")};
  }

  ${props =>
    props.isinvalid
      ? tw`border-red-dark focus:border-red-dark focus:border-2`
      : tw`border-grey-dark focus:border-blue focus:border-2`};
`;

export default Input;
