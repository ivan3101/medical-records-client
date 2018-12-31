import React, { FunctionComponent, MouseEventHandler } from "react";
import styled from "styled-components/macro";
import tw from "tailwind.macro";

export interface IShowPassword {
  onClick: MouseEventHandler<HTMLInputElement>;
}

const StyledLabel = styled.label`
  ${tw`inline-flex items-center text-sm font-normal my-2 lg:my-0`};
`;

const StyledCheckbox = styled.input`
  ${tw`cursor-pointer`};
`;

const ShowPassword: FunctionComponent<IShowPassword> = ({
  onClick: handleClick
}) => {
  return (
    <StyledLabel>
      <StyledCheckbox
        type="checkbox"
        defaultChecked={false}
        onClick={handleClick}
      />{" "}
      Mostrar contraseña
    </StyledLabel>
  );
};

export default ShowPassword;
