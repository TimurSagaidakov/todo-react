import React from 'react';
import s from'./titleNote.module.sass';

const TitleNote = () => {
return(
  <div className={s.container}>
    <div className={s.point}>
      Текст задачи
    </div>
    <div className={s.point}>
      Дата
    </div>
    <div className={s.point}>
      Управление
    </div>
  </div>
);
}
export default TitleNote;