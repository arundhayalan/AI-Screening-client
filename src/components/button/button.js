import React from 'react'

import { IconContext } from 'react-icons';


import './button.css';

const Button = ({check, On , icon}) => {
  return (
    <div className={`video-button ${On ? 'isOn':''}`} onClick={check}>
         <IconContext.Provider value={{size: "30px", className:"btn-icon"}} >
      {icon}
            </IconContext.Provider>
         </div>
  )
}

export default Button
