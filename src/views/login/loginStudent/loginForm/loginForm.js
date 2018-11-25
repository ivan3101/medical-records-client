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
import Flexbox from "../../flexbox/flexbox";
import StyledLink from "../../../../components/link/link";

const LoginForm = (props) => {
    const { errors, isSubmiting, dirty, touched, match, submitError, errorMsg, errorType } = props;
    const letraError = idx(errors, _ => _.cedula.letra);
    const numeroError = idx(errors, _ => _.cedula.numero);
    const letraTouched = idx(touched, _ => _.cedula.letra);
    const numeroTouched = idx(touched, _ => _.cedula.numero);
    const baseUrl = '/' + match.url.split('/')[1];


    return (
        <Form>
            {
                submitError && errorType === 'student' && (<SubmitError>{ errorMsg }</SubmitError>)
            }

            <FormGroup>
                <Label>Ingrese la Cedula del Estudiante</Label>
                <Flexbox>
                    <Input
                        component={'select'}
                        name={'cedula.letra'}
                        invalid={letraError && letraTouched ? 1 : 0}
                        style={{ 'width': '15%', 'marginRight': '5px' }}>
                        <option value="V">V</option>
                        <option value="E">E</option>
                        <option value="J">J</option>
                        <option value="P">P</option>
                        <option value="G">G</option>
                    </Input>
                    <Input
                        type={'text'}
                        name={'cedula.numero'}
                        invalid={numeroError && numeroTouched ? 1 : 0}
                        style={{ 'width': '85%' }}/>
                </Flexbox>
                <ValidationError name={'cedula.letra'}/>
                <ValidationError name={'cedula.numero'}/>
            </FormGroup>

            <FormGroup>
                <Label>Ingrese la Clave de Acceso</Label>
                <Input
                    type={'password'}
                    name={'contraseña'} invalid={errors.contraseña && touched.contraseña ? 1 : 0} />
                <ValidationError name={'contraseña'}/>
            </FormGroup>
            <Flexbox>
                <StyledLink to={`${baseUrl}/personal`}>¿No eres un Estudiante? Haz click aquí</StyledLink>
                <Button
                    type={'submit'}
                    disabled={isSubmiting || !isEmpty(errors) || !dirty}
                >Iniciar Sesion</Button>
            </Flexbox>
        </Form>
    );
};

export default LoginForm;