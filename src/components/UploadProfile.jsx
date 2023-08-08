import React from 'react'  
import {useState, useEffect} from 'react' 
import axios from 'axios'
import Login from '../Pages/Login'
import { useNavigate} from 'react-router-dom'

let instagramImage = 'https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png' 

function UploadProfile() { 
  const navigate = useNavigate()

const [bio, setBio] = useState('') 
const [image, setImage] = useState(null) 
const [loading, setLoading] = useState(false)    

const token = localStorage.getItem("token") 

useEffect(() => {
  if(token) {
    navigate('/') 
    return
  }
}, [])

useEffect(() => {
  if(bio.length >= 31) { 
    alert('Kindly furnish words with a maximum length of 30 characters.')
    return 
  }
}, [bio])

const currentUser = localStorage.getItem('token')

const handleSubmit = async(e) => {

  e.preventDefault() 

  try{
    setLoading(true) 
   const formData = new FormData() 
   formData.append("image", image) 
  formData.append("bio", bio) 

  const token = localStorage.getItem("token") 

   const response = await axios.post('http://localhost:3001/user/profile', formData, {
    headers: {
      "Content-Type": "multipart/form-data", 
      Authorization: `Bearer ${token}`
    }
   })
   navigate('/')
   setLoading(false) 
  }catch(err) {
    console.log(err) 
    setLoading(false)
  }
}

  return (
    <div>
    {
      currentUser ? (
        <div>
        <div className="max-w-sm w-[90%] border-t border-b md:border md:max-w-lg mx-auto  my-7 p-4 ]"> 
        <div className="flex justify-center">
          <img src={instagramImage} alt="instram" className="w-[50%]"/>
        </div>
          <form className="space-y-5 my-4" onSubmit={handleSubmit}>
    
            <div className="flex flex-col items-center gap-y-2 ">
              <label className="text-lg" htmlFor='profile'>Prolife photo</label> 
              <input type="file" accept='image/*' 
              className="file:text-white  
              file:bg-[blue] file:border-none file:rounded-md file:px-1 file-py-1"  
              onChange={(e) => setImage(e.target.files[0])} 
              id="profile"  
              required
              />
            </div> 
    
            <div className="flex flex-col items-center gap-y-2">
              <label className="text-lg" htmlFor='bio'>Bio</label>  
              <textarea className="w-[80%]  border outline-none h-14 text-center"  
               onChange={(e) => setBio(e.target.value)} id="bio" 
               required 
              />
            </div> 
            
            <div className="flex flex-row justify-center">
            <button 
            disabled={bio.length > 30}
            type="submit"
            className={`${loading ? `bg-[green] text-white px-2 py-1 lg:w-[25%] rounded-md w-[50%] md:w-[30%]`: 
             `bg-[blue] text-white px-2 py-1 lg:w-[25%] rounded-md w-[50%] md:w-[30%]`}`}>
              {loading? 'Loading...': 'Submit'}</button>
            </div> 
    
          </form> 
        </div>  
</div>
      ): (
<Login/>
      )
    } 
    </div>
  )

}

export default UploadProfile