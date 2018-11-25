import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import LoginStudent from "./loginStudent/loginStudent";
import LoginPersonal from "./loginPersonal/loginPersonal";

const Login = (props) => {
    const { match } = props;
    return (
        <Switch>
            <Route path={`${match.path}/student`} component={LoginStudent}/>
            <Route path={`${match.path}/personal`} component={LoginPersonal}/>
            <Redirect to={`${match.url}/student`} />
        </Switch>
    );
};

export default Login;
