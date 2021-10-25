import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import UserContext from "../context/userContext";
import ErrorNotice from "./ErrorNotice";
import './css/seConnecter.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

function Seconnecter() 
 {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const { userData,setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try{
            const loginUser = {email, password};
            const loginResponse = await axios.post("http://localhost:3003/users/login", loginUser);
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data
            });
            localStorage.setItem("auth-token", loginResponse.data.token);
            history.push("/");
        } catch(err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
        
    };


return (
        <div className="login">
            <h2>Login</h2>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            <form onSubmit={submit}>
                 <div className="email">
                
                <input type="email" id="email" className="email2"  onChange={e => setEmail(e.target.value)} placeholder="Email"/>
                </div> 

                <div className="password">
                
                <input type="password" id="password"  className="password2" onChange={e => setPassword(e.target.value)} placeholder="mot de passe"/>
                </div>
                
                <input type="submit" value="Login" className="bbt" />
            </form>
        </div>
    );
 }
export default Seconnecter;