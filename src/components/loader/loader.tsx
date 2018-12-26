import React from "react";
import styled, { keyframes } from "styled-components/macro";

const Loader = () => {
  const StyledDiv = styled.div`
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 5px 0;
    `;

  const SpinnerAnimation = keyframes`
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    `;

  const Spinner = styled.div`
      border: 3px solid #134074;
      border-right-color: transparent;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: ${SpinnerAnimation} 0.8s ease-in infinite;
    `;

  return (
    <StyledDiv>
      <Spinner/>
    </StyledDiv>
  );
};

export default Loader;