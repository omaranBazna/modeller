import { useEffect ,useState} from "react"
import { scryRenderedComponentsWithType } from "react-dom/test-utils";

import * as THREE from "three";
import { GridHelper } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import MODEL from './models/CuteKitty.glb'
export default function Design({user}){
 
const [color,setColor]=useState("green")
const [tool,setTool]=useState("brush")


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



    /*
    for(let el =0;el<11;el++ ){
    Obj=gltf.scene.children[el];
    Obj.scale.set(3,3,3);
    console.log(el);

    scene.add(Obj);
    }
*/
      
            
            

            for(let el =0;el<21;el++ ){
                 if(gltf.scene.children[el]){
                Obj=gltf.scene.children[el];
               
                Obj.scale.set(3,3,3);
                console.log(el);
            
                scene.add(Obj);
                }
                }
 
  
    
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
    
   
    
    const light = new THREE.PointLight(0xffffff);
    
    light.position.set(10, 20, 10);
    light.intensity =0.4;
   
    const sphereSize = 1;
    const pointLightHelper = new THREE.PointLightHelper(light, sphereSize );
    scene.add( pointLightHelper );
scene.add(light);
   


const light2 = new THREE.PointLight(0xffffff);
    
    light2.position.set(-10, 20, 10);
    light2.intensity =0.4;



    const pointLightHelper2 = new THREE.PointLightHelper(light2, sphereSize );
    scene.add( pointLightHelper2 );
   
 
scene.add(light2);
    
   
const light3 = new THREE.PointLight(0xffffff);
    
    light3.position.set(-10, 20, -10);
    light3.intensity =0.4;

    const pointLightHelper3 = new THREE.PointLightHelper(light3, sphereSize );
    scene.add( pointLightHelper3 );
 
scene.add(light3);
    

const light4 = new THREE.PointLight(0xffffff);
    
    light4.position.set(10, 20, -10);
    light4.intensity=0.4;
   

    const pointLightHelper4 = new THREE.PointLightHelper(light4, sphereSize );
    scene.add( pointLightHelper4 );
scene.add(light4);
















    
const light5 = new THREE.PointLight(0xffffff);
    
light5.position.set(10, -20, 10);
light5.intensity =0.2;


const pointLightHelper5 = new THREE.PointLightHelper(light5, sphereSize );
scene.add( pointLightHelper5 );
scene.add(light5);



const light6 = new THREE.PointLight(0xffffff);

light6.position.set(-10, -20, 10);
light6.intensity =0.2;



const pointLightHelper6 = new THREE.PointLightHelper(light6, sphereSize );
scene.add( pointLightHelper6 );


scene.add(light6);


const light7 = new THREE.PointLight(0xffffff);

light7.position.set(-10, -20, -10);
light7.intensity =0.2;

const pointLightHelper7 = new THREE.PointLightHelper(light7, sphereSize );
scene.add( pointLightHelper7 );

scene.add(light7);


const light8 = new THREE.PointLight(0xffffff);

light8.position.set(10, -20, -10);
light8.intensity =0.2;


const pointLightHelper8 = new THREE.PointLightHelper(light8, sphereSize );
scene.add( pointLightHelper8 );
scene.add(light8);

















    
    
  const control = new OrbitControls(camera, renderer.domElement);
    const grid=new GridHelper(100,20);
    scene.add(grid);
    const pointer=new THREE.Vector2();

    pointer.x=200000;
    const raycaster=new THREE.Raycaster();

    var onMouseMove=(event)=>{
       pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      pointer.y = - ( (event.clientY-153) / window.innerHeight ) * 2 + 1 ;
     
    
       
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
         const pos=[min.uv.x,min.uv.y];


     

      const minArr=[]
      const radius=0.02;
  
      for(let i=0;i<36;i++){
        const point_i=new THREE.Vector2(0,0);
        point_i.x=pointer.x+radius*Math.cos(i/36*Math.PI*2);
        point_i.y=pointer.y+radius*Math.sin(i/36*Math.PI*2)*2;

        raycaster.setFromCamera( point_i, camera );

        const intersection1 = raycaster.intersectObject(Obj );
        
          let min=intersection1[0]
         for(let el of intersection1){
            if(el.distance<min.distance){
               min=el;
            }
          }
         // console.log(min.uv)
         if(min){
        minArr.push([min.uv.x,min.uv.y])
         }
      }
      console.log(minArr)
        
      

       
            

         

        
        var canvas = document.getElementById("draw");
        var ctx = canvas.getContext("2d");
        ctx.fillStyle =document.getElementById("selectEl").value;

        const h=canvas.height
        const w=canvas.width
       
       if(minArr[0]){
        ctx.beginPath();
    
      //  ctx.arc((min.uv.x)*w-12.5, h/2 - (min.uv.y-0.5)*h-12.5,25, 0, 2 * Math.PI);
       
      let xPos=(minArr[0][0])*w
      let yPos=h/2 - (minArr[0][1]-0.5)*h
    

   
   //   ctx.moveTo(xPos,yPos)

       for(let i=1;i<36;i++){
         xPos=(minArr[i][0])*w
            yPos=h/2 - (minArr[i][1]-0.5)*h
           let d=Math.sqrt((minArr[i][0]-pos[0])*(minArr[i][0]-pos[0])+(minArr[i][1]-pos[1])*(minArr[i][1]-pos[1]))
          
          if(d<0.1){
           ctx.arc(xPos, yPos,0, 0, 2 * Math.PI);
          }
       }
           
          
          //  ctx.lineTo(xPos,yPos)
     

/*
        ctx.moveTo(0, 0);
ctx.lineTo(1000,500);
ctx.lineTo(500, 1000);
ctx.lineTo(0, 900);
*/
        //ctx.closePath();
        ctx.fill();
    }


        texture = new THREE.TextureLoader().load(document.querySelector("#draw").toDataURL("image/png"));
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
            const new_material = new THREE.MeshStandardMaterial({
              map: texture
            });

       Obj.material=new_material




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
       <select id="toolEl" value={tool} onChange={(e)=>{setTool(e.target.value)}}>

       <option value="brush">Brush</option>

<option value="rotate">Rotate</option>
<option value="fill">Fill</option>
       </select>
     
        <canvas id="bg" height="800" width="1200" />
      
        <canvas id="draw" height="1200" width="1200" />
       
     </div>
    )
}