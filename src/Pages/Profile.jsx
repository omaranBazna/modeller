import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { saveUserProfile,loadUserCollections } from "../utils/firebase";
import { useState } from "react";
import Model from "../Components/Model";
export default function Profile({user,setUser,profile,setProfile}){
const [editable,setEditable]=useState(true);
const [name,setName]=useState("");
const [tempURL,setTempUrl]=useState("")
const [file,setFile]=useState(null);
const [collection,setCollection]=useState([])
const navigator=useNavigate();
const loadPic=(e)=>{

    var fr = new FileReader();
const file=e.target.files[0];
setFile(file);
fr.onload = function () {
    document.getElementById("profile-image").src = fr.result;
    setTempUrl(fr.result);
}
fr.readAsDataURL(file);

}
const handleEdit=()=>{
    setEditable(false);
    document.getElementById("profile-name").select();
}

const handleSave=async()=>{

await saveUserProfile(user,name,file);

setProfile({name:name,url:tempURL?tempURL:profile.url})

}
const handelLoadCollections=async()=>{
const data=await loadUserCollections(user);
setCollection(data);

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
handelLoadCollections();
setName(profile.name)
 },[])


    return (

     <div className="profile">
           <div className="profile-details">
            <label>

          <img id="profile-image" src={profile.url} />
               <img className="profile-image-edit" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Edit_icon_%28the_Noun_Project_30184%29.svg/1024px-Edit_icon_%28the_Noun_Project_30184%29.svg.png" />
           <input type="file"
       id="avatar" name="avatar"
       accept="image/png, image/jpeg"
       onChange={(e)=>{loadPic(e)}}
       >
</input> 
           </label> 
                
           
              
               <div className="profile-name">
                
                {user &&
                
                <input id="profile-name" readOnly={editable} value={name} onChange={(e)=>{setName(e.target.value)}} onBlur={()=>{setEditable(true)} }   />

                }

                <img onClick={handleEdit}  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLwQHBxiWVdO-bvNZEtEDNHgC-zii8L5gSQQ&usqp=CAU" />
  
               
               </div>
               <div  onClick={handleSave} className="profile-name">
                <h1 >Save</h1><img   
 src="https://findicons.com/files/icons/2315/default_icon/256/save_inv.png"
  
  />
               </div>
           </div>
           <div className="collections">
           {collection.length>0&&
           
              collection.map(item=>{
                console.log(item)
                return <Model   name={item.name} ></Model>
            })
            
          }
            {collection.length==0 &&
            <>
          
            </>}
           </div>
     </div>
    )
}