import {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class EnsureVisitorOnly extends Component {
    componentDidMount() {
        const { isLoggedIn, history } = this.props;

        if (isLoggedIn) {
            history.replace('/dashboard');
        }
    }

    render() {
        const { isLoggedIn, children } = this.props;

        if (!isLoggedIn) {
            return children
        } else {
            return null
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isAuthenticated,
        currentUrl: ownProps.location.pathname
    }
};

export default withRouter(connect(mapStateToProps)(EnsureVisitorOnly));