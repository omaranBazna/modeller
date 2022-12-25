
import { Link } from "react-router-dom"
export default function Navbar({user}){

    return (

        <nav className="navbar">

             <div>
                {user &&
                <Link to="/profile">
                <p>{user.displayName}</p>
                </Link>
               } 
             </div>
        </nav>
    )
}