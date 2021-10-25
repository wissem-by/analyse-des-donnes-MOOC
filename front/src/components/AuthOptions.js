import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from "../context/userContext";

function AuthOptions () {
    const { userData,setUserData } = useContext(UserContext);
    const history = useHistory();

    const register = () => history.push("/sinscrire");
    const login = () => history.push("/seConnecter");
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token","");
    };
    return (
        <nav>
            
            <br/>
            {userData.user ? (
                <>
                <span class="text-muted">Bienvenue {userData.user.user.nom}!</span><br/>
                <a href='#' onClick={logout}>Se déconnecter</a>
                </>
            ) : (
                <>
                <span class="text-muted">Bienvenue!</span><br/>
                <a href='#' onClick={register}>S'inscrire |</a>  
                <a href='#' onClick={login}> Se connecter</a>
                </>
            )}
        </nav>
    )
}

export default AuthOptions;