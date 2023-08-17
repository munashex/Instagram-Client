import React, { useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowers } from '../features/fetchUserFollowers';
import { useNavigate, Link , useOutletContext} from 'react-router-dom';

function Followers() {
  const dispatch = useDispatch();
  const { loading, error, followers } = useSelector((state) => state.userFollowers);
  const navigate = useNavigate();
  const {userid} = useOutletContext()
  const userId = localStorage.getItem("userId")

  const token = localStorage.getItem("token");

  if (!token) {
    navigate('/login');
    return null;
  }

  useEffect(() => {
    dispatch(getFollowers(userid));
  }, [userid]);

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
                  <Link key={user?._id} className="flex items-center" to={`${user.user === userId ? '/profile' : `/user/${user.user}`}`}>
                    <h1  className="flex item-center">
                      <img src={user?.image} alt={user?.username} className="w-20 rounded-full md:w-27" />
                    </h1>
                    <div className="flex flex-col ml-2">
                      <h1 className="mb-1">{user?.name}</h1>
                      <h1  className="text-gray-600">@{user?.username}</h1>
                    </div>
                  </Link>
                ))}
              
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Followers;