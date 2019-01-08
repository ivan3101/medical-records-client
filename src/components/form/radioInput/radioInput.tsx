import { FieldProps } from "formik";
import React, { FunctionComponent } from "react";

const RadioInput: FunctionComponent<
  FieldProps & { label: string; value: string }
> = ({ field, form, label, value, ...props }) => {
  return (
    <React.Fragment>
      <input
        {...field}
        {...props}
        type="radio"
        value={value}
        checked={form.values[field.name] === value}
      />
      {" " + label}
    </React.Fragment>
  );
};

export default RadioInput;
