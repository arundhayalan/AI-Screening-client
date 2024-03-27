import React, { useRef, useState } from 'react';


import './screening.css';
import Button from '../../components/button/button';
import { IoVideocam } from "react-icons/io5";
import { FaHandPointRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Screening = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const toggleCamera = async () => {
    try {
      if (!isCameraOn) {
        const userMedia = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(userMedia);
        videoRef.current.srcObject = userMedia;
      } else {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
        videoRef.current.srcObject = null;
      }
      setIsCameraOn(prevState => !prevState);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const tips = ["This is an AI based Verbal Interview, ensure your camera and microphone work on a reliable machine; avoid using old or slow devices.",
"Create a quiet, well-lit space with a clean background or professional remote wallpaper; make sure your face is well-lit or shaded.", "Dress professionally, as recordings may be shared with the client if you meet their standards.",
"Avoid repeating questions to keep the AI interview process smooth.", "Ensure a stable internet connection for seamless communication.", "Maintain proper posture and gestures while answering questions."];

  
const handleClick = (name)=>{
    navigate(name)
    
}

  return (
    <div className="meeting-screen">
      <div className="video-container">
      {!isCameraOn && (<div className='camera-off-message'>Camera is Off</div>)}
      <video ref={videoRef} autoPlay muted />
      <div className="controls-container">
         
       <Button checktoggle = {toggleCamera} isCameraOn={isCameraOn} icon={<IoVideocam />}/> 
        </div>
      </div>
      
      <div className="join-container">
        <div className="start-message">
          <p>Start Screening .. ?</p>
        </div>
        <button className='join-message' onClick={() => handleClick("/rooms")}>
            Join
        </button>
        
        <div className='tips-message'>
        {tips.map((item, index) => (
        <li key={index}>
          < FaHandPointRight className="icon" /> {/* Change the icon as needed */}
          {item}
        </li>
      ))}
        </div>
        
      </div>
    </div>
  );
};

export default Screening;
