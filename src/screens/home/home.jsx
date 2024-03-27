import React from 'react'

import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../../components/login/login';
import Register from '../../components/register/register';
import Screening from '../screening/screening';
import Room from '../rooms/room';





const Home = () => {

  


  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register />} />
          <Route path='/screening' element={<Screening />} />
          <Route path='/rooms' element={<Room/>} />
        </Routes>
      </Router>
    
    </div>
  )
}

export default Home
