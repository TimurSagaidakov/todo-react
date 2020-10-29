import { useDispatch } from "react-redux"
import { useCallback,useState } from 'react'
const dispatch = useDispatch()

export function useNav(flag, navDispatch){
  
  const [value,setValue] = useState(flag)
  
  useCallback((id)=>{ // callback dispatch'a удаления из важных
  dispatch(navDispatch(id)) 
    setValue(true)
    setTimeout(()=>{
      setValue(false)
    },2000)
  },[])
}

export const popup = (id,set,dis) =>{
  dispatch(dis(id)) 
  set(true)
  setTimeout(()=>{
    set(false)
},2000)
}