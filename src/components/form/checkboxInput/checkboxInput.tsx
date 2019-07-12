import { Field, FieldProps } from "formik";
import React, { FunctionComponent, PropsWithoutRef } from "react";
import styled from "styled-components/macro";
import tw from "tailwind.macro";

export interface ICheckBoxInput
  extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  name: string;
  value: string;
}

const CheckboxInputContainer = styled.label`
  ${tw`m-2 inline-flex`};
`;

const CheckboxInput: FunctionComponent<ICheckBoxInput> = props => {
  return (
    <Field name={props.name}>
      {({ field, form }: FieldProps) => (
        <CheckboxInputContainer>
          <input
            type="checkbox"
            {...props}
            checked={field.value.includes(props.value)}
            onChange={() => {
              form.setFieldTouched(props.name, true);

              if (field.value.includes(props.value)) {
                const nextValue = field.value.filter(
                  (value: string) => value !== props.value
                );
                form.setFieldValue(props.name, nextValue);
              } else {
                const nextValue = field.value.concat(props.value);
                form.setFieldValue(props.name, nextValue);
              }
            }}
          />
          {props.value}
        </CheckboxInputContainer>
      )}
    </Field>
  );
};

export default CheckboxInput;
