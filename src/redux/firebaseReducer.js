import {getAllNotes, addNoteAPI,removeNoteAPI,removeAllNotesAPI,noteChangeToFav,noteChangeToUnFav,noteChangeToComplete} from '../api';
import store from './redux-store';

const GetNotes = 'GET-NOTES';
const AddNote = 'ADD-NOTE';
const RemoveNote = 'REMOVE-NOTE';
const RemoveAllNote = 'REMOVE-All-NOTE';
const ToFavourities = 'TO-FAVOURITIES';
const UnFavourities = 'UN-FAVOURITIES';
const ToComplete = 'TO-COMPLETE';
const isDarkTheme = 'TOGGLE-DARK-THEME';

let initialState = {
  notes: [],
  darkTheme: false,
}

const firebaseReducer = (state = initialState, action ) =>{
  switch(action.type){
    case GetNotes : {
      return {
        ...state,
        notes: action.payload.filter(notes=>notes.userId === action.uid)
      }
    }
    case AddNote : {
      return {
        ...state,
        notes: [...state.notes, action.payload]
      }
    }
    case RemoveNote : {
      return{
        ...state, 
        notes : state.notes.filter(note => note.id !== action.payload)
      }
    }
    case RemoveAllNote :{
      return {
        ...state,
        notes: state.notes.filter(note =>note.id !== action.id)
      }
    }
    case ToFavourities :{
      return {
        ...state,
        notes: state.notes.map(notes=>{
          if(notes.id === action.id){
            return {...notes, favourities: true}
          }
          return notes
        })
      }
    }
    case UnFavourities :{
      return {
        ...state,
        notes: state.notes.map(notes=>{
          if(notes.id === action.id){
            return {...notes, favourities: false}
          }
          return notes
        })
      }
    }
    case ToComplete :{
      return {
        ...state,
        notes: state.notes.map(notes=>{
          if(notes.id === action.id){
            return {...notes, complete: true}
          }
          return notes
        })
      }
    }
    case isDarkTheme : {
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    }
    default : {
      return state
    }
  }
}

const getNotesBase = ( payload, uid ) =>({type: GetNotes, payload,uid})
const addNote = ( payload ) =>({type: AddNote, payload})
const removeNote = ( id ) =>({type: RemoveNote, payload : id})
const removeAllNotes = ( id ) =>({type: RemoveAllNote, id})
const toFav = ( id ) =>({type: ToFavourities, id})
const unFav = (id) =>({type: UnFavourities, id })
const goToComplete = (id) =>({type:ToComplete, id })
export const toggleDarkTheme = () =>({type:isDarkTheme})

export const toComplete = (id) => (dispatch) =>{
  noteChangeToComplete(id).then(response =>{
    if(response.status === 200){
      dispatch(goToComplete(id))
    }
  })
}

export const toFavourities = (id) => (dispatch) =>{
  noteChangeToFav(id).then(response =>{
    if(response.status === 200){
      dispatch(toFav(id))
    }
  })
}
export const unFavourities = (id) => (dispatch) =>{
  noteChangeToUnFav(id).then(response =>{
    if(response.status === 200){
      dispatch(unFav(id))
    }
  })
}
export const getNotes = ( uid ) => (dispatch)=>{
  return getAllNotes().then(response=>{
    if(response.status === 200){
      const res = response.data
      const payload = Object.keys(res || {}).map(key  =>{
        return {
          ...res[key],
          id: key
        }
      })
      dispatch(getNotesBase(payload,uid))
    } 
  })
}
export const postNote = (title) => (dispatch)=>{
  addNoteAPI(title).then(response=>{
    if(response.status === 200){
      const res = response.data
      const payload = {
        title,
        userId: store.getState().auth.userData.uid,
        id: res.name,
        date:new Date().toLocaleDateString(),
      }
      dispatch(addNote(payload))
      } 
    }
  )
}

export const deleteNote = (id) =>(dispatch) =>{
  removeNoteAPI(id).then(response=>{
    if(response.status === 200 ){
      dispatch(removeNote(id))
    }
  })
}

export const deleteAllNotes = (id) => (dispatch) =>{
  removeAllNotesAPI(id).then(response=>{
    if(response.status === 200 ) {
      dispatch(removeAllNotes(id))
    }
  })
}
export default firebaseReducer