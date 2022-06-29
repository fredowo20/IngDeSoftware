import React, {useState, useEffect} from 'react';
import {Table} from 'react-bootstrap'; 
import { Button } from "react-bootstrap";

const PresupuestoEdit = ()=> {
    const [presupuestos, setPresupuestos] = useState(false);
    useEffect(() => {
      getPresupuestos();
    }, []);
    
    function getPresupuestos() {
      fetch(`http://localhost:3001/merchanttt/${localStorage.getItem("usuario")}`)
        .then(response => {
          return response.text();
        })
        .then(data => {
          setPresupuestos(data);
        });
    }

    /*const redirect = () => {
      window.location.href="http://localhost:3000/editarPresupuesto2";
    };*/

    const editarPresupuesto = (name) => {
      window.localStorage.setItem("name", name);
      window.location.href="http://localhost:3000/editarPresupuesto2";
    };
    
    return (
        <div>
          {presupuestos ? (
            <div>
          <Table striped bordered hover size="sm" responsive>
            <thead>
              <tr>
                <th>Presupuesto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {JSON.parse(presupuestos).map((merchant) => (
                <tr>
                  <td>{merchant.name}</td>
                  <td><Button onClick={()=>editarPresupuesto(merchant.name)}>Editar</Button></td>
                </tr>
              ))}
            </tbody>
          </Table></div>) : 'There is no merchant data available'}
        </div>
    );
}
  
export default PresupuestoEdit;