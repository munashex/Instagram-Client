import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import { getFollowing } from '../features/fetchUserFollowing';
import { useDispatch, useSelector } from 'react-redux';
import {FcLike} from 'react-icons/fc'


function Home() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [followLoading, setFollowLoading] = useState(false);
  const [unFollowLoading, setUnFollowLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const { following } = useSelector((state) => state.userFollowing);

  useEffect(() => {
    dispatch(getFollowing(userId));
  }, [dispatch]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  };

  if (!token) {
    navigate('/login');
    return null;
  }

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/user/users', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setUsers(response.data.users.reverse());
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [dispatch]);

  const followUser = async (id) => {
    try {
      setFollowLoading(true);
      const response = await axios.post(
        `http://localhost:3001/user/follow/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getFollowing(userId));
      setFollowLoading(false);
    } catch (err) {
      console.log(err);
      setFollowLoading(false);
    }
  };

  const UnfollowUser = async (id) => {
    try {
      setUnFollowLoading(true);
      const response = await axios.post(
        `http://localhost:3001/user/unfollow/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getFollowing(userId));
      setUnFollowLoading(false);
    } catch (err) {
      console.log(err);
      setUnFollowLoading(false);
    }
  }


  const likeImage = async (id) => {
    try{
    const response = await axios.post(`http://localhost:3001/user/like/${id}`, null , {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    setUsers((prevUsers) =>
    prevUsers.map((user) => {
      if (user._id === id) {
        return { ...user, likes: response.data.results.likes };
      }
      return user;
    })
  );
    }catch(err) {
      console.log(err)
    }
  }

  const UnlikeImage = async (id) => {
    try{
    const response = await axios.post(`http://localhost:3001/user/unlike/${id}`, null , {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    setUsers((prevUsers) =>
    prevUsers.map((user) => {
      if (user._id === id) {
        return { ...user, likes: response.data.results.likes };
      }
      return user;
    })
  );
    }catch(err) {
      console.log(err)
    }
  }



  return (
    <div className="my-9">
      {loading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="flex flex-col items-center gap-y-6">
            {users.map((user) => (
              <div key={user._id} className="flex flex-col gap-y-1">
                <div className="mx-4 flex gap-x-8">
                  <Link to="/" className="text-lg font-bold">
                    {user?.username}
                  </Link>
                  {user?.user === userId ? null : (
                    <div className="text-[blue] text-lg"> 
                    {following?.find((userId) => userId.user === user.user) ? 
                     <button onClick={() => UnfollowUser(user?.user)}>unfollow</button> :
                     <button onClick={() => followUser(user?.user)} >follow</button>}
                    </div>
                  )}
                  
                </div>

                <img src={user.image} alt={user?.username} />

                <div className="mx-4 flex gap-x-8">
                {user?.likes?.find((x) => x === userId) ? 
                 <button onClick={() => UnlikeImage(user?._id)}><FcLike size={36}/></button> : 
                 <button onClick={() => likeImage(user?._id)}><AiOutlineHeart size={36}/></button> 
                 }
                  <button>
                    <BiComment size={36} />
                  </button>
                </div>

                <div className="mx-4 flex flex-row gap-x-4">
                  <h1 className="text-lg font-bold">{user?.likes?.length === 0 ? null : 'likes '}{user?.likes?.length === 0 ? null : user?.likes?.length}</h1>
                  <span className="text-md text-gray-500">
                    {formatDate(user.createdAt)}
                  </span>
                 </div>

                <div className="mx-4 flex gap-x-2">
                  <Link to="/" className="text-lg font-semibold">
                    {user?.username}
                  </Link>
                  <h1 className="text-lg flex flex-row">{user?.caption}</h1>
                </div>

              
                <div className="border-t-2 py-2">
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
