import React, { FunctionComponent, Fragment } from "react";
import styled from "styled-components/macro";
import tw from "tailwind.macro";
import CardListTitle from "./cardListTitle/cardListTitle";

const CardListContainer = styled.div`
  ${tw`block font-medium`};
`;

const getElementsFromMap = (map: Map<any, any>) => {
  const elements = [];

  for (const [key, value] of map.entries()) {
    if (typeof value === "object") {
      elements.push(
        <div style={{ marginBottom: "15px" }}>
          <CardListTitle sublist={1}>{key}</CardListTitle>
          <div style={{ paddingLeft: "1rem" }}>
            <CardList elements={value} />
          </div>
        </div>
      );
    } else {
      elements.push(
        <div style={{ marginBottom: "15px" }}>
          <CardListTitle>{key}</CardListTitle>
          <p>{value}</p>
        </div>
      );
    }
  }

  return elements;
};

const CardList: FunctionComponent<{ elements: Map<any, any> | object }> = ({
  elements
}) => {
  let elementsMap = elements;

  if (typeof elements === "object" && elements !== null) {
    elementsMap = new Map(Object.entries(elements));
  }

  return (
    <Fragment>{getElementsFromMap(elementsMap as Map<any, any>)}</Fragment>
  );
};

export default CardList;
