import React from 'react'
import { Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoginButton } from "../components/login";

import { useAuth0 } from "@auth0/auth0-react";

function Sign() {

  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    window.location.href="http://localhost:3000/home";
  }else{
    return (
      <React.Fragment>
        <Navbar bg="black" variant="dark">
        <Container>
            <Navbar.Brand>Presupuestox</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            </Navbar.Collapse>
        </Container>
        </Navbar>
        
        <div className="MensajeSinLogear">
        <h1> Bienvenid@ </h1>
    
        <h3>Para acceder al creador de presupuesto por favor inicie sesión</h3>
        <div className="espacio"></div>
        <LoginButton/>
        </div>
      </React.Fragment>
    );
  }
}

export default Sign;