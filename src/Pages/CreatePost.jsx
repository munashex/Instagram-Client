import React from 'react' 
import { Link, Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
 

let instagramImage = 'https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png'

function CreatePost() { 


const token  = localStorage.getItem("token")  

if(!token) {
  navigate('/login') 
  return
}


  return (
    <div >
      <Helmet>
        <title>Create</title>
      </Helmet>
    <div className="my-6 flex flex-col items-center border  w-[90%] md:w-[60%] lg:w-[40%] mx-auto">  
       <div className="mx-3  border-none p-2">
       <img src={instagramImage} className="w-32 mx-auto"/>
       <h1 className="text-xl text-center">Post a Fresh Photograph</h1>  

       <div className="gap-x-8 my-5 flex flex-row justify-evenly">
        <button disabled  className="border w text-xl px-4 bg-[blue] text-white rounded-md">Image</button>
       </div> 

       </div> 

       
    </div>
    <Outlet/>
    </div>
  )
}

export default CreatePost