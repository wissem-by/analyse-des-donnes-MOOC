import React, {useState, useEffect,useCallback ,useRef} from 'react';
import {BrowserRouter as Router, Route ,Switch} from 'react-router-dom';
import axios from 'axios';

import UserContext from './context/userContext';
import CoursContext from './context/coursContext';
import Seconnecter from './components/seConnecter';
import Home from './components/home.js';
import PresentationCours from './components/presentationCours';
import Sinscrire from './components/sinscrire';
import './App.css';
import Seeall from './components/seeall';
import ContenuCours from './contenuCours';
import UsersPage from './interfaces/usersPage';
import ProfPage from './interfaces/profsPage'
import AdminPage from './interfaces/adminPage';
import Test from './test';

function App() {
   const [ userData, setUserData ] = useState({
     token: undefined,
     user: undefined
   });

   const [ coursData, setCoursData ] = useState({
      cours: "undefined"
    });
 

    
         let mounted = true;
   useEffect(() => {
    
   mounted = true;
      const getCours = async () =>{
        
         const coursRes = await axios.get('http://localhost:3003/cours/all');
         setCoursData({
            cours: coursRes.data.cours,
          });
         
      }

     const checkLoggedIn = async () => {
       let token = localStorage.getItem("auth-token");
       if(token === null){
         localStorage.setItem("auth-token", "");
         token = "";
       }
       const tokenResponse = await axios.post('http://localhost:3003/users/tokenIsValid', null, {headers: {"x-auth-token": token}});
       if (tokenResponse.data) {
         const userRes = await axios.get("http://localhost:3003/users/", {
           headers: { "x-auth-token": token },
         });
         setUserData({
           token,
           user: userRes.data
         });
       }
     }
 
     getCours();
     checkLoggedIn();
   
     
   

return ()=>{mounted = false}
   
}, []);
 
       return (   
         <Router>
            <div className="App">
               <UserContext.Provider value={{ userData, setUserData }}>   
                  <CoursContext.Provider value={{ coursData, setCoursData }}>  
                     <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/seConnecter" component={Seconnecter} exact />
                        <Route  path="/sinscrire" component={Sinscrire} exact />
                        <Route path="/presentationCours" component={PresentationCours} exact />

                        <Route path="/seeall" component={Seeall} exact />
                        <Route path="/cc" component={ContenuCours} exact/>
                        <Route path="/usersPage" component={UsersPage} exact/>
                        <Route path="/profsPage" component={ProfPage} exact/>
                        <Route path="/adminPage" component={AdminPage} exact/>
                        <Route path="/contenuCours" component={ContenuCours} exact />
                        <Route path="/test" component={Test} exact/>
                     </Switch>
                  </CoursContext.Provider>
               </UserContext.Provider>
            </div>
         </Router>
      );
   }


export { App };
