import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React  from 'react';
import s from'./sidebar.module.sass';
import {faClipboardList , faStar,faClipboardCheck, faBars} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
const Sidebar = ({darkTheme}) => {
return (
 <nav className={`${s.container} `}>
      <div className={s.point}>
        <NavLink exact to='/' className={`${s.link} ${darkTheme&&s.dark}`} activeClassName={s.activeLink}>
          <FontAwesomeIcon icon={faClipboardList} />
          <span>Все задачи</span>
        </NavLink>
      </div>
      <div className={s.point}>
        <NavLink to='/regular' className={`${s.link} ${darkTheme&&s.dark}`} activeClassName={s.activeLink}>
          <FontAwesomeIcon icon={faBars} />
          <span>Обычные</span>
        </NavLink>
      </div>
      <div className={s.point}>
        <NavLink to='/important' className={`${s.link} ${darkTheme&&s.dark}`} activeClassName={s.activeLink}>
          <FontAwesomeIcon icon={faStar} />
          <span>Важные</span>
        </NavLink>
      </div>
      <div className={s.point}>
        <NavLink to='/complete' className={`${s.link} ${darkTheme&&s.dark}`} activeClassName={s.activeLink}>
          <FontAwesomeIcon icon={faClipboardCheck} />
          <span>Выполненные</span>
        </NavLink>
      </div>
  </nav>
)
}
export default Sidebar;