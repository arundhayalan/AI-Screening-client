import React, { useEffect, useState } from 'react'

import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../../components/login/login';
import Register from '../../components/register/register';
import Screening from '../screening/screening';
import Room from '../rooms/room';
import Snackbar from '../../components/button/snackbar';

import './home.css'








const Home = () => {

  const [token, setToken] = useState("");
  const [popUp, setPopUp] = useState(false);

  useEffect(() => {

    const token = window.localStorage.getItem('tokenEntry');
    if(token){
      setToken(token);
      console.log("hi");
    }
    else{
      setPopUp(true);
    }

  },[])

  useEffect(() =>{
    const timer = setTimeout(() => {
      setPopUp(false)
    }, 4000)
    return () => clearTimeout(timer);

  },[popUp])

  const handleLogin = (token) =>{
    const timer = setTimeout(() => {
      setToken(token)
    }, 2000)
    return () => clearTimeout(timer);
  }


  return (
   
      
      <div className='home-container'>
      {popUp && <Snackbar message="Please login first" />}
      {!token ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/screening" element={<Screening />} />
            <Route path="/rooms" element={<Room />} />
           
          </Routes>
        </Router>
      )}


      </div>
      
  );
}

export default Home
