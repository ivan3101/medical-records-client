import React from 'react';
import {Formik} from "formik";
import * as Yup from 'yup';
import LoginForm from "./loginForm/loginForm";
import LoginCard from "../loginCard/loginCard";
import CardHeader from "../../../components/card/cardHeader/cardHeader";
import CardBody from "../../../components/card/cardBody/cardBody";
import LoginContainer from "../loginContainer/loginContainer";
import {connect} from "react-redux";
import {loginPersonalFetch} from "../../../actions/auth.actions";

const initialValues = {
    'nombreDeUsuario': '',
    'contraseña': ''
};

const LoginPersonal = (props) => {
    const { match, dispatch, error, errorMsg, errorType } = props;

    return (
        <LoginContainer>
            <LoginCard>
                <CardHeader>
                    Iniciar Sesión
                </CardHeader>
                <CardBody>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={Yup.object().shape({
                            'nombreDeUsuario': Yup.string().trim().required('Debe ingresar su nombre de usuario'),
                            'contraseña': Yup.string().trim().required('Debe ingresar su contraseña')
                        })}
                        onSubmit={(values, formikActions) => {
                            const { nombreDeUsuario, contraseña } = values;

                            dispatch(loginPersonalFetch({ nombreDeUsuario, contraseña }));
                        }}
                        render={props => <LoginForm {...props} match={match} submitError={error} errorMsg={errorMsg} errorType={errorType}/>}
                    />
                </CardBody>
            </LoginCard>
        </LoginContainer>
    );
};

const mapStateToProps = (state) => ({
    error: state.auth.error,
    errorMsg: state.auth.errorMsg,
    errorType: state.auth.errorType
});

export default connect(mapStateToProps)(LoginPersonal);
