import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { recordReducer } from './reducers/recordReducer'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    recordModule: recordReducer
})


export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
window.myStore = store
