import React from 'react';
import LoginContainer from "../loginContainer/loginContainer";
import LoginCard from "../loginCard/loginCard";
import CardHeader from "../../../components/card/cardHeader/cardHeader";
import CardBody from "../../../components/card/cardBody/cardBody";
import {Formik} from "formik";
import LoginForm from "./loginForm/loginForm";
import * as Yup from 'yup';
import {connect} from "react-redux";
import {loginStudentFetch} from "../../../actions/auth.actions";

const initialValues = {
    'cedula': {
        'letra': 'V',
        'numero': ''
    },
    'contraseña': ''
};

function LoginStudent(props) {
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
                            'cedula': Yup.object().shape({
                                'letra': Yup.string().trim()
                                    .required('Debe ingresar la letra correspondiente a su cedula')
                                    .matches(/^([VEJPG]$)/, {
                                        message: 'La letra no coincide con las letras V E J P o G',
                                        excludeEmptyString: true
                                    }),
                                'numero': Yup.string().trim()
                                    .required('Debe ingresar su numero de cedula')
                                    .matches(/^([0-9]{7,9}$)/, {
                                        message: 'El numero de cedula solo puede contener numeros y debe tener' +
                                            ' minimo 7 digitos',
                                        excludeEmptyString: true
                                    })
                            }),
                            'contraseña': Yup.string().trim().required('Debe ingresar la clave de Acceso')
                        })}
                        onSubmit={(values, formikActions) => {
                            const { cedula, contraseña } = values;
                            const cedulaFormed = `${cedula.letra}-${cedula.numero}`;

                            dispatch(loginStudentFetch({ cedula: cedulaFormed, contraseña }));
                        }}
                        render={props => <LoginForm {...props} match={match} submitError={error} errorMsg={errorMsg} errorType={errorType}/>}
                    />
                </CardBody>
            </LoginCard>
        </LoginContainer>
    );
}

const mapStateToProps = (state) => ({
    error: state.auth.error,
    errorMsg: state.auth.errorMsg,
    errorType: state.auth.errorType
});

export default connect(mapStateToProps)(LoginStudent);