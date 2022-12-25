import { useEffect ,useState} from "react"
import { HexColorPicker } from "react-colorful";
import { useNavigate } from "react-router-dom";
import { setUpThree } from "../utils/three";
import { saveToStorage } from "../utils/firebase";
import { downloadModal } from "../utils/firebase";
import Popup from "../Components/Popup";
import { useSpring } from "@react-spring/web";

import Select, { components } from "react-select";


const options = [
  { value: 1, label: "1", copy: true },
  { value:2, label: "2", copy: true },
  { value: 3, label: "3", copy: true }
];
export default function Design({user,setUser,selected}){

  const [springs, api] = useSpring(()=>({
    from: { y: -100 ,  opacity:0}
  }))
   const [download,setDownload]=useState(false);


  const handleAnimation = () => {
    api.start({
      from: { y: -10 ,  opacity:0},
    to:async (next, cancel) => {
    await next({ y: 60 ,  opacity:1})
    
    await next({ y: 60.001 ,  opacity:1})
    
    await next({ y: 60 ,  opacity:1})
    
    await next({ y: 60.001 ,  opacity:1})
 
   
    
    
    await next({ y: -60 ,  opacity:0})

  },
  

  
    })
  }

  const navigator=useNavigate();
  const [color, setColor] = useState("#aabbcc");
  const [tool,setTool]=useState("rotate")
  const [name,setName]=useState("Untitled");
  const [editable,setEditable]=useState(false);
  const handleSave=()=>{
   
   if(download==false){
    setDownload(true);
    document.querySelector("#draw").toBlob(function(blob){
     
      
      saveToStorage( blob,user,name).then((result)=>{
       handleAnimation();
       setDownload(false);
      }).catch(e=>{
      
      })
    }); 
  }
  }
  const handleEdit=()=>{
    setEditable(false);
   document.getElementById("modelName").select();
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

   if(selected){
   setUpThree(selected.model,selected.regions)

   }else{
       setUpThree();
   }

    },[user])
    return (

     <div className="design">

<Popup name={name} springs={springs} />


<div id="save-bar" className="model-data">
  <input id="modelName" readOnly={editable} value={name} onChange={(e)=>{setName(e.target.value)}} onBlur={()=>{setEditable(true)} }   />

 <img onClick={handleEdit} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLwQHBxiWVdO-bvNZEtEDNHgC-zii8L5gSQQ&usqp=CAU" />
 <img  onClick={()=>handleSave()} 
  src={download?"https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87.gif":"https://findicons.com/files/icons/2315/default_icon/256/save_inv.png"}
  
  />
</div>
<div id="tools" className="tools">
  
    <div className="iconI" style={{background:tool=="brush"?"#eaeaaa":"white"}}  onClick={()=>{setTool("brush")}} >
    <img   src="https://www.shareicon.net/download/2015/11/25/677858_tools_512x512.png" />
  
    </div>
    

    <div className="iconI" style={{background:tool=="fill"?"#eaeaaa":"white"}} onClick={()=>{setTool("fill")}} >
    <img   src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Toicon-icon-stone-fill.svg/1024px-Toicon-icon-stone-fill.svg.png" />
  
    </div>
    <div className="iconI" style={{background:tool=="rotate"?"#eaeaaa":"white"}} onClick={()=>{setTool("rotate")}} >
    <img   src="https://icons.iconarchive.com/icons/iconsmind/outline/512/Cursor-Move-icon.png" />
  
    </div>

    <div id="btn" className="iconI">
  <img  src="https://findicons.com/files/icons/2711/free_icons_for_windows8_metro/512/eraser.png" />
    </div> 

 
      
  
    <div className="toolEl" data-tool={tool}></div>
    

       
       </div> 
         <Select className="select" components={{ Option: ()=>{
      return <img src="https://icons.iconarchive.com/icons/iconsmind/outline/512/Cursor-Move-icon.png" />
    } }} options={options} />
      <HexColorPicker className="colorEl" id="colorEl" data-color={color} color={color} onChange={setColor}></HexColorPicker>
        <canvas id="bg"  width="1200" height="200"/>
       
      
        <canvas id="draw" height="1200" width="1200" />
        <canvas id="copy" height="1200" width="1200" />
        <img id="img-icon" src="https://cdn-icons-png.flaticon.com/512/587/587377.png" />
   
     </div>
    )
}