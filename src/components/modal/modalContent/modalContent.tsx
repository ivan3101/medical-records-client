import styled from "styled-components/macro";
import tw from "tailwind.macro";

const ModalContent = styled.div`
  ${tw`absolute bg-white h-auto rounded z-50 max-w-xs`};

  width: 20rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default ModalContent;
