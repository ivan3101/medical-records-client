import styled from "styled-components/macro";
import tw from "tailwind.macro";
import Button from "../../button/button";

const Action = styled(Button)`
  ${tw`border-0 bg-transparent hover:bg-grey-lighter text-grey-darker`}
`;

export default Action;
