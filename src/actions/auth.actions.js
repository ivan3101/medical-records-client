export const loginStudentFetch = ({ cedula, contraseña }) => ({
    type: 'LOGIN_STUDENT/FETCH',
    tempPassword: {
        cedula,
        contraseña
    }
});

export const loginStudentPut = ({ token, name }) => ({
   type: 'LOGIN_STUDENT/PUT',
   data: {
       token,
       name
   }
});

export const loginPersonalFetch = ({ nombreDeUsuario, contraseña }) => ({
    type: 'LOGIN_PERSONAL/FETCH',
    personal: {
        nombreDeUsuario,
        contraseña
    }
});

export const loginPersonalPut = ({ token, name, rol }) => ({
    type: 'LOGIN_PERSONAL/PUT',
    data: {
        token,
        name,
        rol
    }
});

export const loginFailed = ({ errorMsg, errorType }) => ({
    type: 'LOGIN_FAILED',
    error: {
        errorMsg,
        errorType
    }
});

export const redirectUrlPut = ({ redirectUrl }) => ({
    type: 'REDIRECT_URL/PUT',
    redirectUrl
});

export const loggingOutPut = () => ({
    type:'LOGGING_OUT/PUT'
});