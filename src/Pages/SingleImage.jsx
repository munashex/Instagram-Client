import React from 'react'
import {useParams, useNavigate} from 'react-router-dom' 
import axios from 'axios' 
import {useState, useEffect} from 'react'
import Loader from '../components/Loader'  
import {RiDeleteBin4Line} from 'react-icons/ri'  
import {InfinitySpin} from 'react-loader-spinner' 


function SingleImage() {  

const navigate = useNavigate()
const {imageId} = useParams()
const [image, setImage] = useState({}) 
const [loading, setLoading] = useState(false)   
console.log(image)

const token = localStorage.getItem("token") 

if(!token) {
  navigate('/login') 
  return
}

if(!image) {
  navigate('/profile') 
  return
}

const getImage = async() => {
  try {
   setLoading(true) 
   const response = await  axios.get(`http://localhost:3001/post/image/${imageId}`, {
    headers: {
      "Content-Type": "application/json", 
      Authorization: `Bearer ${token}`
    }
   }) 
   setImage(response.data.image) 
   setLoading(false)
  }catch(err) {  
    console.log(err) 
    setLoading(false)
  }
} 

useEffect(() => {
 getImage()
}, []) 

const deleteImage  = async(id) => {
 try {
   setLoading(true) 
   const response = await axios.delete(`http://localhost:3001/post/image/delete/${id}`, {
    headers: {
      "Content-Type": "application/json", 
      Authorization: `Bearer ${token}`
    }
   }) 
  if(response.status === 200) {
    navigate('/profile') 
    return
  } 
  setLoading(false)
 }catch(err) {
 console.log(err) 
 setLoading(false)
 }
}

  return (
    <div>
    {loading ? 
    <div className="flex flex-row justify-center"> 
  <Loader/>
    </div>  
    :  
    ( 
    <div className="w-[70%] md:w-[40%]   lg:w-[30%] mx-auto bg-[whitesmoke] shadow"> 
    <img src={image.image}/>  
    <div className="flex flex-row mb-20">
    <h1 className="my-2 text-lg mx-4">{image.caption}</h1> 

    <button onClick={() => deleteImage(image._id)}>{loading ? <InfinitySpin width="100" color="red"/> : 
    <RiDeleteBin4Line size={30} color="red" className="my-1  mx-4"/>} 
    </button> 

    </div>
     </div> 
    )}
    </div>
  )
}

export default SingleImage