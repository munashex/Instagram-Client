import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation, Outlet } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import { IoIosArrowBack } from 'react-icons/io';


function AllUserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem("userId")
  const location = useLocation();

  if (!token) {
    navigate('/login');
    return null;
  }

  const getUser = async (userProfile) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://instagram-backend-onig.onrender.com/user/userprofile/${userProfile}`);
      setUser(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser(id);
  }, [ id]);

  const followUser = async (userToFollow) => {
    try {
      setFollowLoading(true);
      const response = await axios.post(`https://instagram-backend-onig.onrender.com/user/follow/${userToFollow}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUser(prevUser => ({
        ...prevUser,
        user: {
          ...prevUser.user,
          followers: [...prevUser.user.followers, userId]
        }
      }));

      setFollowLoading(false);
    } catch (err) {
      console.log(err);
      setFollowLoading(false);
    }
  };

  const unFollowUser = async (userToUnfollow) => {
    try {
      setFollowLoading(true);
      const response = await axios.post(`https://instagram-backend-onig.onrender.com/user/unfollow/${userToUnfollow}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUser(prevUser => ({
        ...prevUser,
        user: {
          ...prevUser.user,
          followers: prevUser.user.followers.filter(follower => follower !== userId)
        }
      }));

      setFollowLoading(false);
    } catch (err) {
      console.log(err);
      setFollowLoading(false);
    }
  };

  console.log(user)

  return (
    <div>
      {loading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="border-b flex lg:hidden">
            <div className="flex items-center justify-between p-2 lg:hidden w-[50%]">
              <button onClick={() => navigate(-1)}>
                <IoIosArrowBack size={45} />
              </button>
              <h1 className="text-xl">{user?.media?.username}</h1>
            </div>
          </div>
          <div>
            <div className="flex gap-x-5 mx-5 md:mx-0 md:justify-center my-7">
              <div>
                <img
                  className="md:w-32 w-28 rounded-full"
                  src={user?.media?.image}
                  alt={user?.media?.username}
                />
              </div>
              <div className="flex flex-col gap-y-3">
                <div className="mb-2">
                  <h1 className="text-lg font-bold">{user?.media?.username}</h1>
                  <h1 className="text-lg text-slate-700">{user?.media?.bio}</h1>
                </div>

                <div className="flex gap-x-3">
                  <h1 className="text-lg font-semibold">{user?.media?.name}</h1>
                  {user?.user?.followers?.find(x => x === userId) ?  
                  <button className="bg-blue-600 text-lg text-white px-2 rounded-md"  
                  onClick={() => unFollowUser(user.user._id)}
                  disabled={followLoading}
                  >{followLoading ? 'Loading...' : 'following'}</button>:  
                  <button className="bg-blue-600 text-lg text-white px-2 rounded-md" 
                  onClick={() => followUser(user.user._id)}
                  disabled={followLoading}
                  >{followLoading ? 'Loading...' : 'follow'}</button>}
                </div>

                <div className="hidden lg:flex flex-row gap-x-7 text-lg">
                  <Link to="" className={`${location.pathname === `/user/${user?.user?._id}` && 'font-bold'}`}> 
                  {user?.images?.length} posts</Link>
                  
                  <Link
                  to="following"
                   className={`${location.pathname === `/user/${user?.user?._id}/following` && 'font-bold'}`}
                    >
                    {user?.user?.following?.length} following
                   </Link>
                  <Link
                   to="followers"
                   className={`${location.pathname === `/user/${user?.user?._id}/followers` && 'font-bold'}`}
                   >
                   {user?.user?.followers.length} followers
                 </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex lg:hidden items-center justify-around border p-2 text-lg">
          <Link to="" className={`${location.pathname === `/user/${user?.user?._id}` && 'font-bold'}`}> 
                  {user?.images?.length} posts</Link> 

            <Link
              to="following"
              className={`${location.pathname === `/user/${user?.user?._id}/following` && 'font-bold'}`}
            >
              {user?.user?.following?.length} following
            </Link>
            <Link
              to="followers"
              className={`${location.pathname === `/user/${user?.user?._id}/followers` && 'font-bold'}`}
            >
              {user?.user?.followers.length} followers
            </Link>
          </div>
        </div>
      )}
      <Outlet context={{id: id, userid: user?.user?._id}}/>
    </div>
  );
}

export default AllUserProfile;
