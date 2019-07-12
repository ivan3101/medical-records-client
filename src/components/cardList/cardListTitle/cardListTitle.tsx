import React, { FunctionComponent } from "react";
import styled from "styled-components/macro";
import tw from "tailwind.macro";

export const CardListTitleContainer = styled.span<{
  sublist?: number;
}>`
  ${tw`text-sm text-grey-dark block mt-4 mb-1 font-normal`}

  ${props =>
    props.sublist === 1
      ? tw`text-grey-darkest font-medium`
      : tw`text-grey-dark`}
`;

const CardListTitle: FunctionComponent<{ sublist?: number }> = ({
  children,
  sublist
}) => {
  const words = (children! as string).replace(/([A-Z])/g, " $1");

  let camelCaseText;

  if (/^[a-z]$/.test(words.charAt(0))) {
    camelCaseText = words.charAt(0).toUpperCase() + words.slice(1);
  } else {
    camelCaseText =
      words.charAt(0) + words.charAt(1).toUpperCase() + words.slice(2);
  }

  return (
    <CardListTitleContainer sublist={sublist}>
      {camelCaseText}
    </CardListTitleContainer>
  );
};

export default CardListTitle;
