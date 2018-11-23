import styled from 'styled-components';
import React from 'react';
import Title from "./title/title";
import Logo from "./logo/logo";
import logo from "./logo/ujap.png"
import LoginInfo from "./loginInfo/loginInfo";
import Username from "./username/username";
import LogoutButton from "./logoutButton/logoutButton";

const Appbar = (props) => {
    const { isLoggedIn, username } = props;

    const StyledAppbar = styled.header`
      width: 100%;
      height: 70px;
      padding: 0.25em 1em;
      background-color: ${props =>props.theme.main};
      display: flex;
      align-items: center;    
`;

    return (
        <StyledAppbar>
            <Logo src={logo}/>
            <Title>
                Marico el que lo lea
            </Title>

            {
                isLoggedIn && (
                    <LoginInfo>
                        <Username> { username } </Username>
                        <LogoutButton> Cerrar Sesion </LogoutButton>
                    </LoginInfo>
                )
            }
        </StyledAppbar>
    );
};

export default Appbar;
