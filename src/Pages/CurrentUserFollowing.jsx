import {useEffect} from 'react' 
import axios from 'axios' 
import Loader from '../components/Loader'  
import { useDispatch, useSelector } from 'react-redux' 
import { getFollowing } from '../features/fetchUserFollowing' 
import { useNavigate } from 'react-router-dom'


function CurrentUserFollowing() { 
 
const dispatch = useDispatch()
const {loading, error, following} = useSelector((state) => state.userFollowing)
const userId = localStorage.getItem("userId") 
const navigate = useNavigate()

const token = localStorage.getItem("token") 

if(!token) {
navigate('/login')  
return
}



useEffect(() => {
 dispatch(getFollowing(userId))
}, [])



  return (
    <div className="flex justify-center">
    <div>
      {loading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <div className="my-12">
          {following?.length === 0 ? null : (
            <div className="flex flex-col mx-auto gap-y-4">
              {following.map((user) => (
                <div key={user?._id} className="flex items-center">
                  <div className="flex item-center">
                    <img src={user?.image} alt={user?.username} className="w-20 rounded-full md:w-27" />
                  </div>
                  <div className="flex flex-col ml-2">
                    <h1 className="mb-1">{user?.name}</h1>
                    <h1 className="text-gray-600">@{user?.username}</h1>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  </div>
  )
}

export default CurrentUserFollowing