import React from 'react';
import {Route} from "react-router-dom";
import Login from "../views/login/login";


const TopLevelRoutes = () => {
    return (
        <React.Fragment>
            <Route path={'/login'} component={Login}/>
        </React.Fragment>
    );
};

export default TopLevelRoutes;
