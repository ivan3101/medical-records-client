const defaultState = {
    main: '#ffffff',
    aux: '#efefef',
    text: '#000000',
    primary: '#134074',
    secondary: '#0b2545',
    warning: '#cc0000'
};

export default (state = defaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}