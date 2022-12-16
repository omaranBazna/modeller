import SignIn from "../Components/SingIn"
export default function Home({user,setUser}){


    return (

     <div>
       
             <SignIn user={user} setUser={setUser} />
        
     


     </div>
    )
}