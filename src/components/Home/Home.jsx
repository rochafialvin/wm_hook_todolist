import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import axios from '../../config/axios'

import TodoInput from './TodoInput'
import TodoList from './TodoList'

export default function Home() {

   const [todos, setTodos] = useState([])

   const username = useSelector(state => state.auth.username)
   const token = useSelector(state => state.auth.token)

   useEffect(() => {
      getTodos()
   }, [])

   const getTodos = () => {
      // jika sudah login
      if(username){
         // menggunakan access token untuk request ke API
         const config = { headers: { Authorization : token } }
         // melakukan proses request
         axios.get(`/todo`, config)
         // jika berhasil, data akan disimpan di state
         .then(res => setTodos(res.data))
         // jika gagal akan menampilkan pesan error di console
         .catch(err => alert(err.response.data.message))
      }
   }

   const addTodo = (description) => {

      // mempersiapkan access token dan body
      const config = { headers: { Authorization : token } }
      const body = { description }

      // melakukan proses request untuk menambah data baru
      axios.post(`/todo`, body, config)
         // kalau berhasil, kemudian akan request data ulang
         .then(res => getTodos())
         // kalau gagal, akan munculkan di console
         .catch(err => alert(err.response.data.message))
   }

   // jika menekan tombone 'Done', mengubah status completed
   const toggleTodo = (id, completed) => {

      // mempersiapkan access token dan body
      const config = { headers: { Authorization : token } }
      const body = {completed: !completed}

      // melakukan proses request untuk mengubah status completed
      axios.patch(`/todo/${id}`, body, config )
         // kalau berhasil, kemudian akan request data ulang
         .then(res => getTodos())
         // kalau gagal, akan munculkan di console
         .catch(err => alert(err.response.data.message))
   }

   const deleteTodo = (id) => {
      // mempersiapkan access token dan body
      const config = { headers: { Authorization : token } }

      axios.delete(`/todo/${id}`, config)
         .then(res => getTodos())
         .catch(err => alert(err.response.data.message))
   }


   return username ? (
      <div className="container" >
         <h1 className="text-center" >Home Component</h1>
         <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
         <TodoInput addTodo={addTodo} />
      </div>
   ) : (
      <Redirect to='/login'/>
   )
}
