import SVG from "react-inlinesvg";
import styled from "styled-components/macro";
import tw from "tailwind.macro";

const Icon = styled(SVG)`
  svg {
    ${tw`w-8 h-8 fill-current mr-1`};
  }
`;

export default Icon;
