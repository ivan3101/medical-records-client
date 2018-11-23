import styled from "styled-components";

const Card = styled.div`
      background-color: ${props => props.theme.main};
      color: ${props => props.theme.text};
      border-radius: 8px;
      height: auto;
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
      grid-column: ${props => props.cols};
    `;

export default Card;