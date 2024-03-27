import React from 'react'

import { IconContext } from 'react-icons';


import './button.css';

const Button = ({checktoggle, isCameraOn , icon}) => {
  return (
    <div className={`video-button ${isCameraOn ? 'isOn':''}`} onClick={checktoggle}>
         <IconContext.Provider value={{size: "30px", className:"btn-icon"}} >
      {icon}
            </IconContext.Provider>
         </div>
  )
}

export default Button
