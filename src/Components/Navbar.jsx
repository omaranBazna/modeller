
import { Link } from "react-router-dom"
import { signOutF } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import Profile from "../Pages/Profile";
export default function Navbar({user,profile,setUser}){
  const navigator=useNavigate();
const handleSignOut=async()=>{

await signOutF();

      setUser(null);
      window.localStorage.setItem("user","");
      navigator("/")
 
}
    return (

        <nav className="navbar">
                

                <ul>
                  <li>

                    <Link to="/"> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ__FXi1W9qZMbFZ6pQ-BocV3LQX3Cr9ok96w&usqp=CAU" /></Link>
                  </li>

             <li>
                
                <Link to="/profile">
                  <div className="profile-box">
                    
                    <img src={profile.url} />
                    <p>{profile.name}</p>
                </div>
                </Link>
               
             </li>
             <li>
            
              <button onClick={handleSignOut}>
                Sign Out
              </button>
              
             </li>
             </ul>
        </nav>
        
    )
}