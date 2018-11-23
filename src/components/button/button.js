import styled from "styled-components";

const Button = styled.button`
  padding: 0.45rem 0.80rem;
  font-size: 0.75rem;
  background-color: ${props => props.theme.primary};
  border: 1px solid ${props => props.theme.primary}; 
  border-radius: 6px;
  cursor: pointer;
  text-decoration: underline;


  :hover {
     opacity: 0.7;
  } 
`;

export default Button;