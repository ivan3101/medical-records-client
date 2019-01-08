import styled from "styled-components/macro";
import tw from "tailwind.macro";

const CloseButton = styled.div`
  ${tw`absolute block cursor-pointer pin-r opacity-25`};

  top: 32px;
  right: 32px;
  width: 32px;
  height: 32px;
  transition: opacity 300ms;

  :before,
  :after {
    content: " ";
    left: 15px;
    height: 33px;
    width: 2px;
    background-color: #333;
    ${tw`absolute`};
  }

  :before {
    transform: rotate(45deg);
  }

  :after {
    transform: rotate(-45deg);
  }

  :hover {
    ${tw`opacity-100`};
  }
`;

export default CloseButton;
