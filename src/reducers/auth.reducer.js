const defaultState = {
    isAuthenticated: false,
    rol: '',
    token: '',
    error: false,
    errorType: '',
    errorMsg: '',
    name: ''
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'LOGIN_STUDENT/PUT':
            return {
                ...state,
                isAuthenticated: true,
                rol: 'estudiante',
                token: action.data.token,
                name: action.data.name,
                error: false,
                errorMsg: '',
                errorType: ''
            };

        case 'LOGIN_PERSONAL/PUT':
            return {
                ...state,
                isAuthenticated: true,
                rol: action.data.rol,
                token: action.data.token,
                name: action.data.name,
                error: false,
                errorMsg: '',
                errorType: ''
            };

        case 'LOGIN_FAILED':
            return {
                ...state,
                error: true,
                errorMsg: action.error.errorMsg,
                errorType: action.error.errorType
            };

        default:
            return state;
    }
}