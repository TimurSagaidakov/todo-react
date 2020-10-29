import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import './animation.sass';
import s from'./main.module.sass';
import {getNotes, deleteAllNotes } from '../../redux/firebaseReducer';
import Loader from '../loader/loader';
import { Route } from 'react-router-dom';
import Notes from '../notes/notes';
import Error from '../error/error';

const Main = (props) => {
  //  Вытаскиваем данные из redux
  const notes = useSelector(state => state.firebase.notes)
  const loading = useSelector(state => state.firebase.loading)
  const uid = useSelector(state => state.auth.userData.uid)
  const isAuth = useSelector(state =>state.auth.auth)


  //  Диспатчи из redux
  const dispatch = useDispatch(); 
  const myNotes = notes.filter(notes=>uid===notes.userId)  // Фильтрую задачи для конкретного пользователя
  const myNotesId = myNotes.map(notes=> notes.id)          // Беру из задач их id
  const onToDeleteAll = useCallback(() =>{  
    for(let i = 0;i<myNotesId.length;i++){                 // Прохожу циклом по задачам пользователя и удаляю их
      dispatch(deleteAllNotes(myNotesId[i]))
    }
    setToDeleteAll(true)
    setTimeout(() =>{
      setToDeleteAll(false)
    }, 2000)
  }, [myNotesId])
  const [ toDeleteAll , setToDeleteAll] = useState(false)

  // Фильтрую задачи по свойствам 
  const allNotes  = notes.filter(notes=>!notes.complete)                      // Все
  const complete  = notes.filter(notes=> notes.complete) || null              // Выполненые
  const regular   = notes.filter(notes=>!notes.complete&&!notes.favourities)  // Обычные
  const important = notes.filter(notes=>!notes.complete&&notes.favourities)   // Важные
  const forDeleteAll = allNotes.length > 0 || complete.length > 0
return <>
  {isAuth
  ? <div className={`${s.container} ${props.darkTheme&&s.dark}`}>
      <Error error={toDeleteAll} timeout={500} className='noteDelete' description='Все задачи удалены'/>
      <Route exact path="/" render={ () =><Notes filter={allNotes} newNote={true}/>}/>
      <Route path="/regular" render={ () =><Notes filter={regular} newNote={true}/>}/>
      <Route path="/important" render={ () =><Notes filter={important}/>}/>
      <Route path="/complete" render={ () =><Notes filter={complete}/>}/>
      {forDeleteAll&&<button className={`${s.button} ${s.deleteAll}`} onClick={()=>onToDeleteAll()}> Удалить все задачи </button>}
    </div>
  : <div className={s.nonAuth} >Войдите в свой аккаунт google</div>
  }
</>
}

export default Main;