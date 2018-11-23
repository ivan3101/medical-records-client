import React from 'react';
import styled from "styled-components";
import { lighten, darken } from 'polished';

const ItemMenu = (props) => {
    const { className, children, link } = props;

    const StyledLi = styled.li`
      width: 100%;
      height: auto;
    `;

    return (
        <StyledLi>
            <a
                href={ link }
                className={ className }
            > { children } </a>
        </StyledLi>
    );
};

const StyledItemMenu = styled(ItemMenu)`
   display: inline-flex;
   align-items: center;
   padding: 0.75rem 1.2rem;
   text-decoration: none;
   color: ${props => props.active ? '#ffffff' : darken(0.05, '#ffffff')};
   font-weight: ${props => props.active ? 'bold' : 'normal' };
   font-size: 1rem;
   width: 100%;
   overflow-wrap: break-word;
   background-color: ${props => props.active ? lighten(0.2, props.theme.secondary) : ''};
   
   :hover {
    background-color: ${props => lighten(0.2, props.theme.secondary)}
   }
`;

export default StyledItemMenu;
