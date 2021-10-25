import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import UserContext from "../context/userContext";
import ErrorNotice from "./ErrorNotice";
import './css/sinscrire.css'

function Sinscrire () {    

    const [email, setEmail] = useState();
    const [nom, setNom] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    let descrimination = 1;
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();


    const submit = async (e) => {
        e.preventDefault();
        try{
            var radios = document.getElementsByName('etat');
            for (var i = 0, length = radios.length; i < length; i++) {
                if (radios[i].checked) {   
                    console.log(radios[i].value);         
                    switch(radios[i].value)
                    {                
                        case "etudiant" : {descrimination = (1);break;}
                        case "prof" : {descrimination = (2);break;}          
                    }
                        break;
                }
            }
            
            const newUser = {email, password, passwordCheck, nom, descrimination};
            console.log(newUser);
            await axios.post("http://localhost:3003/users/register", newUser);
            const loginResponse = await axios.post("http://localhost:3003/users/login", {
                email, password
            });
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            });
            localStorage.setItem("auth-token", loginResponse.data.token);
            history.push("/");
        } catch(err) {
           // err.response.data.msg && setError(err.response.data.msg)
        }
        
    };


    return(
        <div>
            <h1>S'inscrire</h1><br/>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            <h5>Profitez de votre temps libre pour apprendre auprès des meilleurs profs</h5>
            <br/>

            <form onSubmit={submit}>
                <label>Nom de l'utilisateur</label>
                <input type="text" placeholder="nom" id="un" onChange={e => setNom(e.target.value)}/>
                <label>Email: </label>
                <input type="email" id="email" onChange={e => setEmail(e.target.value)}/>
                <label>Password: </label>
                <input type="password" id="pw" onChange={e => setPassword(e.target.value)}/>
                <input type="password" placeholder="Confirm password" onChange={e => setPasswordCheck(e.target.value)}/>
                <input type="radio" value="prof" id="radioProfesseur" name="etat"/><label> Professeur</label>
                <input type="radio" value="etudiant" id="radioEtudiant" name="etat"/><label>Etudiant</label><br/>

                <input type="submit" value="Register" className="btn btn-primary" />
            </form>

           <hr/>
        </div>
    )
   
}


export default Sinscrire;