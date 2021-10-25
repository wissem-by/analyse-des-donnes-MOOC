import react ,{useContext, useState,useEffect}from 'react'
import './contenuCours.css'
import VoirCours from './VoirCours';
import UserContext from "./context/userContext";
import CoursContext from "./context/coursContext";
import ReactPlayer from "react-player"
import Axios from 'axios'
function ContenuCours(props)
{

    const [listUsers,setLitsUsers] = useState([]);
    const { userData,setUserData } = useContext(UserContext);
    const { coursData,setCoursData } = useContext(CoursContext);
     const x= JSON.stringify(props.history.location.state);
     const y = JSON.parse(x);

     const leVideo=(d)=>{
        document.getElementById("inlineFrameExample").innerHTML = <iframe id="inlineFrameExample"
                        title="Inline Frame Example"
                        width="300" src="https://youtu.be/HWxBtxPBCAc?list=PLrSOXFDHBtfHg8fWBd7sKPxEmahwyVBkC">
                     </iframe>
    }

    let cours;
    let nomProf = "";
    {Array.from(coursData.cours).map(x=>{
        if (x._id===y.idd){ 
            cours=x;
            console.log(x);
        };
    
    })}

    useEffect(()=>{
        Axios.get('http://localhost:3003/readUsers').then((response)=>{setLitsUsers(response.data)})
      },[]);

    
   
    {if (cours) listUsers.map(x=> x._id===cours.idProf ? nomProf=x.nom : <div></div>)}

     let mot1="";
     let mot2="";
     let mot3="";
     let def1="";
     let def2="";
     let def3="";
     let avancement;
     let lessons=[];
     let lessonIndex;
     let clicked1 = false, clicked2 = false;

     if (userData.user){ 
         Array.from(userData.user.user.Avancements).map(q=> {
             if (q.idCours===y.idd){
                avancement = q;
                if (coursData.cours){ 
                    Array.from(coursData.cours).map(x=>{
                        if (x._id===y.idd){
                            Array.from(x.lessons).map((y, i)=>{
                                lessons.push(y)
                                if (y.id==avancement.idLesson) {
                                    lessonIndex = i;
                                }
                            })
                             }
                       })  
               }
            
            
             }
            })  
    }

    const toggle1=()=>{
        var pop = document.getElementById("popup1");
        pop.classList.toggle('active');
    }

    const toggle2=()=>{
        var pop = document.getElementById("popup2");
        pop.classList.toggle('active');
        if (!clicked1){
            avancement.score++;
            clicked1 = true;
        }
    }
    const toggle3=()=>{
        var pop = document.getElementById("popup3");
        pop.classList.toggle('active');
        if (!clicked2){
            avancement.score+=3;
            clicked2 = true;
        }
    }


     let maListe = [];
    { coursData.cours ? Array.from(coursData.cours).map(q=> q._id===y.idd ? q.lessons.map(x=>x.id===avancement.idLesson ?  x.Mots.map(z=>maListe.push(z.mot)) :<div></div>) : <div></div> ) : <div></div>}
    { coursData.cours ? Array.from(coursData.cours).map(q=> q._id===y.idd ? q.lessons.map(x=>x.id===avancement.idLesson ?  x.Mots.map(z=>maListe.push(z.definition)) :<div></div>) : <div></div> ) : <div></div>}

    {mot1=maListe[0]; mot2=maListe[1];mot3=maListe[2];def1=maListe[3]; def2=maListe[4];def3=maListe[5] }

    const updateNiveau=async ()=>{
        const res = await Axios.post('http://localhost:3003/users/niveau',{score: avancement.score, nbrelesson: avancement.nbrelesson});
       avancement.niveau = res.data;
        avancement.nbrelesson++;
        console.log(avancement.score)
        Array.from(userData.user.user.Avancements).map(q=> {
            if (q.idCours===y.idd){
               q=avancement;
               console.log(res.data);

            }
        })
        lessonIndex++; 
        
        if (lessonIndex >= lessons.length) {
            console.log("Terminé");
            avancement.estTermine = true;
            let q = await Axios.post('http://localhost:3003/users/update', userData.user.user);
            setUserData(userData); 
            window.location.reload();
            return
        }
        
        while (1) {
   if ((avancement.niveau == "debutant") &&  (lessons[lessonIndex].niveau != "debutant")){
                lessonIndex++;
            }
            if ((avancement.niveau == "Intermediaire") &&  (lessons[lessonIndex].niveau == "avancé")){
                lessonIndex++;
            }
            break;
        }

        avancement.idLesson=lessons[lessonIndex].id;
        Array.from(userData.user.user.Avancements).map(q=> {
            if (q.idCours===y.idd){
               q=avancement;
            }
        })
        let q = await Axios.post('http://localhost:3003/users/update', userData.user.user);
           setUserData(userData); 
           window.location.reload();

     }
    return(
        <div>   
            {avancement && !avancement.estTermine ?
                 <div>
                 <div className="navbarr">
                    <h3>{cours ? cours.nomCours : <div></div>}</h3>
                    <p>Réalisé par l'enseignant {nomProf} </p>
                    <img  src="assets/images/python.jpg"/>
                </div>


                <div className="leBody">
                    <div className="vid">
                    
                    <iframe width="50%" height="315" src={lessons && lessons.length ? lessons[lessonIndex].sourceVideo : ""} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                    </div>
                    <div id="popup1" className="popup">
                        <h1>{def1}  </h1>
                        <button onClick={()=>toggle1()}>close</button>
                    </div>
                    <div id="popup2" className="popup">
                        <h1>{def2}  </h1>
                        <button onClick={()=>toggle2()}>close</button>
                    </div>
                    <div id="popup3" className="popup">
                        <h1>{def3}  </h1>
                        <button onClick={()=>toggle3()}>close</button>
                    </div>
                    
                    <div className="Droite">
                        <h1 id="inlineFrameExample">
                            <h1 onClick={()=>toggle1()}>{mot1}</h1><br/>
                            <h1 onClick={()=>toggle2()}>{mot2}</h1><br/>
                            <h1 onClick={()=>toggle3()}>{mot3}</h1>
                       </h1>

                    </div>
                    <div className="btn btn-secondary"> Niveau {avancement.nbrelesson==1 ? <div>debutant</div> :avancement.niveau} </div>

                    <button onClick={()=>updateNiveau()}   className="theButton">NEXT</button>
                  </div></div>
                  : <div><h1>Cours Terminé</h1></div>
                }

                    <br/><br/><br/>
                  <div className="retourArriere">
                  <a href="/usersPage">Retour au profil</a> 
                  </div>

        </div>
    )
}

export default ContenuCours;