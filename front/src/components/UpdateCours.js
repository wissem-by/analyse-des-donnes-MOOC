import react,{useState} from 'react'

function UpdateCours(props)
{
const [newName,setNewName]=useState("");
const [newDescirption,setNewDescription]=useState("");
const thenewName=()=>{
    setNewName(document.getElementById("newName").value);
}
const theNewDescription=()=>{
    setNewDescription(document.getElementById("newDescription").value);
}
    return(<div>
         
                <label>Modifier le nom du cours </label>
                <input type="text" id="newName" onChange={()=> thenewName()}/><br/>
                <label>Modifier la description</label>
                <input type="text" id="newDescription" onChange={()=>theNewDescription()}/><br/>
                <input type="submit" onClick={()=>theNewDescription()} />
                {console.log(newName)}
                {console.log(newDescirption)}
    </div>
    )
}


export default UpdateCours;