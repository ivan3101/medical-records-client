import styled from "styled-components";
import {darken, lighten} from "polished";


const Button = styled.button`
  padding: 0.50rem 0.75rem;
  font-size: 0.90rem;
  background-color: ${props => props.theme.primary};
  border: 1px solid ${props => props.theme.primary}; 
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  color: #ffffff;

  :hover {
     background-color: ${props => lighten(0.2, props.theme.primary)};
  } 
  
  :disabled {
    background-color: ${props => darken(0.4, '#efefef')};
    border: 1px solid ${props => darken(0.4, '#efefef')};
    color: ${darken(0.1, '#ffffff')};
    cursor: not-allowed;
  }
`;

export default Button;