import { signInF } from "../utils/firebase";
import { signOutF } from "../utils/firebase";
export default function SignIn({user,setUser}){
   
  
const handleSignIn=async(e)=>{
    e.preventDefault();
    const cred=await signInF();
    if(cred){
        setUser(cred)
    }else{
        setUser(null);
    }

}
const handleSignOut=async(e)=>{
    e.preventDefault();
    const cred=await signOutF();
    if(cred){
        setUser(cred)
    }else{
        setUser(null);
    }
    
}

    return (

        <form>
            

           {!user && <button onClick={(e)=>{handleSignIn(e)}} type="submit" >LogIn</button>}
           {user && <button onClick={(e)=>{handleSignOut(e)}} type="submit" >Sign Out</button>}

        </form>
    )
}