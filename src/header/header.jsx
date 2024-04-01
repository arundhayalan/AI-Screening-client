import React from 'react'
import Button from '../components/button/button'
import { IoLogOut } from "react-icons/io5";
import './header.css'


const Header = () => {

  const logout = () =>{

    window.localStorage.removeItem('tokenEntry');
    window.location.href = '/screening';

  }
  return (
    <div className='header-container'>
        <div className='logout'>
        <Button check={logout} icon={<IoLogOut />}/>
        </div>
      
    </div>
  )
}

export default Header
