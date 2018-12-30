import { Field, FieldAttributes } from "formik";
import React, { FunctionComponent } from "react";
import Input from "../input";

const NormalInput: FunctionComponent<FieldAttributes<any>> = props => {
  return <Input as={Field} {...props} />;
};

export default NormalInput;
