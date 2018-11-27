import {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class AuthCheck extends Component {

    componentDidUpdate(prevProps) {
        const { redirectUrl } = this.props;
        const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn;
        const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn;

        if (isLoggingIn) {
            if (redirectUrl.split('/')[1] === 'dashboard') {
                this.props.history.replace(redirectUrl);
            } else {
                this.props.history.push('/dashboard');
            }

        } else if (isLoggingOut) {
            this.props.history.push('/login')
        }
    }

    render() {
        return this.props.children;
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isAuthenticated,
    redirectUrl: state.auth.redirectUrl
});

export default withRouter(connect(mapStateToProps)(AuthCheck));