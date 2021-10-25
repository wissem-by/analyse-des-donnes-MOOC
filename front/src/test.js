import react, { useState ,useEffect } from 'react'
import Axios from 'axios'
//--------------------------------------C'est juste pour tester les operations crud sur la collection cours
function Test()
{
  const [nomCours,setNomCours] = useState('');
  const [description,setDescription] = useState('');
  const [duree,setDuree] = useState('');
  const [coursList,setCoursList] = useState([]);
  const [nouveauNom,setNouveauNom] = useState('')

  const addToCours =()=>{
    Axios.post("http://localhost:3003/insert",({nomCours : nomCours, description : description , duree : duree}));
  }
  useEffect(()=>{
    Axios.get('http://localhost:3003/read').then((response)=>{setCoursList(response.data)})
  },[])

  const UpdateCours=(id)=>{
    Axios.put('http://localhost:3003/update',{id:id , nouveauNom : nouveauNom})
  }
  
  const deleteCours =(id)=>{
    Axios.delete(`http://localhost:3003/delete/${id}`)
  }


  return(
      <div>
        <h1>hello world</h1>
        <input type="text"  onChange={(event)=>{
          setNomCours(event.target.value)
        }} />
        <input type="text" onChange={(event)=>{
          setDescription(event.target.value)
        }} />
        <input type="number" onChange={(event)=>{
          setDuree(event.target.value)
        }} />
        <button onClick={()=>addToCours()}>Ajouter un cours</button>
        <hr/>
        <h1>{coursList.map((val,key)=>{
          return <div><h1>{val.nomCours}</h1>
          <input type="text" placeholder="le nouveau nom de cours" onChange={(event)=>setNouveauNom(event.target.value)}/>
          <button onClick={()=>UpdateCours(val._id)}>Update</button>
          <button onClick={()=>deleteCours(val._id)}>Delete</button>
          </div>
        })}</h1>
      </div>
  )

}

export default Test;