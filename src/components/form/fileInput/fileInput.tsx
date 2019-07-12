import { Field, FieldProps } from "formik";
import get from "lodash.get";
import React, { Component, Fragment, PropsWithoutRef } from "react";
import styled from "styled-components/macro";
import tw from "tailwind.macro";
import Thumbnail from "./thumbnail/thumbnail";

export interface IFileInput
  extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  name: string;
}

const FileInputContainer = styled.div`
  ${tw`flex items-center`};
`;

class FileInput extends Component<IFileInput> {
  render() {
    return (
      <FileInputContainer>
        <Field name={this.props.name}>
          {({ form }: FieldProps) => (
            <Fragment>
              <input
                {...this.props}
                type="file"
                onChange={event =>
                  form.setFieldValue(
                    this.props.name,
                    event.currentTarget.files![0]
                  )
                }
              />
              <Thumbnail file={get(form.values, this.props.name)} />
            </Fragment>
          )}
        </Field>
      </FileInputContainer>
    );
  }
}

export default FileInput;
