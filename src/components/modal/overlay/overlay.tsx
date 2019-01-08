import styled from "styled-components/macro";
import tw from "tailwind.macro";

const Overlay = styled.div`
  ${tw`absolute pin-t pin-t pin-l w-full h-full z-40`};

  background: rgba(0, 0, 0, 0.85);
`;

export default Overlay;
