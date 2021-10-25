import react,{useContext, useEffect, useState} from 'react'
import './userbody.css'
import UserContext from "../context/userContext";
import CoursContext from "../context/coursContext";

import Axios from 'axios';
import CoursCard from './CoursCards';

function Userbody(props)
{   
    
       let variable = <div></div>;
        const { userData,setUserData } = useContext(UserContext);
        const { coursData,setCoursData } = useContext(CoursContext);

       
    //      {for(let i=0;i<coursData.cours.length;i++){
    //        for(let j=0;j<11;j++)
    //            {if(coursData._id === userData.user.user.Avancements.idCours)
    //             console.log(coursData[i].nomCours)

    //      }
    //     }
    // }s
        {console.log(coursData.cours)}
        {console.log("------------")}
        
            

        let liste = [];
        {if(userData.user){for(let i=0;i<userData.user.user.Avancements.length;i++)
           liste.push(userData.user.user.Avancements[i].idCours);
        } }
         console.log(liste);


       
            
        return(
        <div className="theContainer">
            {variable}
             {userData.user ? (
                
                <div><h1 class="theGreeting">Bienvenue {userData.user.user.nom}!</h1><br/></div>
               ): 
               <div></div>
            }
           
            <br/><br/><br/><br/>
            <div className="ajustement">
               <h1>Mes cours preferés</h1>
               <br/><br/>
               <div className="myCourses">
                   
                   
             {  userData.user ? Array.from(userData.user.user.Avancements).map(x=>     coursData.cours ? Array.from(coursData.cours).map(y=>      y._id===x.idCours ?    <CoursCard data={y._id} />: <div></div>) : <div></div>) : <div></div>}
                
               </div>

            </div>
         
            
               
        </div>    
    )
        }


export default Userbody;