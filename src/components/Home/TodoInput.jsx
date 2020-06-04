import React, {useEffect, useRef} from 'react'
import { useSelector } from 'react-redux'
import axios from '../../config/axios'

export default function TodoInput({addTodo}) {

   const descRef = useRef()

   const onSubmit = (e) => {
      e.preventDefault()
      addTodo(descRef.current.value)
   }  

   return (
      <div>
         <form onSubmit={onSubmit} className="form-group mt-5">
            <input type="text" className="form-control" placeholder="What do you want to do ?" ref={descRef}/>
            <input className="btn btn-block btn-primary mt-3" type="submit" value="Up!"/>
         </form>
      </div>
   )
}
