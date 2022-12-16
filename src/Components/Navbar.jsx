
import { Link } from "react-router-dom"
export default function (){


    return (

        <nav>
             <ul>
               <li><Link to="/" >Home</Link></li>
               <li><Link to="/models" >Models</Link></li>
               <li><Link to="design">Design</Link></li>
             </ul>
        </nav>
    )
}