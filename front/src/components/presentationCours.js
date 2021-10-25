import react from 'react';
import './css/python.css';
import Seconnecter from './seConnecter';
import SpecialButton from '../specialButton.js'
import {Link} from 'react-router-dom'
function presentationCours(props)
{  
    let x = JSON.stringify(props.history.location.state)
    let y = JSON.parse(x)
   
    
    return(<div>
        <div className="nav">
             <div>
             
                    <p className="textPython">
                           {y.name}
                    </p>
                
                    <p className="textDetails">
                    {y.desc}
                    </p>
             </div>
            
            <div className="pic">
               
                <img src={y.imageCours} />
                <p className="courseDesc">
               <h3>
               Ce cours comprend :
               </h3> 
               <p >
                    Vidéo à la demande de 21,5 heures<br/>
                    113 articles<br/>
                    10 ressources téléchargeables<br/>
                    2 exercices pratiques<br/>
                    33 exercices de codage<br/>
                    Accès illimité<br/>
                    Accès sur mobiles et TV<br/>
                    Exercices<br/>

               </p>

                </p>
                
            </div>
        </div>

        <div className="apprendre">
            <h2>
                Ce que vous apprenez : 
            </h2>
            <div className="leftSide">
            -Apprendre les bases du langage ainsi que les concepts avancés<br/>
            -Utiliser les bases de données<br/>
            -Automatiser des tâches répétitives<br/>
            -Gérer les fichiers sur ton disque dur<br/>
            -Comment tester ton code avec les tests unitaires
            
            </div>

            <div className="rightSide">
            -Créer des applications de bureau multiplateformes<br/>
            -Créer tes propres modules<br/>
            -Créer des fonctions pour automatiser des tâches<br/>
            -Apprendre à utiliser le terminal
            </div>
        </div>


        </div>
    )
}

export default presentationCours;

