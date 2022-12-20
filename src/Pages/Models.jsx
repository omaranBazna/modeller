import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
export default function Models({user}){
const navigator=useNavigate();

  useEffect(()=>{
if(!user){
  navigator("/")
}
  },[])
    return (

     <div className="model">
       <h1>Model</h1>
         

     </div>
    )
}