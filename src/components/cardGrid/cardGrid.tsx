import styled from "styled-components/macro";

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 400px));
  grid-column-gap: 2rem;
  grid-row-gap: 1.25rem;
  margin-top: 1.5rem;
  justify-content: center;
`;

export default CardGrid;
