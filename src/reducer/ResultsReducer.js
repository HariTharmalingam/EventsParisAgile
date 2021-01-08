import moment from 'moment'
const initialState = {
    isLoaded: false,
    results: null,
    currentEvent: [],
    isEvent: false,
    textSearch: "",
    dateSearch: ''
}

function ResultsReducer(state = initialState, action) {
    switch (action.type) {
        case 'RESULTS_LOADED' : 
            return {
                ...state,
                isLoaded: action.value.bool,
                results: action.value.array,
            }
        case 'CURRENT_EVENT':
            const { item, isEvent} = action.payload
            return {
                ...state,
                currentEvent: item,
                isEvent,
            }
        case 'TEXT_SEARCH':
            return{
                ...state,
                textSearch: action.payload
            }
        case 'DATE_SEARCH':
            return{
                ...state,
                dateSearch: action.payload
            }
            default: return state;
    }

}

export default ResultsReducer;