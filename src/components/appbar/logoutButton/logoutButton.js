import styled from "styled-components";
import Button from "../../button/button";

const LogoutButton = styled(Button)`
  background: transparent;
  border-color: transparent;
  color: ${props => props.theme.warning};
  font-size: 0.90rem;
  
  :hover {
    border-color: ${props => props.theme.warning};
    opacity: 1;
  }
`;

export default LogoutButton;
