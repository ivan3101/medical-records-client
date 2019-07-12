import styled from "styled-components/macro";
import tw from "tailwind.macro";

const OnholdBar = styled.div`
  ${tw`py-4 px-6 bg-primary font-bold`};

  color: white;
  width: 80%;
  border-radius: 5px;
  margin: 0 auto;
  cursor: pointer;
`;

export default OnholdBar;
