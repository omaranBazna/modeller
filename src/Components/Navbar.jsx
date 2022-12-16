
import { Link } from "react-router-dom"
export default function Navbar(){


    return (

        <nav className="navbar">
             <ul>
               <li><Link to="/" >Home</Link><div></div></li>
               <li><Link to="/models" >Models</Link><div></div></li>
               <li><Link to="design">Design</Link><div></div></li>
             </ul>

             <div>
                <img src="" alt="profile image"></img>
             </div>
        </nav>
    )
}