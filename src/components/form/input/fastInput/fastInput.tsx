import { FastField, FastFieldAttributes } from "formik";
import React, { FunctionComponent } from "react";
import Input from "../input";

const FastInput: FunctionComponent<FastFieldAttributes<any>> = props => {
  return <Input as={FastField} {...props} />;
};

export default FastInput;
