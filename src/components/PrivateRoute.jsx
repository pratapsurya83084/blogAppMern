import React,{useEffect} from 'react'
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';

const PrivateRoute = ({children}) => {

const {currentUser}=useSelector(state=>state.user);
  // console.log(currentUser);
  
  return (currentUser) ? children : <Navigate to="/sign-in" replace />;



}

export default PrivateRoute
