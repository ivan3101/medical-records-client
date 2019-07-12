import { FieldProps } from "formik";
import { get } from "lodash";
import React, { FunctionComponent } from "react";
import styled from "styled-components/macro";
import tw from "tailwind.macro";

const RadioDiv = styled.div`
  ${tw`inline-block m-3`};
`;

const RadioInput: FunctionComponent<
  FieldProps & { label: string; value: string }
> = ({ field, form, label, value, ...props }) => {
  return (
    <RadioDiv>
      <input
        {...field}
        {...props}
        type="radio"
        value={value}
        checked={get(form.values, field.name) === value}
      />
      {" " + label}
    </RadioDiv>
  );
};

export default RadioInput;
