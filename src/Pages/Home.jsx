import SignIn from "../Components/SingIn"
import { useEffect ,useState} from "react";
import { getAllModels } from "../utils/firebase";
import { useNavigate } from "react-router";
import Model from "../Components/Model";
export default function Home({user,setUser,setSelected}){
    const navigator=useNavigate();
   let userf;
    const [models,setModels]=useState([]);


const loadModels=async()=>{
  const data=await getAllModels();
  setModels(data)

}
    useEffect(()=>{
 

        const userString=window.localStorage.getItem("user")
    
     if(!user && userString !=""){
      userf=JSON.parse(userString);
     setUser(userf)
     
     
     
     }
    if(user || userf){
        loadModels();
     }
        
      },[user])



      const openModel=async(model,regions)=>{
        const response=await fetch(regions)
        const text=await response.text()
        const arr=text.split(",").map(x=>eval(x))
    
    
        setSelected({model:model,regions:arr})
        navigator("/design")
        }

      if(!user){
    return (

     <div className="home">    
             <SignIn user={user} setUser={setUser} />

     </div>
    )
      }








      return (

        <div className="model">
     
            {models.map((item,index)=>{
            
             return (
             <div key={index} onClick={()=>{openModel(item.model,item.regions)}}>
             <Model   name={item.name} image={item.demo}></Model>
             </div>)
            })}
   
        </div>
       )


}