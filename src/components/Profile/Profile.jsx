import React, {useState, useEffect} from 'react'
import {Jumbotron} from 'reactstrap'
import axios from '../../config/axios'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'


export default function Profile() {

   const [user, setUser] = useState({})
   const token = useSelector(state => state.auth.token)
   const userName = useSelector(state => state.auth.username)
   const {id, username, name , email, avatar} = user

   useEffect(() => {
      const config = { headers: { Authorization : token } }

      axios.get(`/user/profile`, config)
         .then(res => setUser(res.data))
         .catch(err => alert(err.response.data.message))
      
   }, [])

   return userName ?(
      <div className="container">
         <Jumbotron>
            <img src={avatar} alt={name}/>
            <h1>Hello, {name}</h1>
            <p>{username} | {name} | {email}</p>
         </Jumbotron>
      </div>
   ) : (
      <Redirect to='/login' />
   )
}
