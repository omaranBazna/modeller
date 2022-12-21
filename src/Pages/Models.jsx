import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getAllDocs } from "../utils/firebase";
import Model from "../Components/Model";
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
 getAllDocs(userf).then(data=>{
  setModels(data)
})
 }else{
  navigator("/")
 }


  



  },[])

  const openModel=(id)=>{
    setSelected(id)
    navigator("/design")
    }
    return (

     <div className="model">
       <h1>Model</h1>
         {models.map((item,index)=>{
          return (
          <div key={index} onClick={()=>{openModel(item.ref)}}>
          <Model name={item.name}></Model>
          </div>)
         })}

     </div>
    )
}