import styled from "styled-components";

const Button = styled.button`
  padding: 0.45rem 0.80rem;
  font-size: 0.75rem;
  background-color: ${props => props.theme.action};
  border: 1px solid ${props => props.theme.action}; 
  border-radius: 6px;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  } 
`;

export default Button;