import React, { FunctionComponent } from "react";
import styled from "styled-components/macro";
import tw from "tailwind.macro";
import logo from "../../../assets/logo/medc.svg";
import odontoLogo from "../../../assets/logo/odontologia.png";
import ujapLogo from "../../../assets/logo/ujap.png";

const LogoContainer = styled.div`
  ${tw`w-auto h-auto flex items-center flex-no-shrink`};
`;

const ImageContainer = styled.img`
  ${tw`w-auto h-16 object-cover mr-2`};
`;

const Title = styled.h1`
  color: #134074;
  text-transform: uppercase;
`;

const Logo: FunctionComponent = () => {
  return (
    <LogoContainer>
      <ImageContainer src={ujapLogo} />
      <ImageContainer src={odontoLogo} />
      <Title>Sistema Virtual de Historias Clínicas</Title>
    </LogoContainer>
  );
};

export default Logo;
