import React from 'react';
import Layout from "../../components/layout/layout";
import SidebarContainer from "./sidebarContainer/sidebarContainer";
import Container from "../../components/container/container";
import {connect} from "react-redux";
import ModularRoutes from "../../routes/modularRoutes/modularRoutes";
import {Redirect, Switch} from "react-router-dom";

const Dashboard = (props) => {
    const { routes: allRoutes, rol } = props;
    let routes = [];

    if (rol === 'estudiante') routes = allRoutes.student;
    else if (rol === 'profesor') routes = allRoutes.professor;
    else if (rol === 'archivo') routes = allRoutes.archive;

    return (
        <Layout>
            <SidebarContainer routes={routes}/>
            <Container>
                <Switch>
                    {
                        routes.map((route, i) => (
                            <ModularRoutes key={i} {...route}/>
                        ))
                    }
                    <Redirect to={routes[0].path}/>
                </Switch>
            </Container>
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    rol: state.auth.rol
});

export default connect(mapStateToProps)(Dashboard);
