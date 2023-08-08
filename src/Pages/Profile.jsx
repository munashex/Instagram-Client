import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import { IoIosArrowBack } from 'react-icons/io';
import { HiOutlineUser } from 'react-icons/hi';
import { useNavigate, Outlet, Link } from 'react-router-dom'; 
import {useSelector} from 'react-redux'

const Profile = () => {
  
  const {images} = useSelector((state) => state.userImages) 


  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
  }

  

  const getUserInfo = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/user/profile', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center my-7">
          <Loader />
        </div>
      ) : (
        <div>
          {/* back arrow and username */}
          <div className="border-b">
            <div className="flex flex-row items-center lg:hidden py-2  justify-between w-[50%] mx-3">
              <button onClick={() => navigate(-1)}>
                <IoIosArrowBack size={45} />
              </button>
              <h1 className="text-xl">{user?.user?.username}</h1>
            </div>
          </div>

          <div className="flex lg:hidden md:justify-center border-b">
            {user?.userProfile &&
              user?.userProfile.map((item) => (
                <div className="flex gap-x-8 mx-8 my-6" key={item._id}>
                  {!item.image ? (
                    <span className="border rounded-full p-2 bg-gray-200">
                      <HiOutlineUser size={80} />
                    </span>
                  ) : (
                    <img src={item.image} className="w-24 rounded-full" />
                  )}

                  <div className="space-y-2">
                    <h1 className="text-lg font-semibold">{user?.user?.username}</h1>

                    <div className="flex flex-col gap-y-2">
                      <div className="flex flex-row gap-x-3">
                        <Link to="editprofile" className="bg-black text-white rouned-md px-2 rounded-md text-lg">Edit</Link>
                        <h1 className="text-lg">{user?.user?.name}</h1>
                      </div>
                      <h1>{item.bio}</h1>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="hidden lg:flex justify-center  my-8">
            {user?.userProfile &&
              user?.userProfile.map((item) => (
                <div key={item._id} className="flex items-start gap-x-7">
                  {!item.image ? (
                    <span>
                      <HiOutlineUser size={90} className="border p-2 rounded-full bg-gray-200" />
                    </span>
                  ) : (
                    <img src={item.image} className="w-32 rounded-full" />
                  )}
                  <div className="grid grid-cols-1">
                    <div className="flex gap-x-4">
                      <h1 className="text-lg font-semibold">{user?.user?.username}</h1>
                      <Link to="editprofile" className="bg-black text-white py-1 px-2 rounded-md text-lg">Edit Profile</Link>
                    </div>
                    <div className="flex gap-x-6 my-4">

                    <Link to="" className="text-lg"> 
                    <span className="font-semibold text-black">{images?.images?.length}</span> 
                      {images?.images?.length === 1 ? ' image' : ' images'}
                     </Link> 
                     
                     <Link to="videos" className="text-lg">video</Link>
                     <h1 className="text-lg">followers</h1>
                     <h1 className="text-lg">following</h1>
                    </div>
                    <h1 className="text-lg">{user?.user?.name}</h1>
                    <h1>{item.bio}</h1>

                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      <div className="flex lg:hidden items-center md:justify-center justify-between md:mx-0 mx-4 md:gap-x-12 my-4">
      <Link to="" className="text-lg"> 
        <span className="font-semibold text-black">{images?.images?.length}</span> 
          {images?.images?.length === 1 ? ' image' : ' images'}
          </Link> 
                     
         <Link to="videos" className="text-lg">video</Link>
         <h1 className="text-lg">followers</h1>
          <h1 className="text-lg">following</h1>
      </div> 


      <Outlet />
    </div>
  );
};

export default Profile;
