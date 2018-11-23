import React from 'react';
import {connect} from "react-redux";
import {ThemeProvider} from "styled-components";

const ThemeProviderConnected = (props) => {
    const { theme, ...rest } = props;

    return (
        <ThemeProvider
            theme={theme}
            {...rest}
        />
    );
};

const mapStateToProps = (state) => ({
    theme: state.theme
});

export default connect(mapStateToProps)(ThemeProviderConnected);
