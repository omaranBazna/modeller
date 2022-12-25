import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


import { useState } from "react";
export default function Models({user,setUser,setSelected}){
const [models,setModels]=useState([]);
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

     <div className="profile">
           <div className="profile-details">
               <img src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg" />
               <h1>Name</h1>
           </div>
           <div className="collections">
            
           </div>
     </div>
    )
}