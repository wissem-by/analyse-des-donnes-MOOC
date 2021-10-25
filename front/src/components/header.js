import React, { useContext } from 'react';
import './css/header.css'
import UserContext from "../context/userContext";
import { useHistory } from 'react-router-dom';
import AuthOptions from './AuthOptions';
function  Header(){

    const { userData,setUserData } = useContext(UserContext);
    const history = useHistory();
    {console.log(userData.user)}

    const diviser=()=>{
       if(userData.user.user){
       return <div>
          {userData.user.user.descrimination ===1 ?
      <div>{history.push( "/userspage")}</div> : 
      userData.user.user.descrimination ===2 ?
      <div>{history.push( "/profsPage")}</div> :  
      userData.user.user.descrimination ===3 ?
      <div>{history.push( "/adminPage")}</div> : <div></div>
      }
      </div>}
      }


   return(
    <header class="section-header">
    <section class="header-main border-bottom" >
        <div class="container">
    <div class="row align-items-center"> 
        <div   class="col-lg-2 col-4">
        <img href="/home" height={55} src="assets/images/logos/lg.jpg" />
        <a href="/"> <h3>9arini</h3></a> 
        </div>
        
        <div class="col-lg-6 col-sm-12">
            <form action="#" class="search">
                <div class="input-group w-100">
                    <input type="text" class="form-control" placeholder="Search" />
                    <div class="input-group-append">
                      <button class="btn btn-primary" type="submit">
                        <i class="fa fa-search"></i>
                      </button>
                    </div>
                </div>
            </form>
        </div> 
        <div class="col-lg-4 col-sm-6 col-12">
            <div class="widgets-wrap float-md-right">
               
                <div class="widget-header icontext">

                  
                    <a onClick={()=>diviser()} class="icon icon-sm rounded-circle border"><i class="fa fa-user"></i></a>
                   
                    <div class="text">
                        
                        <AuthOptions/>
                    </div>
                
                </div>
            </div> 
        </div> 
    </div> 
        </div> 
    </section>
    <nav class="navbar navbar-main navbar-expand-lg navbar-light border-bottom">
      <div class="container">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav" aria-controls="main_nav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
      </div>
      
    </nav>
    </header>
)
}



export default Header;