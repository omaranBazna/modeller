import { useEffect ,useState} from "react"
import { HexColorPicker } from "react-colorful";
import { useNavigate } from "react-router-dom";
import { setUpThree } from "../utils/three";
import { saveToStorage } from "../utils/firebase";
export default function Design({user,setUser}){
  const navigator=useNavigate();
  const [color, setColor] = useState("#aabbcc");
  const [tool,setTool]=useState("rotate")


  const handleSave=()=>{
     saveToStorage(  document.querySelector("#draw").toDataURL("image/png"))
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
   setUpThree();
    },[])
    return (

     <div className="design">


<div className="tools">
  
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
    <div onClick={()=>handleSave()} className="IconI">

      <img src="https://cdn-icons-png.flaticon.com/512/174/174314.png" />
    </div>
    <div className="toolEl" data-tool={tool}></div>
    

       
       </div>
      <HexColorPicker className="colorEl" id="colorEl" data-color={color} color={color} onChange={setColor}></HexColorPicker>
        <canvas id="bg"  width="1200" />
       
      
        <canvas id="draw" height="1200" width="1200" />
        <canvas id="copy" height="1200" width="1200" />
     </div>
    )
}