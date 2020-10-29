import s from'./newNote.module.sass';
import React, { useCallback, useState } from 'react';
import {faPen,faArrowRight,faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Error , {warning} from '../error/error';
import { useDispatch } from 'react-redux';
import { postNote } from '../../redux/firebaseReducer';

const NewNote = () => {
  const [editMode, setEditMode] = useState(false)    //Флаг на режим редактирования
  const [title,setTitle] = useState('')              //Значение в поле input 
  const [empty, setEmpty] = useState(false)          //Флаг на проверку пустого поля
  const [maxLength, setMaxLength] = useState(false)  //Флаг на проверку количества символов
  const [send, setSend] = useState(false)            //флаг на отправку сообщения
  
  const dispatch = useDispatch()
  
  let putNote = useCallback(() =>{
    if(title === '' ){        //если пытаются отправить пустое поле
      setEmpty(true)          // обновляем флаг на ложь, потому что поле пустое
    }else if(maxLength){      //Если пытаются отправить поле большее чем 10 символов
      return ''               // обновляем флаг на ложь, потому что поле больше 10 символов
    }
    else{ 
      // warning(props.postNote, setSend, title)  возможное использование шаблона функции 
      dispatch(postNote(title)) //Если всё нормально то постим запись в БД
      setTitle('')            // Обнуляем title
      setSend(true)           // флаг отправки сообщения
      setTimeout(() =>{
        setSend(false)
      }, 2000)
    }
  }, [title])
  
  let changeNote = (e) =>{
    setTitle(e.currentTarget.value) // Изменяем поле input
    setEmpty(false) //Обновляем флаг empty , потому что поле не пустое
    if(title.length > 50){
      setMaxLength(true)
    }else{
      setMaxLength(false)
    }
  }
  let toggleEditMode = () =>{
    setEditMode(!editMode)
  }
  
  return(
    <div className={s.newNote}>
      <Error error={maxLength} timeout={500} className='error' description='Допустимое количество символов : 50'/>
      <Error error={send} timeout={1000} className='success' description='Задача записана !'/>
      <Error error={empty} timeout={500} className='error' description='Ошибка ! пустое поле'/>
      <button onClick={toggleEditMode} className={s.button}>
        {!editMode? <div className={s.buttonNew}>
          <FontAwesomeIcon className={s.buttonNewPen} icon={faPen}/>
          Новая
        </div>
        : <div className={s.buttonNewClose}>
          <FontAwesomeIcon icon={faArrowLeft}/>
        </div>
        }
      </button>
      <div className={`${s.input} ${editMode&& s.inputOn}`}>
        <input onKeyDown={e => e.keyCode === 13 ?  putNote(): ''} onChange={changeNote} value={title}  />
        <button onClick={putNote} className={`${s.buttonSend} ${(empty||maxLength)&&s.disabled}`}>
          <FontAwesomeIcon icon={faArrowRight}/>
        </button>
      </div>
    </div>
  );
}
export default NewNote;