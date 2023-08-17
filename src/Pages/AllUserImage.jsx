import {useState, useEffect} from 'react'
import { BsCamera } from 'react-icons/bs'; 
import { useNavigate, Link, useOutletContext} from 'react-router-dom'
import Loader from '../components/Loader';
import axios from 'axios'

function AllUserImage() { 
  const {id} = useOutletContext()
  const navigate = useNavigate()
  const token = localStorage.getItem('token');
  const [user, setUser] = useState([]); 
  const [loading, setLoading] = useState(false)

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
  }, []);

  return (
    <div>
      {loading ? <div className="flex justify-center"><Loader/></div>: (
         <div className="my-6"> 
         {user?.images?.length === 0 ? ( 
           <div className="flex flex-col items-center"> 
             <span><BsCamera size={150}/></span>  
             <h1 className="text-2xl font-bold">No Posts Yet</h1>
           </div> 
         ) : (
           <div>
             <div className="ml-0 lg:ml-[18%] lg:mr-12 mt-5">
               <button
                 disabled
                 className="mb-2 mx-2 bg-black text-white rounded-md px-2 text-xl lg:mx-0 border"
               >
                 {user?.images?.length === 1 ? 'Post' : 'Posts'}
               </button>

               <div className="grid gap-x-1 gap-y-1 grid-cols-3 lg:grid-cols-4 items-center">
                 {user?.images && user?.images?.map((image) => {
                   return (
                     <Link to={`/comments/${image._id}`} key={image._id}>
                       <img src={image.image} alt={`${image._id}`} />
                     </Link>
                   );
                 })}
               </div>
             </div>
           </div>
         )}
       </div>
      )}
    </div>
  )
}

export default AllUserImage