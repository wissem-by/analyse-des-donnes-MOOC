import React, { useEffect, useState } from 'react';
//import { authenticationService } from '../services/authentication.service';
import './css/home.css';
import {Link} from 'react-router-dom'
import Header from './header';
import Axios from 'axios';
import OurCourses from './OurCourses';

import ReactPaginate from 'react-paginate';
function Home(props) {

  const [listeCours,setListeCours]= useState([]);
  const [pageNumber,setPageNumber]=useState(0);
  const coursPerPage = 9;
  const pagesVisited = pageNumber * coursPerPage;



  useEffect(()=>{
    Axios.get('http://localhost:3003/readCourses').then((response)=>{setListeCours(response.data)})
  },[])
  
   const displayCourses = listeCours.slice(pagesVisited,pagesVisited + coursPerPage)
    .map(x=><h1 className="cardTitle" ><OurCourses data={x._id} /></h1>);


 const pageCount = Math.ceil(listeCours.length /coursPerPage );
const changePage=({selected})=>{
    setPageNumber(selected);
}




    return (
      <div >
        <Header/>        
          <img src="assets/images/main.jpg" className="theMainImage"/>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <section class="section-name padding-y-sm">
          <div class="container">
          <header class="section-heading">
              <a href="/seeall" class="btn btn-outline-primary float-right">See all</a>
              <h3 class="section-title">Cours populaires</h3>
              <br/><br/><br/>
          </header>
          
          <div class="row">
          <ReactPaginate
          previousLabel={"Précedent"}
          nextLabel={"Suivant"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousClassName={"PreviousBttn"}
          nextClassName={"NextButtn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
          
          />
          {displayCourses}
          
  {/* section of icons  --------------------------------------------------------*/}
              <section class="objectifs">
              <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <h2 class="ob">Atteignez vos objectifs avec 9arini</h2>
                <ul class="cards">
                <li class="cc">
                <div class="c1">
                <div class="cc1">
                <div class="tete">
                  <img src="assets/images/icons/icon1.png" alt style={{width:55, height: 55}}>
                </img>            
                </div>
                </div>
                </div>
                <div class="ecriture11">
                  <span>
                    <span class="span11">
                      Apprenez les 
                      <br></br>
                      compétences les plus récentes 
                      </span>
                      <br></br>
                      <small class="small11">
                      comme la Business Analytics, la conception graphique, le Python et bien d'autres
                      </small>
                    
                  </span>
                </div>
                </li>
                
                
                
                <li class="cc">
                <div class="c1">
                <div class="cc1">
                <div class="tete">
                  <img src="assets/images/icons/icon2.png" alt style={{width:55, height: 55}}>
                </img>            
                </div>
                </div>
                </div>
                <div class="ecriture11">
                  <span>
                    <span class="span11">
                    Préparez-vous
                      <br></br>
                      pour une carrière  
                      </span>
                      <small class="small11">
                      dans des domaines très convoités comme l'informatique, l'IA et l'ingénierie du cloud
                      </small>
                    
                  </span>
                </div>
                </li>



                <li class="cc">
                <div class="c1">
                <div class="cc1">
                <div class="tete">
                  <img src="assets/images/icons/icon3.png" alt style={{width:55, height: 55}}>
                </img>            
                </div>
                </div>
                </div>
                <div class="ecriture11">
                  <span>
                    <span class="span11">
                    Obtenez

                      <br></br>
                      un diplôme  
                      </span>
                      <small class="small11">
                      d'une grande université dans le domaine du commerce, de l'informatique, et bien plus encore
                      </small>
                    
                  </span>
                </div>
                </li>


                <li class="cc">
                <div class="c1">
                <div class="cc1">
                <div class="tete">
                  <img src="assets/images/icons/icon4.png" alt style={{width:55, height: 55}}>
                </img>            
                </div>
                </div>
                </div>
                <div class="ecriture11">
                  <span>
                    <span class="span11">
                    Améliorez les compétences de

                      <br></br>
                      votre organisation
                      </span>
                      <br></br>
                      <small class="small11">
                      d'une grande université dans le domaine du commerce, de l'informatique, et bien plus encore
                      </small>
                    
                  </span>
                </div>
                </li>
                </ul>
              </section>
          </div>
          </div>
          </section>


{/* end section of icons -------------------------------------------     */  }          
      



        <section class="section-name padding-y bg">
        <div class="container">
        <div class="row">
        <div class="col-md-6">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            
            <h3 >Join Us Today !</h3>
            
            <p>Get an amazing carrer  to make Your life easy</p>
        </div>
        <div class="col-md-6 text-md-right">
            <img src="assets/images/future.png" height="250" />
        </div>
        </div> 
        </div>
        </section>
        
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

        <footer class="section-footer border-top bg">
        <div class="container">
          <section class="footer-top  padding-y">
            <div class="row">
              <aside class="col-md col-6">
                <h6 class="title">Brands</h6>
                <ul class="list-unstyled">
                  <li> <a href="#">Adidas</a></li>
                  <li> <a href="#">Puma</a></li>
                  <li> <a href="#">Reebok</a></li>
                  <li> <a href="#">Nike</a></li>
                </ul>
              </aside>
              <aside class="col-md col-6">
                <h6 class="title">Company</h6>
                <ul class="list-unstyled">
                  <li> <a href="#">About us</a></li>
                  <li> <a href="#">Career</a></li>
                  <li> <a href="#">Rules and terms</a></li>
                </ul>
              </aside>
              <aside class="col-md col-6">
                <h6 class="title">Help</h6>
                <ul class="list-unstyled">
                  <li> <a href="#">Contact us</a></li>
                </ul>
              </aside>
              <aside class="col-md col-6">
                <h6 class="title">Account</h6>
                <ul class="list-unstyled">
                  <li> <a href="#"> User Login </a></li>
                  <li> <a href="#"> User register </a></li>
                  <li> <a href="#"> Account Setting </a></li>
                </ul>
              </aside>
              <aside class="col-md">
                <h6 class="title">Social</h6>
                <ul class="list-unstyled">
                  <li><a href="#"> <i class="fab fa-facebook"></i> Facebook </a></li>
                  <li><a href="#"> <i class="fab fa-twitter"></i> Twitter </a></li>
                  <li><a href="#"> <i class="fab fa-instagram"></i> Instagram </a></li>
                  <li><a href="#"> <i class="fab fa-youtube"></i> Youtube </a></li>
                </ul>
              </aside>
            </div> 
          </section>  
          <section class="footer-bottom row">
            <div class="col-md-2">
              <p class="text-muted">   2021 9arini </p>
            </div>
            <div class="col-md-8 text-md-center">
              <span  class="px-2">info@com</span>
              <span  class="px-2">+000-000-0000</span>
              <span  class="px-2">Street name 123, ABC</span>
            </div>
            <div class="col-md-2 text-md-right text-muted">
              <i class="fab fa-lg fa-cc-visa"></i> 
              <i class="fab fa-lg fa-cc-paypal"></i> 
              <i class="fab fa-lg fa-cc-mastercard"></i>
            </div>
          </section>
        </div>
        </footer>     
    </div>
  )
};

export default Home;