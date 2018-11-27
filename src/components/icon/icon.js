import React from 'react';
import styled from "styled-components";
import Svg from "react-inlinesvg";

const Icon = ({ icon }) => {
    const StyledDiv = styled.div`
      display: inline-flex;
      align-self: center;
      margin-right: 5px;

      svg, img {
        height: 2em;
        width: 2em;
        fill: currentColor;
        top: .125em;
        position: relative;
      }
    `;

    return (
        <StyledDiv>
            <Svg
                src={icon}
            />
        </StyledDiv>
    )

};

export default Icon;
