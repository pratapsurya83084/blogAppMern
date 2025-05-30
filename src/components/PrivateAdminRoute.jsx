import React,{useEffect} from 'react'
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';

const PrivateAdminRoute = ({children}) => {

const {currentUser}=useSelector(state=>state.user);
  // console.log(currentUser);
  
  return (currentUser?.user.isAdmin===true) ? children : <Navigate to="/sign-in" replace />;



}

export default PrivateAdminRoute
