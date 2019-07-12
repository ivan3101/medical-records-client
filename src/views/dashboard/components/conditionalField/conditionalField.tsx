import { connect, FormikContext } from "formik";
import get from "lodash.get";
import React, { Fragment, FunctionComponent } from "react";

export interface IConditionalFieldProps {
  name: string;
  formik?: FormikContext<any>;
}

const ConditionalField: FunctionComponent<IConditionalFieldProps> = ({
  children,
  name,
  formik
}) => {
  if (get(formik!.values, name) === "Si") {
    return <Fragment>{children}</Fragment>;
  } else return null;
};

// @ts-ignore
export default connect(ConditionalField);
