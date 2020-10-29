//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import s from'./header.module.sass';
import {logout} from '../../redux/authReducer';
import {toggleDarkTheme} from '../../redux/firebaseReducer';
import {loginGoogle} from '../../firebase-config';
import firebase from 'firebase';

//import logo from '../../assets/img/checkfront-icon.svg';
//import { faBuromobelexperte } from '@fortawesome/free-brands-svg-icons'


const Header = ({darkTheme}) => {
  const { userName, email, uid }  = useSelector(state =>state.auth.userData) // Получение объекта и деструктуризация данных из state
  const isAuth = useSelector(state =>state.auth.auth) // Получение флага об авторизации
  const dispatch = useDispatch(); 
  
  const changeTheme = useCallback(() =>{      // Смена темы
    dispatch(toggleDarkTheme())
  }, [])
  const logoutGoogle = useCallback(()=>{ // Получение callback dispatch'a выхода из профиля
    dispatch(logout())
  },[])
  
  const Logout = ()=>{
    firebase.auth().signOut().then(function() { //Выход из аккаунта google
      logoutGoogle()
    }).catch(function(error) {
      // An error happened.
    });
  }
  return(
    <div className={s.container}>
      {isAuth
      ? <div className={s.login}>
          <div className={s.userName}>
            {userName}
          </div>
          <button className={`${s.googleButton} ${darkTheme&&s.dark}`} onClick={Logout}> Выйти </button>
        </div>
      : <div className={s.login}>
          <button className={`${s.googleButton} ${darkTheme&&s.dark}`} onClick={loginGoogle}> Войти в google</button>
        </div>
      }
      <div className={s.name}>
        Задачник
      </div>
      <div>
      </div>
      {isAuth 
      
      }
      <div className={s.buttonWrapper}>
        <button className={`${s.button} ${darkTheme&&s.dark}`} onClick={changeTheme}>
          Сменить тему
        </button>
      </div>
    </div>
  )
}
export default Header
