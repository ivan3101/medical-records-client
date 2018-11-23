import styled from "styled-components";

const CardHeader = styled.div`
  padding: 1rem 0.80rem;
  border-bottom: 5px solid ${props => props.theme.primary};
  color: ${props => props.theme.text};
  font-size: 1.2rem;
`;

export default CardHeader;