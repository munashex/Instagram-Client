import React from 'react' 
import { Link, Outlet } from 'react-router-dom'

let instagramImage = 'https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png'

function CreatePost() { 


const token  = localStorage.getItem("token")  

if(!token) {
  navigate('/login') 
  return
}


  return (
    <div>
    <div className="my-6 flex flex-col items-center">  
       <div className="mx-3  border-none p-2">
       <img src={instagramImage} className="w-32"/>
       <h1 className="text-xl text-center">Create new post</h1>  
        <h1 className="text-lg my-2">Choose between the image and the video below.</h1>
       
       <div className="gap-x-8 my-5 flex flex-row justify-center">
        <Link to="videoupload" className="border text-xl px-4 bg-[blue] text-white rounded-md">Video</Link> 
        <Link to="imageupload" className="border text-xl px-4 bg-[blue] text-white rounded-md">Image</Link>
       </div> 

       </div> 

       
    </div>
    <Outlet/>
    </div>
  )
}

export default CreatePost