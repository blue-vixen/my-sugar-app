const INITIAL_STATE = {
    records: null,
    filterBy: null
}

export function recordReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_RECORDS':
            return {
                ...state,
                records: [...action.records]
            }
        case 'SET_FILTER_BY':
            return {
                ...state,
                filterBy: { ...action.filterBy }
            }
        default:
            return state
    }
}