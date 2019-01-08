import styled from "styled-components/macro";
import tw from "tailwind.macro";

const ModalContent = styled.div`
  ${tw`z-50 absolute overflow-auto bg-white py-6 px-5 rounded`};

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 90%;
  box-sizing: border-box;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.7);
  width: 520px;
`;

export default ModalContent;
