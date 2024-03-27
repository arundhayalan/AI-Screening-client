import React, { useState , useEffect} from 'react';
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
    
      const[popUp, setPopUp] = useState(false);
      const [loginSuccess, setLoginSuccess] = useState(false);
      const [errorMessage, setErrorMessage] = useState('');
      const navigate = useNavigate();
      
    
      useEffect(() => {
    
        if (loginSuccess) {
          setPopUp(true);
          const timer = setTimeout(() => {
            setPopUp(false)
            navigate("/screening");
          }, 1000)
          return () => clearTimeout(timer);
        }
    
    
      }, [loginSuccess, navigate])
    
      const handleChange = (e, { name, value }) => {
        setFormData({ ...formData, [name]: value });
    
    
      };
    
      const handleSubmit = () => {
    
         axios.post('http://localhost:5002/auth/login', formData).then(response=>{
         console.log("login Successful", response.data.message);
         console.log("token",response.data.token); 
    
         setFormData({
          email:'',
          password:''
         });
    
         setLoginSuccess(true);
    
         }).catch(error => {
           console.log("Login Error", error.response);
           if (error.response.status === 400 && error.response.data && error.response.data.message) {
            const errorMessage = error.response.data.message;
            if (errorMessage === "User not found") {
              setErrorMessage('User not Found');
            } else if (errorMessage === "Invalid password") {
              setErrorMessage('Password is Invalid');
            } else {
              setErrorMessage('An error occurred: ' + errorMessage);
            }
          } else {
            setErrorMessage('An unknown error occurred');
          }
         });
        
      };
    
      // Check if all input fields are filled
      const isFormValid = () => {
        return Object.values(formData).every(value => value !== '');
      };
    
      return (
        <div className="login-form">
          <Grid className="login-grid" textAlign="center" verticalAlign="middle">
            <Grid.Column className="login-column">
              <Header as="h2" color="teal" textAlign="center">
                Log-in to your account
              </Header>
              <Form size="large" onSubmit={handleSubmit} error={!!errorMessage}>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="mail"
                    iconPosition="left"
                    placeholder="E-mail address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    
                  />
                  
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    
                  />
                  
                  <Button color="teal" fluid size="large" disabled={!isFormValid()}>
                    Login
                  </Button>
                </Segment>
                {errorMessage && (
                  <Message
                    error
                    header="Login Error"
                    content={errorMessage}
                    onDismiss={() => setErrorMessage('')}
                  />
                )}
              </Form>
              {popUp && (
                <div style={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
                  <Segment color="green">Successfully Login</Segment>
                </div>
              )}
            </Grid.Column>
          </Grid>
        </div>
      );
}

export default Login
