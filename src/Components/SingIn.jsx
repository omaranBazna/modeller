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

        <form className="sign-form">
            

           {!user && <button className="sign-in-btn" onClick={(e)=>{handleSignIn(e)}} type="submit" >LogIn</button>}
           {user && <button className="sign-out-btn"  onClick={(e)=>{handleSignOut(e)}} type="submit" >Sign Out</button>}

        </form>
    )
}