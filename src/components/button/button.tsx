import { PropsWithoutRef } from "react";
import styled from "styled-components/macro";
import tw from "tailwind.macro";

export interface IButton
  extends PropsWithoutRef<JSX.IntrinsicElements["button"]> {
  disabled?: boolean;
}

const Button = styled.button.attrs({
  type: "button"
})<IButton>`
  ${tw`px-4 py-2 font-bold rounded w-auto text-sm`};

  ${props =>
    props.disabled
      ? tw`bg-grey-darker text-white cursor-not-allowed`
      : tw`bg-primary text-white hover:bg-blue-darker`}
`;

export default Button;
