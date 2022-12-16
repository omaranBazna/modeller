
import { Link } from "react-router-dom"
export default function Navbar({user}){


    return (

        <nav className="navbar">
             <ul>
               <li><Link to="/" >Home</Link><div></div></li>
               <li><Link to="/models" >Models</Link><div></div></li>
               <li><Link to="design">Design</Link><div></div></li>
             </ul>

             <div>
                {user &&
                <>
                <img src={user.src} alt="profile image"></img>
                <p>{user.name}</p>
                </>
               } 
             </div>
        </nav>
    )
}