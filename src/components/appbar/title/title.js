import React from "react";
import Svg from "react-inlinesvg";
import styled from "styled-components";
import logo from '../../../assets/logo/medc.svg'

const Title = () => {

    const StyledDiv = styled.div`
      background-color: ${props => props.theme.main};
      height: 100%;
      width: auto;
      
      span {
        width: 100%;
        height: 100%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        }
        
       path {
        fill: ${props => props.theme.primary}
      }
    `;

    return (
      <StyledDiv>
          <Svg src={logo}/>
      </StyledDiv>
    );
};

export default Title;
