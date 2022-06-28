import React from 'react'
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LogoutButton } from "../components/logout";
import { Profile } from "../components/profile";
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  
  const { user, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    window.localStorage.setItem("usuario", user.email)
  }
  return (
      <React.Fragment>
        <Navbar bg="black" variant="dark">
        <Container>
            <Navbar.Brand href="/home">Presupuestox</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/crearPresupuesto">Crear Presupuesto</Nav.Link>
                <Nav.Link href="/presupuestosAnteriores">Presupuestos Anteriores</Nav.Link>
                <Nav.Link>Crear Estadísticas</Nav.Link>
                <LogoutButton/>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        
        <div className="MensajeSinLogear">
        <h1> Bienvenid@ </h1>
        <Profile/>
    
        <h3> En la barra de navegación podrá encontrar todas las opciones</h3>
        </div>
      </React.Fragment>
  );
}

export default Home;