
import React, { useEffect, useState } from "react";
import {
    Button,
    Form,
    Grid,
    Header,
    Segment,
    Message,
  } from "semantic-ui-react";
  import "semantic-ui-css/semantic.min.css";
  import "./register.css";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        country: '',
        state: '',
        phonenumber: '',
        address: '',
      });
    
      const [popUp, setPopUp] = useState(false);
      const [registrationSuccess, setRegirstrationSuccess] = useState(false);
      const [errorMessage, setErrorMessage] = useState("");
      const navigate = useNavigate();
    
      useEffect(() => {
        if (registrationSuccess) {
          setPopUp(true);
          const timer = setTimeout(() => {
            setPopUp(false);
            navigate("/login");
          }, 3000);
          return () => clearTimeout(timer);
        }
      }, [registrationSuccess, navigate]);
    
      const handleChange = (e, { name, value }) => {
        setFormData({ ...formData, [name]: value });
    
        const validateField = () => {
          switch (name) {
            case "password":
              return value.length < 6
                ? "Password must be at least 6 characters long"
                : "";
            case "email":
              return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                ? "Invalid email address"
                : "";
            case "country":
              return !value ? "Country is required" : "";
            case "state":
              return !value ? "State is required" : "";
            case "phoneNumber":
              return !/^\d{10}$/.test(value)
                ? "Phone number must be 10 digits"
                : "";
            default:
              return "";
          }
        };
    
        setErrorMessage(validateField());
      };
    
      const handleSubmit = async (e) => {
        // You can handle form submission here, for example, sending data to a server
        e.preventDefault();
        try {
          const response = await axios.post(
            "http://localhost:5002/auth/register",
            formData
          );
          console.log("Registration successful:", response.data);
          // Clear form data on successful registration
          setFormData({
            email: '',
            password: '',
            name: '',
            country: '',
            state: '',
            phonenumber: '',
            address: '',
          });
          setRegirstrationSuccess(true);
        } catch (error) {
          console.error("Registration error:", error.response);
          // Check if the error status is 400 (user already exists)
          if (error.response.status === 400) {
            setErrorMessage("The user already exists");
          } else {
            setErrorMessage("An error occurred during registration");
          }
        }
      };
      return (
        <div className="registration-form">
          <Grid
            className="registration-grid"
            textAlign="center"
            verticalAlign="middle"
          >
            <Grid.Column className="registration-column">
              <Header as="h2" color="teal" textAlign="center">
                Register
              </Header>
              <Form size="large" onSubmit={handleSubmit} error={!!errorMessage} >
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
    
                  <Form.Input
                    fluid
                    icon="mail"
                    iconPosition="left"
                    placeholder="E-mail address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
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
                  <Form.Input
                    fluid
                    icon="address card"
                    iconPosition="left"
                    placeholder="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
    
                  <Form.Input
                    fluid
                    icon="world"
                    iconPosition="left"
                    placeholder="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
    
                  <Form.Input
                    fluid
                    icon="map marker alternate"
                    iconPosition="left"
                    placeholder="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
    
                  <Form.Input
                    fluid
                    icon="phone"
                    iconPosition="left"
                    placeholder="Phone Number"
                    name="phonenumber"
                    value={formData.phonenumber}
                    onChange={handleChange}
                    required
                  />
    
                  <Button color="teal" fluid size="large">
                    Register
                  </Button>
                </Segment>
                {errorMessage && (
                  <Message
                    error
                    header="Registration Error"
                    content={errorMessage}
                    onDismiss={() => setErrorMessage("")}
                  />
                )}
              </Form>
              {popUp && (
                <div
                  style={{
                    position: "fixed",
                    bottom: 20,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 9999,
                  }}
                >
                  <Segment color="green">Successfully Registered</Segment>
                </div>
              )}
            </Grid.Column>
          </Grid>
        </div>
      );
    };


export default Register
