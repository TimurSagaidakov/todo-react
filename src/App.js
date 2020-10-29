import React, { useEffect } from 'react';
import s from'./app.module.sass';
import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';
import Main from './components/main/main';
import { useSelector, useDispatch } from 'react-redux';
import {initializedApp} from './redux/authReducer';
import Loader from './components/loader/loader';

function App() {
  const darkTheme = useSelector(state =>state.firebase.darkTheme)
  const dispatch = useDispatch(); 
  const initialized = useSelector(state => state.auth.initialized)
  useEffect(()=>{ 
    dispatch(initializedApp())
  },[])
  if(initialized === false){ return <Loader/> }
  return  (
    <div className={`${s.container} ${darkTheme&&s.dark}`}>
          <Header darkTheme={darkTheme} />
          <div className={s.content}>
            <Sidebar darkTheme={darkTheme} />
            <Main darkTheme={darkTheme}/>
          </div>
    </div>
  )
}

export default App;
