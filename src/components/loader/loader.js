import React from 'react';
import s from'./loader.module.css'
const Loader = (props) => {
return(
  <div className={s.container}>
    <div className={s.lds_default}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  </div>
);
}
export default Loader;