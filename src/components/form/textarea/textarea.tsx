import { FastField, Field, FieldProps } from "formik";
import React, { FunctionComponent, PropsWithoutRef } from "react";
import { TextareaAutosize } from "react-autosize-textarea/lib/TextareaAutosize";
import styled from "styled-components/macro";
import tw from "tailwind.macro";

export interface ITextAreaProps
  extends PropsWithoutRef<JSX.IntrinsicElements["textarea"]> {
  name: string;
  isinvalid?: number;
}

const TextareaStyled = styled(TextareaAutosize)<{ isinvalid?: number }>`
  ${tw`block w-full rounded px-2 py-1 bg-white border text-black`};

  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);

  :focus {
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 6px 0 ${props => (props.isinvalid ? "#cc1f1a" : "#3490dc")}};
  }

  :disabled {
    ${tw`bg-grey-dark cursor-not-allowed`};
  }

  ${props =>
    props.isinvalid
      ? tw`border-red-dark focus:border-red-dark focus:border-2`
      : tw`border-grey-dark focus:border-blue focus:border-2`};
`;

const Textarea: FunctionComponent<ITextAreaProps> = ({
  name,
  isinvalid,
  ...otherProps
}) => {
  return (
    <FastField {...otherProps} name={name}>
      {({ field, form }: FieldProps) => (
        <TextareaStyled
          {...field}
          {...otherProps}
          async={true}
          onChange={e => {
            form.setFieldTouched(field.name);
            form.setFieldValue(field.name, e.currentTarget.value);
          }}
          value={field.value}
          isinvalid={isinvalid}
        />
      )}
    </FastField>
  );
};

export default Textarea;
