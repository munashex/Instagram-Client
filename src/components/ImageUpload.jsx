import React from 'react'
import { useNavigate} from 'react-router-dom' 
import {useState} from 'react' 
import axios from 'axios' 




function ImageUpload() {  


const [image, setImage] = useState(null) 
const [caption, setCaption] = useState('')  
const [loading, setLoading] = useState(false) 

const navigate = useNavigate()
const token  = localStorage.getItem("token")  


if(!token) {
  navigate('/login') 
  return
}





const handleSubmit = async() => {
try {
setLoading(true) 
const formData = new FormData()  
formData.append("image", image) 
formData.append("caption", caption)
const response = await axios.post('http://localhost:3001/post/image', formData, {
  headers: {
    "Content-Type": "multipart/form-data", 
    Authorization: `Bearer ${token}`
  } 
}) 

console.log(response)
if(response.status === 201) {
   navigate('/profile') 
}
setLoading(false)
}catch(err) {
  console.log(err) 
  setLoading(false)
}
}



  return (
    <div className="w-[90%] md:w-[70%] lg:w-[60%] mx-auto border  my-9">
    <div className="flex flex-col md:flex-row items-center my-6 justify-evenly gap-y-7">
        <div className="flex flex-col gap-y-2">
            <label className="text-xl" htmlFor='image'>Image</label> 
            <input type="file" id="image" accept='image/*'   
            required
            onChange={(e) => setImage(e.target.files[0])}
            className="file:bg-gray-200 file:border-none file:text-lg file:p-2 file:rounded-md"
            />
        </div> 

        <div className="flex flex-col gap-y-2">
            <textarea 
            onChange={(e) => setCaption(e.target.value)}
             className="border text-center py-1 w-80 h-24 outline-none placeholder:py-6 placeholder:text-center" placeholder="Caption"/>
         </div>  
    </div> 

    <div className="flex flex-col items-center my-8">
         <button onClick={handleSubmit} className={`${loading ? `bg-[green] text-lg text-white p-2 rounded-md w-24`: 
         `bg-[blue] text-lg text-white p-2 rounded-md w-24`}`}>
          {loading ? 'Loading..': 'Submit'}
        </button>
         </div>
    </div>
  )
} 



export default ImageUpload