import {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {redirectUrlPut} from "../../../actions/auth.actions";

class EnsureUserOnly extends Component {
    componentDidMount() {
        const { currentUrl, dispatch, isLoggedIn, history } = this.props;

        if (!isLoggedIn) {
            if (currentUrl.split('/')[1] === 'dashboard') {
                dispatch(redirectUrlPut({ redirectUrl: currentUrl }));
            }
            history.replace('/login/student');
        }
    }

    render() {
        const { children, isLoggedIn } = this.props;

        if (isLoggedIn) {
            return children;
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state, ownProps) => ({
    isLoggedIn: state.auth.isAuthenticated,
    currentUrl: ownProps.location.pathname
});

export default withRouter(connect(mapStateToProps)(EnsureUserOnly));