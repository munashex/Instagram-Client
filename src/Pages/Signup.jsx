import {useState} from 'react'  
import {Link, useNavigate} from 'react-router-dom' 
import axios from 'axios'
import { Helmet } from 'react-helmet-async'
 
let instagramImage = 'https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png' 

const Signup = () => {   
    const navigate = useNavigate() 

    const [loading, setLoading] = useState(false)
     const [email, setEmail] = useState('') 
     const [name, setName] = useState('') 
     const [username, setUserName] = useState('')  
     const [password, setPassword] = useState('') 
     

    const onSubmit = async(e) => {
        e.preventDefault()  
        try {
        setLoading(true) 
        const response = await axios.post('https://instagram-backend-onig.onrender.com/api/user/register', {
            name, email, username, password
        }, {
            headers: {
                "Content-Type": 'application/json'
            }
        }) 
        setLoading(false)  
       if(response.status === 201) {
        navigate('/login') 
        return
       } 
        }catch(err) { 
        alert(err.response.data.message)
        setLoading(false) 
        }
        
    }


    return (
       <div>
        <Helmet>
            <title>sign up</title>
        </Helmet>
         <div className="my-5 max-w-md border mx-auto">  

<div className="flex flex-col items-center">
<img src={instagramImage} alt="instagramLogo"  
 className='max-w-xs'
 /> 
</div>  

<h1 className="text-center mb-5 text-xl w-[80%] mx-auto">Sign up to see photos and videos from your friends</h1>

<form className="flex flex-col  w-[80%] mx-auto gap-y-3 mb-8" onSubmit={onSubmit}>
  <input
   className="border p-2 outline-none rounded-md" 
   placeholder="Email" 
   required 
   onChange={(e) => setEmail(e.target.value)} 
   type="email"
   />  

  <input 
  placeholder="name" 
   className="border p-2 outline-none rounded-md" 
   required  
   onChange={(e) => setName(e.target.value)} 
   type="text"
   />
  
  <input placeholder="Username"
   className="border p-2 outline-none rounded-md" 
   required 
   onChange={(e) => setUserName(e.target.value)} 
   type="text"
   />
  
  <input placeholder="Password"
   className="border p-2 outline-none rounded-md"  
   required 
   onChange={(e) => setPassword(e.target.value)} 
   type="password"
   />  

   <button  
   type="submit"
   className="border p-2
    bg-blue-500 rounded-md text-white">
    {loading ? ' Loading...' : 'Sign up '}
    </button> 

 </form> 
 
</div> 

<div className="my-5 max-w-md border mx-auto py-4"> 

<h1 className="text-center">Have an account ?  
<Link to="/login" className="text-[blue]"> login</Link> 
</h1> 

</div>
       </div>
    )
} 

export default Signup