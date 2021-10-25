import react, { Children, useState,useEffect,useContext } from 'react'
import './profsPage.css'
import Axios from 'axios'
import Formulaire from './creationCours';
import UserContext from "../context/userContext";
import CoursContext from "../context/coursContext";
import CoursCard from './CoursCards';
import ReactDOMServer from 'react-dom/server';



function ProfPage(props)
{    const { userData,setUserData } = useContext(UserContext);
    const { coursData,setCoursData } = useContext(CoursContext);
    const myArray = [];
    /*{for(let i=0;i<coursData.cours.length;i++)
    
    if(coursData.cours[i].nomCours&&coursData.cours[i].idProf === userData.user.user.id)    {myArray.push(<h1>{coursData.cours[i].nomCours}</h1>)};
    }*/
  
    

     const [maListe , setMaListe] = useState([])
   const [idprof,setIdprof] = useState('');
     
//    const x =JSON.stringify(props.history.location.state);
//    const  y = JSON.parse(x);

   const Afficher=(props,my)=>{
        return <div>
               {
               
  
                props == 3 ? ModifierCours() : 
                <h1></h1>
               }
                
                
       </div>
      
   }
   //--------------------------------------------------MesCours shows the courses that were created by the prof 
   //--------------------------------------------------so we have to link the two tables 

   
   const AfficherADroite=()=>{
       let ch=''
    maListe.map((val,key)=>{
               ch = ch +' </br></br>'+ val.nomCours 
   })
      document.getElementById('Droite').innerHTML = ch
     }



   

        

   

   
 
   const ModifierCours=()=>{
    document.getElementById("Droite").innerHTML= "modifier un cours"
   }
 

const toggle1=()=>{
    var pop = document.getElementById("popup1").classList.toggle('active')
    pop.classList.toggle('active');
}

const toggle2=()=>{
    var pop = document.getElementById("popup2");
    pop.classList.toggle('active');
}

const AfficherMasquer=()=>
{
  var  divInfo = document.getElementById("nouveau-cours");
    if (divInfo.style.display == 'none')
        divInfo.style.display = 'block';
    else
        divInfo.style.display = 'none';
     
    }

    const cour_leçon=[];


    const form12=()=>{
        var nom_cour = document.forms["form1"]["nomCours"].value;
        var description = document.forms["form1"]["description"].value;
        var duree = document.forms["form1"]["duree"].value;
        var url_cour = document.forms["form1"]["sourceVideo"].value;
        var url_leçon = document.forms["form2"]["URL du leçon"].value;
        var niveau_leçon = document.forms["form2"]["niveau"].value;
        var id=userData.user.user._id;
        
        cour_leçon[0]=nom_cour
        cour_leçon[1]=description
        cour_leçon[2]=duree
        cour_leçon[3]=url_cour
        cour_leçon[4]=url_leçon
        cour_leçon[5]=niveau_leçon
        cour_leçon[6]=id;
        
        console.log(cour_leçon);
        console.log(MOTS);

        
        Axios.post("http://localhost:3003/cours/insert",({tab1:cour_leçon,tab2:MOTS}))
       }
    

       

    const MOTS=[];
     const form3=()=>{
        
        var definition_mot = document.forms["form3"]["definition"].value;   
        var niveau_mot = document.forms["form3"]["bouton"].value;
        var score_mot = document.forms["form3"]["score"].value;
        MOTS.push( definition_mot,niveau_mot,score_mot);
        console.log(MOTS);
       
       }


    return(
        
        <div>
           
           {myArray}
            <div className="logo">
                <img  src="assets/images/logos/lg.jpg"/> 
                <h1>9arini</h1>
            </div>
           
            
            <div className="background">
                <img style={{height:200}} src="assets/images/profsBackground.jpg"/>
            </div>
 

            

          
          <div  style={{top : "40%", left : "50%",position : "fixed",height:50 ,overflow:'auto',borderRadius: '8px', paddingRight:"500", transform : "translate(40%,-40%)",   padding : "50px", boxShadow: "0 5px 30px rgba(0, 0, 0, .30)",background: "#fff" ,height: "98vh"}} >
                    
                    <h1><button className="close"style={{width: "100%",borderRadius: "8px",backgroundColor:'white',borderColor:"#008CBA"}} >MesCours</button><br></br><br></br> {userData.user ? Array.from(userData.user.user.cours).map(x=>     coursData.cours ? Array.from(coursData.cours).map(y=>      y._id===x ?    <CoursCard data={y._id} />: <div></div>) : <div></div>) : <div></div>}</h1>
                 </div> 


            <div id="mesTaches">
           <input style={{marginTop:"50px",width:"300px",height:"50px"}} type="button" value="Créer un nouveau cours" onClick={()=>AfficherMasquer()} /><br></br><br></br><br></br><br></br>
           <input style={{width:"300px",height:"50px"}} type="button" value="Modifier un cours" onClick={()=>Afficher(3)} />
            </div>
          

           
           
    
            <div id="nouveau-cours" style={{height:"5px", marginTop:"20px",marginTop:"-170px",marginLeft:"-10%", paddingLeft:500, display:"none",width:"63%"}}>
                <form name="form1" onsubmit="return form12()" style={{ backgroundColor:" #ccc",borderRadius:"8px"}}>
        
                    <label>Nom du cours</label><br/>
                    <input type="test"  name="nomCours"/><br/>
                    <label>Description</label><br/>
    
                    <textarea name="description" rows="8" cols="30"></textarea> 
                    <br>
                    </br>
                    <label>Duree</label><br/>
                    <input type="number" name="duree"/><br/>
                    <label>URL du video</label><br/>
                    <input type="text" name="sourceVideo" /><br/>
                    <br/><br/>
                </form> 


            <div className="ajouter-leçon">

                <div className="card">
                     <h1>leçon N°1</h1>
                     <form name="form2">
    
                            <label>URL du leçon</label><br/>
                            <input type="text"  name="URL du leçon"/><br/>
                            <label>Niveau </label><br/>
                            
                            <input type="text"  name="niveau"/><br/>
                            <input class="button button1" type="button" value="Mot1" onClick={()=>toggle2()} />
                            
                            <input class="button button2" type="button" value="Mot2" onClick={()=>toggle2()} />
                        
                            <input class="button button3" type="button" value="Mot3" onClick={()=>toggle2()} />
                            <br/><br/>
                            <div style={{height:200 ,overflow:'auto',borderRadius: '8px'}} id="popup2"  >
                                    
                                   <form name="form3" /*onReset="return form3()"*/>
                                    <label>Definition</label><br/>
                                    <textarea name="definition" rows="8" cols="30"></textarea>  <br></br>
                                    <input type="radio" id="debutant" name="bouton" value="debutant"></input>
                                    <label for="bouton">  debutant</label><br></br>
                                    <input type="radio" id="intermédiaire" name="bouton" value="intermédiaire"></input>
                                    <label for="bouton">  intermédiaire</label><br></br>
                                    <input type="radio" id="avancé" name="bouton" value="avancé"></input>
                                    <label for="bouton">   avancé</label><br></br>
                                    <label>Score</label><br></br>
                                    <input type="number" name="score"/>
                                    <br></br>
                                    <br></br>
                                    <input type="reset" value="Submit" onClick={()=>form3()}></input>
                                    </form>
                            
                             </div>
                             
                                    <br></br>
                                    <input type="reset" value="Submit" onClick={()=>form12()}></input>
                    </form> 
                </div><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>



                </div>
    
            </div><br></br><br></br><br></br><br></br><br></br><br></br>
            
           

            

          
           

            <div className="Affichage" >
                <h1 id="Droite"></h1>
            </div>

            
        </div>
    )

    }

export default ProfPage;