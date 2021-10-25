import react, {useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import Axios from 'axios';
import './OurCours.css';
import UserContext from "../context/userContext";

function OurCourses(props)
{   
    const history = useHistory();
    const [listeCours,setListeCours] = useState([]);
    const { userData,setUserData } = useContext(UserContext);
    useEffect(()=>{
        Axios.get('http://localhost:3003/readCourses').then((response)=>{setListeCours(response.data)})
      },[])
      let leNomDuCours="";
      let lienDeLimage="";
      let c;
      let id;
      listeCours.map(x=> {
          if(x._id ===  props.data){ 
            c = x;
            leNomDuCours= x.nomCours;
            lienDeLimage=x.image;
        }
        })
        const redirigi= async (id)=>{
            if(userData.user && c){
                let av = userData.user.user.Avancements;
                av.push({
                    idCours : c._id,
                    idLesson : c.lessons[0].id,
                    nbrelesson : 0,
                    estTermine : false,
                    score : 0,
                    niveau : "debutant"
                })
                let q = await Axios.post('http://localhost:3003/users/update', userData.user.user);
                console.log(av);
                history.push("/contenuCours",{idd : id});
            }
            else history.push("/sinscrire");
        }
    
    return(
        <div>
             <div className="card"  >
                    <img src={lienDeLimage} width={"300px"} height={"140px"}/>
                   <h3  textAlign= {"center"} onClick={()=>redirigi(props.data)}>{leNomDuCours} </h3>
                  
                </div>
        </div>
    )
}

export default OurCourses;