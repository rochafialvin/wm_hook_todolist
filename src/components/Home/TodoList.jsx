import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import axios from '../../config/axios'

export default function TodoList({todos, toggleTodo, deleteTodo}) {
   
   return (
      <div>
         <ul className="list-group list-group-flush mb-5">
            {
               todos.map(({id, completed, description}) => {
                  if(completed){
                     return(
                        <li key={id} onDoubleClick={() => deleteTodo(id) } className="list-group-item d-flex justify-content-between">
                           <span>
                              <del>{description}</del>
                           </span>
            
                           <span>
                              <input onClick={() => { toggleTodo(id, completed) }} className="btn btn-danger" type="button" value="Cancel"/>
                           </span>
                        </li>
                     )
                  }
         
                  return(
                     <li key={id} onDoubleClick={() => deleteTodo(id) } className="list-group-item d-flex justify-content-between">
                        <span>
                           {description}
                        </span>
         
                        <span>
                           <input onClick={() => { toggleTodo(id, completed) }} className="btn btn-primary" type="button" value="Done"/>
                        </span>
                     </li>
                  )
               })
            }
         </ul>
      </div>
   )
}
