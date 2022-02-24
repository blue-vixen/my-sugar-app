import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { recordReducer } from './reducers/recordReducer'
import { userReducer } from './reducers/userReducer'
import logger from 'redux-logger'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middlewares = [thunk]

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
}

const rootReducer = combineReducers({
    recordModule: recordReducer,
    userModule: userReducer
})


export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)))
window.myStore = store
