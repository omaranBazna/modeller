import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


import { useState } from "react";
export default function Profile({user,setUser,setSelected}){
const [editable,setEditable]=useState(true);
const [name,setName]=useState("");
const navigator=useNavigate();

const handleEdit=()=>{
    setEditable(false);
    document.getElementById("profile-name").select();
}

const handleSave=()=>{

}
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
            <label>

          <img src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg" />
               <img className="profile-image-edit" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Edit_icon_%28the_Noun_Project_30184%29.svg/1024px-Edit_icon_%28the_Noun_Project_30184%29.svg.png" />
           <input type="file"
       id="avatar" name="avatar"
       accept="image/png, image/jpeg">
</input> 
           </label> 
                
           
              
               <div className="profile-name">
                
                {user &&
                
                <input id="profile-name" readOnly={editable} value={name} onChange={(e)=>{setName(e.target.value)}} onBlur={()=>{setEditable(true)} }   />

                }

                <img onClick={handleEdit}  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLwQHBxiWVdO-bvNZEtEDNHgC-zii8L5gSQQ&usqp=CAU" />
  <img  onClick={handleSave} 
 src="https://findicons.com/files/icons/2315/default_icon/256/save_inv.png"
  
  />
               
               </div>
           </div>
           <div className="collections">
           
           </div>
     </div>
    )
}