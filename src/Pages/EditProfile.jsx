import React from 'react'
import {useState, useEffect} from 'react' 
import axios from 'axios'
import { useNavigate} from 'react-router-dom'



function EditProfile() {
 
  const navigate = useNavigate()

  const [bio, setBio] = useState('') 
  const [image, setImage] = useState(null) 
  const [loading, setLoading] = useState(false)    
  
  const token = localStorage.getItem("token") 
  
  useEffect(() => {
    if(!token) {
      navigate('/login') 
      return
    }
  }, [])
  
  useEffect(() => {
    if(bio.length >= 31) { 
      alert('Kindly furnish words with a maximum length of 30 characters.')
      return 
    }
  }, [bio])

  const handleSubmit = async(e) => {

    e.preventDefault() 
  
    try{
      setLoading(true) 
     const formData = new FormData() 
     formData.append("image", image) 
    formData.append("bio", bio) 
  
    const token = localStorage.getItem("token") 
  
     const response = await axios.put('http://localhost:3001/user/editprofile', formData, {
      headers: {
        "Content-Type": "multipart/form-data", 
        Authorization: `Bearer ${token}`
      }
     })
     navigate('/profile')
     window.location.reload();
     setLoading(false) 
    }catch(err) {
      console.log(err) 
      setLoading(false)
    }
  }


  return (
    <form className="mx-auto w-[90%]  md:w-[70%] lg:w-[50%] border p-3 mt-12" onSubmit={handleSubmit}>
      
      <h1 className="text-2xl mb-2 mx-2">Edit Profile</h1>

      <div className="grid grid-cols-2 mx-2">
        <label htmlFor="profile" className="text-lg text-blue-600">profile photo</label>
        <input type="file" accept='image/*' className="file:border-none file:bg-blue-600 
         file:text-white rounded-md"  
         required
         id="profile"
         onChange={(e) => setImage(e.target.files[0])}
         /> 
        
       </div> 

       <div className="grid grid-cols-2 mx-2 mt-8">
        <label htmlFor='bio' className="text-lg text-blue-600">Bio</label>
      <textarea  className="border outline-none" 
      onChange={(e) => setBio(e.target.value)} id="bio" 
      required
      />  

      <div>
      <button type='submit'  
       disabled={bio.length > 30}
       className="bg-blue-600 mt-6 text-white rounded-md p-2"> 
      {loading ? 'Loading' : 'Submit'} 
      </button>
      </div>

       </div> 

    </form>
  )
}

export default EditProfile