import React, { useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowers } from '../features/fetchUserFollowers';
import { useNavigate, Link } from 'react-router-dom';

function CurrentUserFollowers() {
  const dispatch = useDispatch();
  const { loading, error, followers } = useSelector((state) => state.userFollowers);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  if (!token) {
    navigate('/login');
    return null;
  }

  useEffect(() => {
    dispatch(getFollowers(userId));
  }, []);

  return (
    <div className="flex justify-center">
      <div>
        {loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          <div className="my-12">
            {followers?.length === 0 ? null : (
              <div className="flex flex-col mx-auto gap-y-4">
                {followers.map((user) => (
                  <div key={user?._id} className="flex items-center">
                    <Link to={`/user/${user.user}`} className="flex item-center">
                      <img src={user?.image} alt={user?.username} className="w-20 rounded-full md:w-27" />
                    </Link>
                    <Link to={`/user/${user.user}`} className="flex flex-col ml-2">
                      <h1 className="mb-1">{user?.name}</h1>
                      <Link to={`/user/${user.user}`} className="text-gray-600">@{user?.username}</Link>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CurrentUserFollowers;
