const INITAL_STATE = {
    currentUser: null
}

export const userReducer = (state = INITAL_STATE, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            console.log(action.payload)
            return {
                ...state,
                currentUser: action.payload
            }
        default: return state
    }
}