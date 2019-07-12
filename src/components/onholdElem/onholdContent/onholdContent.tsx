import styled from "styled-components/macro";
import tw from "tailwind.macro";

export interface IOnholdContentProps {
  contentVisible: boolean;
}

const OnholdContent = styled.div<IOnholdContentProps>`
  ${tw`py-4 px-6`};

  width: 80%;
  background-color: white;
  border-radius: 0 0 5px 5px;
  transition: transform 200ms ease-in;
  margin: 0 auto;

  ${props =>
    props.contentVisible
      ? "display: block; transform: translateY(0);"
      : "display: none; transform:" + " translateY(-100%)"}
`;

export default OnholdContent;
