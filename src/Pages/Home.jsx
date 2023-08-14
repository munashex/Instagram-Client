import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import { getFollowing } from '../features/fetchUserFollowing';
import { useDispatch, useSelector } from 'react-redux';
import { FcLike } from 'react-icons/fc';

function Home() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [followLoading, setFollowLoading] = useState(false);
  const [unFollowLoading, setUnFollowLoading] = useState(false);
  const [comment, setComment] = useState("") 

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const { following } = useSelector((state) => state.userFollowing);

  useEffect(() => {
    dispatch(getFollowing(userId));
  }, [dispatch]);

  const formatDate = (timestamp) => {
    const currentDate = new Date();
    const previousDate = new Date(timestamp);
    const timeDifference = currentDate - previousDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days === 1 ? '' : 's'} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else {
      return 'Just now';
    }
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
    try {
      const response = await axios.post(`http://localhost:3001/user/like/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user._id === id) {
            return { ...user, likes: response.data.results.likes };
          }
          return user;
        })
      );
    } catch (err) {
      console.log(err);
    }
  }

  const unlikeImage = async (id) => {
    try {
      const response = await axios.post(`http://localhost:3001/user/unlike/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user._id === id) {
            return { ...user, likes: response.data.results.likes };
          }
          return user;
        })
      );
    } catch (err) {
      console.log(err);
    }
  }

  const addComment = async(id) => {
   try {
    const response = await axios.post(`http://localhost:3001/user/comment/${id}`,{comment: comment}, {
      headers: {
        "Content-Type": "application/json", 
        Authorization: `Bearer ${token}`
      }
    });
    
    setUsers((prevUsers) =>
    prevUsers.map((user) => {
      if (user._id === id) {
        return { ...user, comments: response.data.comments };
      }
      return user;
    })
  );

  // Clear the comment input field
  setComment("");
   
   }catch(err) {
    console.log(err)
   }
  }



  return (
    <div className="my-8">
      {loading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="flex flex-col gap-y-6 w-full max-w-xl">
            {users.map((user) => (
              <div key={user._id} className="flex flex-col gap-y-1 border bg-white p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-4">
                    <Link to="/" className="text-lg font-bold">
                      {user?.username}
                    </Link>
                    {user?.user !== userId && (
                      <div className="text-[blue] text-lg">
                        {following?.find((userId) => userId.user === user.user) ?
                          <button onClick={() => UnfollowUser(user?.user)}>following</button> :
                          <button onClick={() => followUser(user?.user)}>follow</button>}
                      </div>
                    )}
                  </div>
                  <span className="text-md text-gray-500">
                    {formatDate(user.createdAt)}
                  </span>
                </div>

                <img src={user.image} alt={user?.username} className="w-full h-auto rounded-md" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-4">
                    {user?.likes?.find((x) => x === userId) ?
                      <button onClick={() => unlikeImage(user?._id)}>
                        <FcLike size={36} className="text-red-500" />
                      </button> :
                      <button onClick={() => likeImage(user?._id)}>
                        <AiOutlineHeart size={36} />
                      </button>
                    }
                    <Link to={`/comments/${user._id}`}>
                      <BiComment size={36} />
                    </Link>
                  </div>
                  <h1 className="text-lg font-bold">{user?.likes?.length === 0 ? null : 
                  `${user?.likes?.length} ${user?.likes?.length === 1 ? "like" : "likes"}`}</h1>
                </div>

                <div className="flex items-center gap-x-4">
                  <Link to="/" className="text-lg font-semibold">
                    {user?.username}
                  </Link>
                  <h1 className="text-lg flex flex-row">{user?.caption}</h1>
                </div>
                
                <div> 
                  {user?.comments?.length === 0 ? null : 
                  <Link to={`/comments/${user._id}`} className="text-[gray]">
                  View {user?.comments?.length}{" "}
                {user?.comments?.length === 1 ? "comment" : "comments"}
                  </Link>
                  }
                </div>

                <div className="flex justify-between">
                <input className="w-[80%] border-b outline-none"
                 placeholder="Add a comment"  
                 onChange={(e) => setComment(e.target.value)}
                 /> 
                <button 
                onClick={() => addComment(user._id)}
                className="text-blue-600 font-bold">
                  {comment?.length === 0 ? null : 'post'} 
                  </button> 
                </div>

              </div>
            ))}
          </div>
        </div>
      )}
      <div className="py-5"></div>
    </div>
  );
}

export default Home;

