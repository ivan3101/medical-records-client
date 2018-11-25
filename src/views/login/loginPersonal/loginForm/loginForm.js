import React from 'react';
import {Form} from "formik";
import SubmitError from "../../../../components/form/submitError/submitError";
import FormGroup from "../../../../components/form/formGroup/formGroup";
import Label from "../../../../components/form/label/label";
import Input from "../../../../components/form/input/input";
import ValidationError from "../../../../components/form/validationError/validationError";
import Button from "../../../../components/button/button";
import isEmpty from 'lodash.isempty';
import Link from "../../../../components/link/link";
import Flexbox from "../../flexbox/flexbox";

const LoginForm = (props) => {
    const { errors, isSubmiting, dirty, touched, match, errorType, submitError, errorMsg } = props;
    const baseUrl = '/' + match.url.split('/')[1];

    return (
        <Form>
            {
                submitError && errorType === 'personal' && (<SubmitError>{ errorMsg }</SubmitError>)
            }

            <FormGroup>
                <Label>Ingrese su nombre de usuario</Label>
                <Input
                    type={'text'}
                    name={'nombreDeUsuario'}
                    invalid={errors.nombreDeUsuario && touched.nombreDeUsuario ? 1 : 0}
                />
                <ValidationError name={'nombreDeUsuario'}/>
            </FormGroup>

            <FormGroup>
                <Label>Ingrese su contraseña</Label>
                <Input
                    type={'password'}
                    name={'contraseña'} invalid={errors.contraseña && touched.contraseña ? 1 : 0} />
                <ValidationError name={'contraseña'}/>
            </FormGroup>
            <Flexbox>
                <Link to={`${baseUrl}/student`}>¿Eres un Estudiante? Haz click aquí</Link>
                <Button
                    type={'submit'}
                    disabled={isSubmiting || !isEmpty(errors) || !dirty}
                >Iniciar Sesion</Button>
            </Flexbox>
        </Form>
    );
};

export default LoginForm;