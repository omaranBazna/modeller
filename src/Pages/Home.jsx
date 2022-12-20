import SignIn from "../Components/SingIn"
import { useEffect } from "react";
import{singInWithToken} from "../utils/firebase"
export default function Home({user,setUser}){
    useEffect(()=>{

        const userString=window.localStorage.getItem("user")
    
     if(userString !=""){
      const userf=JSON.parse(userString);
     setUser(userf)
    
    
     }
    
      },[])

    return (

     <div className="home">    
             <SignIn user={user} setUser={setUser} />

     </div>
    )
}