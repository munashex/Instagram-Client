import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom'; 
import {useSelector, useDispatch} from 'react-redux' 
import {getFollowing} from '../features/fetchUserFollowing' 
import { getFollowers } from '../features/fetchUserFollowers';
import { Helmet } from 'react-helmet-async';


const Profile = () => {
  
  const {images} = useSelector((state) => state.userImages) 
  const {following} = useSelector((state) => state.userFollowing)
  const {followers} = useSelector((state) => state.userFollowers)
  const location = useLocation()


  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false); 
  const userId = localStorage.getItem('userId')

  const navigate = useNavigate(); 
  const dispatch = useDispatch()

  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
  }
  
  //dispatching every time when user follow another user 
  useEffect(() => {
  dispatch(getFollowing(userId)) 
  dispatch(getFollowers(userId))
  }, [dispatch])
  
  
 

  const getUser = async() => {
   try {
    setLoading(true)
   const response = await axios.get(`https://instagram-backend-onig.onrender.com/user/profile/${userId}`, {
    headers: {
      "Content-Type": "application/json", 
      Authorization: `Bearer ${token}`
    }
   }) 
   if(response.status === 200) { 
    setUser(response.data.user)
   }
   setLoading(false)
   }catch(err) {
    console.log(err) 
    setLoading(false)
   }
  }
  
useEffect(() => {
getUser()
}, []) 

const Logout = () => {
  localStorage.clear() 
  window.location.reload()
}


  return (
    <div>
    
    <Helmet>
      <title>{user?.username}</title>
    </Helmet>
  
      {/* top nav for user on md and sm screens  */}
      <div className="border-b flex lg:hidden">
      <div className="flex items-center justify-between  mx-3  w-[90%]  p-2 lg:hidden">
        <button onClick={() => navigate(-1)}><IoIosArrowBack size={45}/></button> 
        <h1 className="text-xl">{user?.username}</h1> 
        <button onClick={Logout} className="bg-blue-600 text-white px-2 text-lg rounded-md">logout</button>
      </div> 

      </div>
      <div>

       <div className="flex gap-x-5 mx-5 md:mx-0 md:justify-center my-7">
       
       <div>
       <img className="md:w-32 w-28 rounded-full"  
       src={user?.image} alt={user?.username}
       />
       </div>

       <div className="flex flex-col gap-y-3"> 

        <div className="mb-2">
       <h1 className="text-lg font-bold">{user?.username}</h1>  
       <h1 className="text-lg text-slate-700">{user?.bio}</h1>
       </div>
        
       <div className="flex  gap-x-3">
       <h1 className="text-lg font-semibold">{user?.name}</h1> 
       <Link to="editprofile" className="px-2 py-0.5  rounded-md text-lg text-white bg-blue-600">Edit</Link> 
       </div> 
       

    
       <div className="hidden lg:flex flex-row gap-x-7 text-lg">
       <Link to="/profile">{images?.images?.length} posts</Link> 

       <Link to="userfollowing" className={`${location.pathname === '/profile/userfollowing' && `font-bold`}`}> 
       {following?.length} following</Link>

      <Link to="userfollowers" className={`${location.pathname === '/profile/userfollowers' && `font-bold`}`}> 
      {followers?.length} followers</Link>
       </div>

       </div>
       </div>
      </div> 

      <div className="flex lg:hidden items-center justify-around border p-2 text-lg">
      <Link to="/profile">{images?.images?.length} posts</Link> 
      
      <Link to="userfollowing" className={`${location.pathname === '/profile/userfollowing' && `font-bold`}`}> 
       {following?.length} following</Link>

      <Link to="userfollowers" className={`${location.pathname === '/profile/userfollowers' && `font-bold`}`}> 
      {followers?.length} followers</Link>
      
      </div>

   
      <Outlet />
    </div>
  );
};

export default Profile;
