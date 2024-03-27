import React,{useEffect, useRef,useState} from 'react'
import './room.css';
import Button from '../../components/button/button';
import { IoRecording } from "react-icons/io5";
import { FaDownload } from "react-icons/fa6";


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

    getUserMediaAndSetStream(); // Call the async function immediately
  }, []);


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
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = url;
    a.download = 'recording.webm';
    a.click();
    window.URL.revokeObjectURL(url);
  };
  return (
    <div className='room-container'>
      <div className='video-screen'>
      <video ref={videoRef} autoPlay muted />
      <div className='controls'>
        <Button checktoggle={toggleRecording} isCameraOn={recording} icon={<IoRecording />} />
        {recordedChunks.length > 0 && (
            <Button checktoggle={downloadRecording} isCameraOn={recording} icon={<FaDownload />} />
          )}
      </div>
      </div>
    </div>
  )
}

export default Room
