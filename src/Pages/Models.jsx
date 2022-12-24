import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getAllModels } from "../utils/firebase";
import Model from "../Components/Model";
import { useState } from "react";
export default function Models({user,setUser,setSelected}){
const [models,setModels]=useState([]);
const navigator=useNavigate();

const loadModels=async()=>{
  const data=await getAllModels();
  setModels(data)

}
useEffect(()=>{
 const userString=window.localStorage.getItem("user")
 if(userString !=""){
  const userf=JSON.parse(userString);
 setUser(userf)
 if(!userf){
  navigator("/")
 }
 
  loadModels();

 }else{
  navigator("/")
 }

 },[])


 

  const openModel=(id)=>{
    console.log(id)
    setSelected(id)
    navigator("/design")
    }
    return (

     <div className="model">
  
         {models.map((item,index)=>{
          console.log(item)
          return (
          <div key={index} onClick={()=>{openModel(item.model)}}>
           
          <Model   name={item.name} image={item.demo}></Model>
          </div>)
         })}

     </div>
    )
}