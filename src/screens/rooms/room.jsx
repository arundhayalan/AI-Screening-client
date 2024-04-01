import React,{useEffect, useRef,useState} from 'react'
import './room.css';
import Button from '../../components/button/button';
import { IoRecording } from "react-icons/io5";
import { FaDownload } from "react-icons/fa6";
import { FaUpload } from "react-icons/fa";
import axios from 'axios';


const Room = () => {


    const [stream, setStream] = useState(null);
    const [recording, setRecording] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const getUserMediaAndSetStream = async () => {
      try {
        const userMedia = await navigator.mediaDevices.getUserMedia({ video: true , audio: true });
        setStream(userMedia);
        videoRef.current.srcObject = userMedia;
      } catch (error) {
        console.error('Error accessing user media:', error);
      }
    };

    getUserMediaAndSetStream();

    const handleBeforeUnload = (event) => {
      if (recording) {
        const confirmationMessage = 'You have unsaved recording. Are you sure you want to leave?';
        event.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    };
    

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [recording]);


  const startRecording = () => {
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const toggleRecording = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const downloadRecording = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    console.log(url);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = url;
    a.download = 'recording.webm';
    a.click();
    window.URL.revokeObjectURL(url);
    
  };

  const uploadRecording = async () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' }); 
    console.log(blob);
    const formData = new FormData();
    const videoname = generateVideoname();
    formData.append('recording', blob, videoname); 

    try {
      const response = await axios.post('http://localhost:5002/video/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Recording uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading recording:', error);
    }
  };

  const generateVideoname = () => {
    
    const timestamp = new Date().getTime();
    return `video_${timestamp}.webm`;
  };

  return (
    <div className='room-container'>
      <div className='video-screen'>
      <video ref={videoRef} autoPlay muted />
      <div className='controls'>
        <Button checktoggle={toggleRecording} isCameraOn={recording} icon={<IoRecording />} />
        {recordedChunks.length > 0 && (<div className='control-buttons'>
            <Button checktoggle={downloadRecording} isCameraOn={recording} icon={<FaDownload />} />
            <Button checktoggle={uploadRecording} isCameraOn={recording} icon={<FaUpload />} />
            </div>
          )}
      </div>
      </div>
    </div>
  )
}

export default Room
