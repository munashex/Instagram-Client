import { useParams, Link, useNavigate } from "react-router-dom" 
import axios  from 'axios'
import { useEffect, useState } from "react" 
import Loader from '../components/Loader'


function SearchedUser() { 
 const {username} = useParams()   
 const [user, setUser] = useState() 
 const [loading, setLoading] = useState(false) 
 const token = localStorage.getItem('token')  
 const navigate = useNavigate() 
 const userId = localStorage.getItem('userId')

 if(!token) {
  navigate('/login') 
  return
 }

 const getUser = async(searched) => {

try {
 setLoading(true) 
 const response = await axios.get(`https://instagram-backend-onig.onrender.com/user/username/${searched}`, {
    headers: {
        "Content-Type": "application/json"
    }
 }) 
 setLoading(false) 
 setUser(response.data.user) 
}catch(err) {
alert(err.response.data.message)
    setLoading(false)
}
 }


useEffect(() => {
getUser(username)
}, [username]) 



  return (
    <div className="my-3">
        {loading ? <div className="flex justify-center"><Loader/></div> : (
            <Link className="flex justify-center my-9 gap-x-2" to={`${userId === user?.user ? '/profile' : `/user/${user?.user}`}`}> 
             <img src={user?.image} className="w-24 md:32 rounded-full"/>
             <div className="flex flex-col"> 
                <h1 className="font-bold text-lg">{user?.username}</h1> 
                <h1>{user?.name}</h1>
             </div>
             </Link>
        )}
    </div>
  )
}

export default SearchedUser