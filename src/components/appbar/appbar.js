import styled from 'styled-components';
import React from 'react';
import Title from "./title/title";
import Logo from "./logo/logo";
import logo from "./logo/ujap.png"
import LoginInfo from "./loginInfo/loginInfo";
import Username from "./username/username";
import LogoutButton from "./logoutButton/logoutButton";
import {connect} from "react-redux";
import {loggingOutPut} from "../../actions/auth.actions";

const Appbar = (props) => {
    const { isLoggedIn, name, dispatch } = props;

    const StyledAppbar = styled.header`
      width: 100%;
      height: 70px;
      padding: 0.25em 1em;
      background-color: ${props =>props.theme.main};
      display: flex;
      align-items: center;  
      box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);  
    `;

    const onLoggingOut = () => {
        dispatch(loggingOutPut());
    };

    return (
        <StyledAppbar>
            <Logo src={logo}/>
            <Title>
                Marico el que lo lea
            </Title>

            {
                isLoggedIn && (
                    <LoginInfo>
                        <Username> { name } </Username>
                        <LogoutButton onClick={onLoggingOut}> Cerrar Sesion </LogoutButton>
                    </LoginInfo>
                )
            }
        </StyledAppbar>
    );
};

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isAuthenticated,
    name: state.auth.name
});

export default connect(mapStateToProps)(Appbar);
