import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginAction } from '../config/redux/actions'

import Home from './Home/Home'
import Header from './Header/Header'
import Register from './Register/Register'
import Login from './Login/Login'
import Profile from './Profile/Profile'
import EditProfile from './Profile/EditProfile'


export default function App() {

   const [loading, setLoading] = useState(true)
   const dispatch = useDispatch()

   useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'))

      if(user) dispatch(loginAction(user)) 
      setLoading(false)

   }, [])

   return loading ? (
      <h1 className="text-center">L O A D I N G ...</h1>
   ) : (
      <div>
         <BrowserRouter>
            <div>
               <Header/>
               <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/register" exact component={Register} />
                  <Route path="/login" exact component={Login} />
                  <Route path="/profile" exact component={Profile} />
                  <Route path="/editprofile" exact component={EditProfile} />
               </Switch>
            </div>
         </BrowserRouter>
      </div>
   )
}
