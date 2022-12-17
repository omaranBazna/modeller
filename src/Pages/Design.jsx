import { useEffect ,useState} from "react"
import { scryRenderedComponentsWithType } from "react-dom/test-utils";

import * as THREE from "three";
import { GridHelper } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import MODEL from './models/CreamSF.glb'
export default function Design({user}){
 
const [color,setColor]=useState("green")


const setUpThree=()=>{
    
  
  
    let mouseClicked=false;
    const btnEl=document.getElementById("btn")
    var canvas = document.getElementById('draw');
    var context = canvas.getContext('2d');
    
    btnEl.addEventListener("click",()=>{
        

        context.fillStyle="#ffffff";
    context.fillRect(0,0,canvas.width,canvas.height);

    
    texture = new THREE.TextureLoader().load(document.querySelector("#draw").toDataURL("image/png"));
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
        const new_material = new THREE.MeshStandardMaterial({
          map: texture
        });
      Obj.material=new_material
    })
    context.fillStyle="#ffffff";
    context.fillRect(0,0,canvas.width,canvas.height);

 
    const scene = new THREE.Scene();


let Obj;
const loader = new GLTFLoader();

console.log(loader.load)
loader.load( MODEL, function (gltf) {
    gltf.scene.position.y=0;

    gltf.scene.scale.set(20,20,20);
    Obj=gltf.scene.children[0];
    Obj.scale.set(10,10,10);
    scene.add(Obj);
    
    
},()=>{
    console.log("loading")
},(e)=>{
    console.log(e)
});

   
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#bg"),
      alpha: true,
    });
    
    renderer.setPixelRatio(window.devicePixelRatio);
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);
    
    renderer.render(scene, camera);
    
    const geometry = new THREE.SphereGeometry(
      3,
      100,
     100,
      0,
      2 * Math.PI,
      0,
      2 * Math.PI
    );
   
    const geometry2 = new THREE.Mesh();

     let texture = new THREE.TextureLoader().load(document.querySelector("#draw").toDataURL("image/png"));
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(1, 1);
    const material = new THREE.MeshStandardMaterial({
      map: texture
    });
    
   
    
    const light = new THREE.PointLight(0xffff2f);
 
    light.position.set(5, 5, 5);
    
   
    const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(ambientLight);
   

    
   
    
  const control = new OrbitControls(camera, renderer.domElement);
    const grid=new GridHelper(100,20);
    scene.add(grid);
    const pointer=new THREE.Vector2();

    pointer.x=200000;
    const raycaster=new THREE.Raycaster();

    var onMouseMove=(event)=>{
       pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      pointer.y = - ( (event.clientY-135) / window.innerHeight ) * 2 + 1 ;

    
       
      }
        window.addEventListener("mousemove",onMouseMove)
        window.addEventListener("mousedown",()=>{
          console.log("clicked")
          mouseClicked=true
        })
        window.addEventListener("mouseup",()=>{
            mouseClicked=false
        })
    function animate() {
      
      requestAnimationFrame(animate);
        if(!Obj){
           
            return
        }
      Obj.rotation.y = 120;
      //Obj.position.x += 0.3;
      control.enabled=true
     
     
      renderer.render(scene, camera);
    if(mouseClicked ){

      raycaster.setFromCamera( pointer, camera );

      const intersection = raycaster.intersectObject(Obj );
     

     if(intersection.length>0){
        let min=intersection[0]
      for(let el of intersection){
        if(el.distance<min.distance){
            min=el;
        }
        
         
        }


        texture = new THREE.TextureLoader().load(document.querySelector("#draw").toDataURL("image/png"));
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
            const new_material = new THREE.MeshStandardMaterial({
              map: texture
            });
            


        
        var canvas = document.getElementById("draw");
        var ctx = canvas.getContext("2d");
        ctx.fillStyle =document.getElementById("selectEl").value;

        const h=canvas.height
        const w=canvas.width
       
       
        ctx.beginPath();
        //ctx.fillRect( (min.uv.x)*w-15, h/2 - (min.uv.y-0.5)*2 *h/2-15,30,30);
        ctx.arc((min.uv.x)*w-5, h/2 - (min.uv.y-0.5)*2 *h/2-5,10, 0, 2 * Math.PI);
        ctx.fill();
        min.object.material=new_material
      control.enabled=false;
        }
    }
    }



  
    animate();
    
}
    useEffect(()=>{
        setUpThree();
    },[])
    return (

     <div className="design">
       <h1>design</h1> 
       <button id="btn">Clear</button>
        <select id="selectEl" value={color} onChange={(e)=>{setColor(e.target.value)}}>
         
              <option value="green">Green</option>
        <option value="red">Red </option>
      
        <option value="blue">Blue</option>

        <option value="black">Black</option>
        <option value="white">White</option>
       </select>
     
        <canvas id="bg" height="800" width="1200" />
      
        <canvas id="draw" height="800" width="1200" />
       
     </div>
    )
}