import SignIn from "../Components/SingIn"
export default function Home({user,setUser}){


    return (

     <div className="home">    
             <SignIn user={user} setUser={setUser} />

     </div>
    )
}