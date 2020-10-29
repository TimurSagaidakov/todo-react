import  { combineReducers, createStore, applyMiddleware }  from 'redux';
import thunkMiddleware from 'redux-thunk';
import firebaseReducer from './firebaseReducer';
import authReducer from './authReducer';

let redusers = combineReducers({
  firebase: firebaseReducer,
  auth: authReducer,
})
let store = createStore(redusers, applyMiddleware(thunkMiddleware))

window.store = store;

export default store