import React from "react";
import styled from "styled-components/macro";
import tw from "tailwind.macro";

export interface IBackground {
  center?: boolean
}

const Background = styled.main<IBackground>`
  ${tw`bg-grey-light w-full p-6 md:p-12`};
  
  height: calc(100vh - 6rem);
  
  ${props => props.center ? tw`flex items-center justify-center` : ''}
`;

export default Background;
