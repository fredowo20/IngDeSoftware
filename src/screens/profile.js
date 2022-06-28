import React from 'react'
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile() {
  return (
      <React.Fragment>
        <Navbar bg="black" variant="dark">
        <Container>
            <Navbar.Brand href="/">Presupuestox</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link>Crear Presupuesto</Nav.Link>
                <Nav.Link>Editar Presupuesto</Nav.Link>
                <Nav.Link>Crear Estadísticas</Nav.Link>
                <Nav.Link>Calculadora</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        
        <div className="MensajeSinLogear">
        <h1> Bienvenid@ </h1>
    
        <h3> awa</h3>
        </div>
      </React.Fragment>
  );
}

export default Profile;