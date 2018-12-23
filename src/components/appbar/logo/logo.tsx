import React, { FunctionComponent } from "react";
import styled from "styled-components/macro";
import tw from "tailwind.macro";
import logo from "../../../assets/logo/medc.svg";
import ujapLogo from "../../../assets/logo/ujap.png";

const LogoContainer = styled.div`
  ${tw`w-auto h-auto flex items-center flex-no-shrink`};
`;

const UjapLogoContainer = styled.img`
  ${tw`w-auto h-16 object-cover mr-2`};
`;

const LogoImgContainer = styled.img`
  ${tw`w-32 h-full object-cover`};
`;

const Logo: FunctionComponent = () => {
  return (
    <LogoContainer>
      <UjapLogoContainer src={ujapLogo}/>
      <LogoImgContainer src={logo}/>
    </LogoContainer>
  );
};

export default Logo;
