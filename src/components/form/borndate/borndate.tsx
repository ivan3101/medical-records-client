import { FieldProps } from "formik";
import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Borndate extends Component<FieldProps> {
  onChange = (date: Date | null) => {
    this.props.form.setFieldValue(this.props.field.name, date);

    const age = this.getAge(date);

    this.props.form.setFieldValue("edad", age);
  };

  getAge = (borndate: Date | null): number => {
    if (borndate) {
      const diffMs = Date.now() - borndate.getTime();
      const ageDate = new Date(diffMs);

      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    return 0;
  };

  getDateString = (): string => {
    const { value } = this.props.field;

    const date = value.getDate();
    const month = value.getMonth() + 1;
    const year = value.getFullYear();

    const dateString = `${date}/${month}/${year}`;

    return dateString;
  };

  render() {
    const { field, form } = this.props;

    return (
      <DatePicker
        name={field.name}
        value={this.getDateString()}
        onChange={this.onChange}
        autoComplete="off"
        selected={form.values[field.name]}
        dateFormat="DD/MM/YYYY"
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
    );
  }
}

export default Borndate;
