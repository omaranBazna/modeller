
import { Link } from "react-router-dom"
export default function Navbar({user}){

    return (

        <nav className="navbar">
                

                <ul>
                  <li>

                    <Link to="/"> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ__FXi1W9qZMbFZ6pQ-BocV3LQX3Cr9ok96w&usqp=CAU" /></Link>
                  </li>
             <li>
                {user &&
                <Link to="/profile">
                <p>{user.displayName}</p>
                </Link>
               } 
             </li>
             <li>
              <button>
                Sign Out
              </button>
             </li>
             </ul>
        </nav>
    )
}