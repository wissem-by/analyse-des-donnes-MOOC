// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';

// import { authenticationService } from '../services/authentication.service';

// // renders a route component if the user is logged in, if the user isn't logged in they are redirected to the login page.
// export const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={props => {
//         const currentUser = authenticationService.currentUserValue;
//         if (!currentUser) {
//             // not logged in so redirect to login page with the return url
//             return <Redirect to={{ pathname: '/sinscrire', state: { from: props.location } }} />
//         }

//         // authorised so return component
//         return <Component {...props} />
//     }} />
// )