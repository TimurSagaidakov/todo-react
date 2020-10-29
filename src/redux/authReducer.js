import firebase from 'firebase';
import { getNotes } from './firebaseReducer';
import store from './redux-store';
const LOGIN_IN_GOOGLE = 'LOGIN-IN-GOOGLE'
const LOGOUT_GOOGLE = 'LOGOUT-GOOGLE'
const INITIALIZED_APP = 'INITIALIZED-APP'

let initialState = {
  auth: false,
  userData: {
    userName: null,
    email: null,
    uid: null,
  },
  initialized: false,
}


const authReducer = (state= initialState, action ) =>{
  switch(action.type){
    case LOGIN_IN_GOOGLE:
      return {
        ...state,
        userData: action.payload,
        auth: true,
      }
    case LOGOUT_GOOGLE:
      return {
        ...state,
        userData: {
          userName: null,
          email: null,
          uid: null,
        },
        auth: false,
      }
      case INITIALIZED_APP:
        return {
          ...state,
          initialized: true
        }
    default:
      return state
  }}

const loginInGoogle = (userName,email,uid) =>({type: LOGIN_IN_GOOGLE, payload: {userName,email,uid}})
export const logout = () =>( {type: LOGOUT_GOOGLE})
const initializeApp = () =>({type:INITIALIZED_APP})

export const initializedApp = () =>(dispatch) =>{
  firebase.auth().onAuthStateChanged(function(user) {                 // Получение данных пользователя 
    if (user) {                                                       // Если пользователь залогинен,
      dispatch(loginInGoogle(user.displayName, user.email, user.uid)) // то получаем его данные 
      let promise = dispatch(getNotes(store.getState().auth.userData.uid)) 
      promise.then(()=>{
      dispatch(initializeApp())                                       // и инициализируем приложение
  })
    } else {  
      dispatch(initializeApp())                         //если пользователя нет, то сразу инициализируем приложение
    }
  });
  
}

export default authReducer;