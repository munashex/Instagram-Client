import {useState, useEffect} from 'react'
import Loader from '../components/Loader' 
import axios from 'axios' 
import {Link} from 'react-router-dom'
import {AiOutlineHeart} from 'react-icons/ai' 
import {BiComment} from 'react-icons/bi'

function Home() { 
const [loading, setLoading] = useState(false) 
const [users, setUsers] = useState([]) 


const getUsers = async () => {
  try {
    setLoading(true)
   const response = await axios.get('http://localhost:3001/user/users', {
    headers: {
      "Content-Type": "application/json"
    }
   }) 
   setUsers(response.data.users.reverse()) 
   setLoading(false)
  }catch(err) {
    console.log(err) 
    setLoading(false)
  }
}

useEffect(() => {
  getUsers()
}, [])


  return (
    <div className="my-9">
    {loading ? 
    <div className="flex justify-center"> 
      <Loader/> 
      </div> : (
      <div className="flex flex-col items-center gap-y-9 divide-y-2">
        {users && users.map((user) => (
          <div key={user._id} className="flex flex-col gap-y-2"> 

          <div className="mx-4 flex gap-x-8"> 
            <Link className="text-lg font-bold">{user?.username}</Link>  
            <button className="text-[blue] text-lg font-semibold">Follow</button>
          </div>

            <img src={user.image} alt={user.username} />

            <div className="mx-4 flex gap-x-8"> 
              <button><AiOutlineHeart size={36}/></button>
              <button><BiComment size={36}/></button>
            </div>
            
            <div className="mx-4 flex gap-x-2"> 
            <Link className="text-lg font-semibold">{user?.username}</Link> 
            <h1 className="text-lg flex flex-row">{user?.caption}</h1>  
            </div>
          </div>
        ))}
      </div>
    )}
    </div>
  )
}

export default Home