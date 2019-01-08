import styled from "styled-components/macro";
import tw from "tailwind.macro";
import Card from "../../../../components/card/card";

const CardItem = styled(Card)`
  ${tw`mb-4`};

  flex: 0 1 20%;
`;

export default CardItem;
