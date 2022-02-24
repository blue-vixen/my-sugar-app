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
        case 'REMOVE_RECORD':
            return {
                ...state,
                records: state.records.filter(record => record.id !== action.recordId)
            }
        case 'ADD_RECORD':
            return {
                ...state,
                records: [...state.records, action.savedRecord]
            }
        case 'UPDATE_RECORD':
            return {
                ...state,
                records: state.records.map(record => record.id === action.savedRecord.id ? action.savedRecord : record)
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