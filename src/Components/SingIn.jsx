export default function SignIn({user}){
   
  
const handleSignIn=async(e)=>{
    e.preventDefault();

}
const handleSignOut=async(e)=>{
    e.preventDefault();
    
}

    return (

        <form>
            

           {!user && <button onClick={(e)=>{handleSignIn(e)}} type="submit" >LogIn</button>}
           {user && <button onClick={(e)=>{handleSignOut(e)}} type="submit" >Sign Out</button>}

        </form>
    )
}