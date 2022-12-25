import SignIn from "../Components/SingIn"
import { useEffect } from "react";
import { useNavigate } from "react-router";
export default function Home({user,setUser}){
    const navigator=useNavigate();
    useEffect(()=>{

        const userString=window.localStorage.getItem("user")
    
     if(userString !=""){
      const userf=JSON.parse(userString);
     setUser(userf)
     
     if(user || userf){
    navigator("/models")

     }
    
     }
    
      },[])

    return (

     <div className="home">    
             <SignIn user={user} setUser={setUser} />

     </div>
    )
}