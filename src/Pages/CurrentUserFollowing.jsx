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
    <div>
        {loading ? ( 
        <div className="flex justify-center my-2">
            <Loader/>
        </div> 
        ) : (
        <div> 
            {following && following.length === 0 ? null : (
                  <div className="border mx-auto  max-w-md my-9">
                  <div className="flex flex-col items-center my-7 md:my-10 "> 
                      {following.map((user) => (
                          <div key={user._id}>
                          <div  className="flex flex-row gap-x-2"> 
                            <img src={user.image} alt={user.username} className="w-20 rounded-full md:w-27"/> 
                            <div className="my-2"> 
                              <h1 className="font-semibold">{user.username}</h1> 
                              <h1>{user.name}</h1> 
                            </div>
                          </div> 
                          <h1 className="border-b my-3"></h1>
                          </div>
                      ))}
                  </div> 
                  </div>
            )}
        </div>
        )}
    </div>
  )
}

export default CurrentUserFollowing