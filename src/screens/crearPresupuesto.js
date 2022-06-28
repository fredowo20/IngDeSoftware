import React from 'react'
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LogoutButton } from "../components/logout";
import Tabla from "../components/Tabla";

function crearPresupuesto() {
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
        <h1> Crear Presupuesto </h1>
        <div className="espacio"></div>
        <Tabla />
        </div>
      </React.Fragment>
  );
}

export default crearPresupuesto;