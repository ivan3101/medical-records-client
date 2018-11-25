import styled from "styled-components";
import {lighten} from "polished";
import {Link} from "react-router-dom";

const StyledLink = styled(Link)`
  color: ${lighten(0.2, '#0000EE')};
  text-decoration: underline;
  cursor: pointer;
  display: inline;
  
  :hover {
    color: ${lighten(0.15, '#0000EE')};
    font-weight: bold;
  }
`;

export default StyledLink;