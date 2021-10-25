import react,{useContext} from 'react'
import { useHistory } from 'react-router';
import './CoursCards.css';
import UserContext from "../context/userContext";
import CoursContext from "../context/coursContext";

function CoursCard(props){
    const history = useHistory();
    
     
     const { userData,setUserData } = useContext(UserContext);
     const { coursData,setCoursData } = useContext(CoursContext);
     let nomDuCours="";
     let lienImage="";
     let niveau="";
     const redirigi=(id)=>{
        if (userData.user.user.descrimination == 1) {
            history.push("/contenuCours",{idd : id});
        }
    }
    
     coursData.cours.map(x=> {if (x._id ===  props.data) {
        nomDuCours= x.nomCours;
        lienImage= x.image;
     }} )
     Array.from(userData.user.user.Avancements).map(q=> {
        if (q.idCours===props.data){
           niveau = q.niveau;
        }
    })

    return(
        <div>
                <div className="card">
                    <img src={lienImage}/>
                   <h3 className="cardTitle"> <a onClick={()=>redirigi(props.data)}>{nomDuCours}</a></h3>
                   {niveau}                
                </div>
        </div>
    )
}

export default CoursCard;