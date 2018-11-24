import React from "react";
import styled from "styled-components";
import { ErrorMessage } from "formik";

const ValidationError = (props) => {
    const { name } = props;

    const StyledDiv = styled.div`
      color: ${props => props.theme.warning};
      font-weight: bold;
      margin-top: 3px;
    `;

    return (
        <ErrorMessage component={StyledDiv} name={name}/>
    )
};

export default ValidationError;