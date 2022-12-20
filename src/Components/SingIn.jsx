import { signInF } from "../utils/firebase";
import { signOutF } from "../utils/firebase";
import GoogleButton from 'react-google-button'
import { addToDataBase } from "../utils/firebase";
export default function SignIn({user,setUser}){
   
  
const handleSignIn=async(e)=>{
    e.preventDefault();
    const cred=await signInF();
    if(cred){
        setUser(cred)
    }else{
        setUser(null);
        window.localStorage.setItem("token","");
    }

}
const handleSignOut=async(e)=>{
    e.preventDefault();
    const cred=await signOutF();
    if(cred){
        setUser(cred)
    }else{
        setUser(null);
        window.localStorage.setItem("user","");
    }
    
}

    return (

        <form className="sign-form">
            

           {!user && <GoogleButton onClick={(e)=>{handleSignIn(e)}}/>}
           {user && <button className="sign-out-btn"  onClick={(e)=>{handleSignOut(e)}} type="submit" >Sign Out</button>}

        </form>
    )
}