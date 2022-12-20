import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import{singInWithToken} from "../utils/firebase"
export default function Models({user,setUser}){
const navigator=useNavigate();

  useEffect(()=>{

    const userString=window.localStorage.getItem("user")

 if(userString !=""){
  const userf=JSON.parse(userString);
 setUser(userf)

 if(!userf){
  navigator("/")
  
 }
 }else{
  navigator("/")
 }

  },[])
    return (

     <div className="model">
       <h1>Model</h1>
         

     </div>
    )
}