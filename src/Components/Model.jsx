export default function Model({name,image}){
return <div className="model-card"> 
<img src={image}/>
<h1>{name}</h1>
</div>
}