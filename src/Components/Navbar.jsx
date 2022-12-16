
import { Link } from "react-router-dom"
export default function Navbar(){


    return (

        <nav className="navbar">
             <ul>
               <li><Link to="/" >Home</Link></li>
               <li><Link to="/models" >Models</Link></li>
               <li><Link to="design">Design</Link></li>
             </ul>

             <div>
                <img ></img>
             </div>
        </nav>
    )
}