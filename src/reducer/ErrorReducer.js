const initialState = {
    isLoaded: false,
    error_name: null,
    error_description: null,
}

function ErrorReducer(state = initialState, action) {
    switch (action.type) {
        case 'ERROR_LOADED' :
            return {
                ...state,
                error_description: action.value,
            }
            default: return state;
    }
}

export default ErrorReducer;