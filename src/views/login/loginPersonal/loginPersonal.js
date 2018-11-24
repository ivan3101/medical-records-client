import React from 'react';
import {Formik} from "formik";
import * as Yup from 'yup';
import LoginForm from "./loginForm/loginForm";
import LoginCard from "../loginCard/loginCard";
import CardHeader from "../../../components/card/cardHeader/cardHeader";
import CardBody from "../../../components/card/cardBody/cardBody";
import LoginContainer from "../loginContainer/loginContainer";

const initialValues = {
    'nombreDeUsuario': '',
    'contraseña': ''
};

const LoginPersonal = () => {
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
                            console.log(values);
                        }}
                        render={LoginForm}
                    />
                </CardBody>
            </LoginCard>
        </LoginContainer>
    );
};

export default LoginPersonal;
