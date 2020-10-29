import React, { useState, useCallback } from 'react';
import s from'./notes.module.sass'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash,faCheck} from '@fortawesome/free-solid-svg-icons'
import {faStar} from '@fortawesome/free-regular-svg-icons'
import star from './../../assets/img/star-solid.svg'
import Error, {warning} from '../error/error';
import NewNote from '../newNote/newNote';
import TitleNote from '../titleNote/titleNote';
import { useDispatch } from 'react-redux';
import {toFavourities, unFavourities, deleteNote, toComplete} from '../../redux/firebaseReducer';

const Notes = ({newNote,filter}) => {

  // используем useDispatch для вытаскивания dispatch'ей из redux
  const dispatch = useDispatch()
  // флаги для показа ошибок
  const [toFav,setToFav] = useState (false)
  const [toUnFav,setToUnFav] = useState (false)
  const [toDelete,setToDelete] = useState (false)
  const [complete,setComplete] = useState (false)

  const popup = (id,set,dis) =>{
    dispatch(dis(id)) 
    set(true)
    setTimeout(()=>{
      set(false)
  },2000)
  }
  
  const onToFavourities = useCallback((id)=>{ // callback dispatch'a добавления в важные
    popup(id,setToFav,toFavourities)
    /*dispatch(toFavourities(id)) 
    setToFav(true)
    setTimeout(()=>{
      setToFav(false)
    },2000)*/
  },[])

  const onToUnFavourities = useCallback((id)=>{ // callback dispatch'a удаления из важных
    popup(id,setToUnFav,unFavourities)
    /*dispatch(unFavourities(id)) 
    setToUnFav(true)
    setTimeout(()=>{
      setToUnFav(false)
    },2000)*/
  },[])

  const onToDelete = useCallback (( id ) =>{
    popup(id,setToDelete,deleteNote)
    /*dispatch(deleteNote(id)) 
    setToDelete(true)
    setTimeout(()=>{
      setToDelete(false)
    },2000)*/
  },[])

  const onToComplete = useCallback (( id ) =>{
    popup(id,setComplete,toComplete)

    /*dispatch(toComplete(id)) 
    setComplete(true)
    setTimeout(()=>{
      setComplete(false)
    },2000)*/
  },[])
  
return(
  <div className={s.container}>
    {newNote&&<NewNote />}
    {filter.length>0&&<TitleNote />}
    <Error error={toFav} timeout={500} className='noteWarning' description='Добавлено в Важные'/>
    <Error error={toUnFav} timeout={500} className='noteWarning' description='Удалено из Важных'/>
    <Error error={toDelete} timeout={500} className='noteDelete' description='Задача удалена'/>
    <Error error={complete} timeout={500} className='noteWarning' description='Задача выполнена !'/>
    <TransitionGroup>
    {filter&&filter.map(n=>(
      <CSSTransition key={n.id} 
      timeout={700}
      classNames="notes"
      >
        <div className={s.note} >
          <div className={s.title}>
            {n.title}
          </div>
          <div className={s.date}>
            {n.date}
          </div>
          <div className={`${s.buttons} ${n.complete&&s.buttonsComplete}`}>
            <button  className={`${s.icon} ${s.iconFavourites} ${n.complete&&s.delete}`} >
              {!n.favourities && <FontAwesomeIcon icon={faStar} onClick={()=>{ onToFavourities(n.id)}}/> }
              {n.favourities && <img src={star} alt='' onClick={()=>{ onToUnFavourities(n.id)}}/>}
              <div className={s.popup}>
                {!n.favourities && 'Отправить в важные'}
                {n.favourities && 'Удалить из важных'}
              </div>
            </button>
            <button  onClick={()=>{ onToComplete(n.id) }}
              className={`${s.icon } ${s.iconGreen} ${n.complete&&s.delete}`} >
              <FontAwesomeIcon icon={faCheck}/> 
              <div className={s.popup}>
                Отправить в выполненные
              </div>
            </button>
            <button onClick={() => onToDelete(n.id)} className={s.icon} >
              <FontAwesomeIcon icon={faTrash}/> 
              <div className={s.popup}>
                Удалить из приложения
              </div>
            </button>
          </div>
        </div>
      </CSSTransition>
    ))}
    </TransitionGroup>
  </div>
);
}
export default Notes;

