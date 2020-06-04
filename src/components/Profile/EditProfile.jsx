import React, {useState, useRef, useEffect} from 'react'
import { useSelector } from 'react-redux'
import axios from '../../config/axios'
import { Redirect } from 'react-router-dom'

export default function EditProfile() {

   const [user, setUser] = useState({})
   const [photo, setPhoto] = useState('')
   const token = useSelector(state => state.auth.token)
   const userName = useSelector(state => state.auth.username)
   const {id, username, name , email, avatar} = user

   const nameRef = useRef()
   const emailRef = useRef()
   const passwordRef = useRef()
   const imageRef = useRef()

   useEffect(() => {
      const config = { headers: { Authorization : token } }

      axios.get(`/user/profile`, config)
         .then(res => setUser(res.data))
         .catch(err => alert(err.response.data.message))
   },[])

   const changeImage = (e) => {
      // memungkinkan untuk melihat foto setelah kita memilih foto di folder
      // menyimpan alamatnya di state.photo
      setPhoto(URL.createObjectURL(e.target.files[0]))
   }

   const updateData = () => {
      // Kirim ke API
      const config = { headers: { Authorization : token } }
      const body = {
         name : nameRef.current.value,
         email : emailRef.current.value,
         password : passwordRef.current.value
      }

      axios.patch(`/user/profile`, body, config)
         .then(res => alert(res.data.message))
         .catch(err => console.log(err.response.data.message))
   }
   

   const updateAvatar = () => {
      // Membuat object formData, karena file harus dikirim dalam bentuk formData
      const body = new FormData()
      
      // Gambar yang diambil dari input file, akan ada di property 'files' , 'files' ini berbentuk array
      let image = imageRef.current.files[0]

      // Data (name, email, password, image) yang sudah berhasil di ambil, akan 'dimasukkan' ke formData
      body.append("avatar", image)

      // Kirim ke API
      const config = { headers: { Authorization : token } }

      axios.post(`/user/avatar`, body, config)
         .then(res => alert(res.data.message))
         .catch(err => console.log(err.response.data.message))
   }


   return userName ? (
      <div className="container"> 
         <h1>Edit Profile</h1>
         <form >
            <div className="form-group">
               <label>Name</label>
               <input className="form-control" type="text" ref={nameRef} defaultValue={name}/>
            </div>

            <div className="form-group">
               <label>Email</label>
               <input className="form-control" type="email" ref={emailRef} defaultValue={email}/>
            </div>

            <div className="form-group">
               <label>Password</label>
               <input className="form-control" type="password" ref={passwordRef}/>
            </div>
            <input onClick={updateData} className="btn btn-outline-primary"  type="button" value="Update data"/>

            <div className="figure-img">
               <img width="200" src={photo} />
            </div>
            <div className="form-group">
               <input type="file" ref={imageRef} onChange={changeImage}/>
            </div>

            <input onClick={updateAvatar} className="btn btn-outline-primary"  type="button" value="Update foto"/>
         </form>

      </div>
   ) : (
      <Redirect to="/login" />
   )
}
