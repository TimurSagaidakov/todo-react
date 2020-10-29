import * as  axios from 'axios';
import store from './redux/redux-store';

const instance = axios.create({
  baseURL: `https://example-14a6e.firebaseio.com/`, /* Базовый адрес */
  headers:{
    "API-KEY": "AIzaSyAkgMYvamqVOzWCrUPRpQWpiDZuP94hrxQ" /* ключ для запросов */
  }
})
export const getAllNotes = async () =>{                               //  Загрузка всех задач
  return await instance.get(`note.json`)
}

export const addNoteAPI = async (title) =>{                             //  Добавление задачи
  const note ={
    title, date: new Date().toLocaleDateString(), userId: store.getState().auth.userData.uid
  }
  return await instance.post(`note.json`, note)
}

export const noteChangeToFav = async (id) =>{                         //  Добавление задачи в важные 
  return await instance.put(`note/${id}/favourities.json` , true)
}
export const noteChangeToComplete = async (id) =>{                    //  Добавление задачи в важные 
  return await instance.put(`note/${id}/complete.json` , true)
}
export const noteChangeToUnFav = async (id) =>{                       //  Удаление задач из важных
  return await instance.delete(`note/${id}/favourities.json` , false)
}
export const removeNoteAPI = id =>{                                   //  Удаление задачи вообще
  return instance.delete(`note/${id}.json`)
}
export const removeAllNotesAPI = id =>{                               //  Удаление всех задач
  return instance.delete(`note/${id}.json`)
}






