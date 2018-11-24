import React from 'react';
import {Form} from "formik";
import SubmitError from "../../../../components/form/submitError/submitError";
import FormGroup from "../../../../components/form/formGroup/formGroup";
import Label from "../../../../components/form/label/label";
import Input from "../../../../components/form/input/input";
import ValidationError from "../../../../components/form/validationError/validationError";
import Button from "../../../../components/button/button";
import isEmpty from 'lodash.isempty';
import idx from "idx.macro";
import Link from "../../../../components/link/link";
import Flexbox from "../../flexbox/flexbox";

const LoginForm = (props) => {
    const { errors, isSubmiting, dirty, touched, status } = props;
    const submitError = idx(status, _ => _.error);
    const errorMsg = idx(status, _ => _.message);

    return (
        <Form>
            {
                submitError && (<SubmitError>{ errorMsg }</SubmitError>)
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
                <Link>¿Eres un Estudiante? Haz click aquí</Link>
                <Button
                    type={'submit'}
                    disabled={isSubmiting || !isEmpty(errors) || !dirty}
                >Iniciar Sesion</Button>
            </Flexbox>
        </Form>
    );
};

export default LoginForm;