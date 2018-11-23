import styled from "styled-components";

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 1.2rem;
  grid-row-gap: 1rem;
  grid-auto-rows: auto;
`;

export default CardGrid;
