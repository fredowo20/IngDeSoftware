import React, {useState, useEffect} from 'react';
import {Table} from 'react-bootstrap'; 
import { Button } from "react-bootstrap";

const Presupuesto = ()=> {
    const [presupuestos, setPresupuestos] = useState(false);
    useEffect(() => {
      getPresupuestos();
    }, []);
    
    function getPresupuestos() {
      fetch(`http://localhost:3001/${localStorage.getItem("usuario")}`)
        .then(response => {
          return response.text();
        })
        .then(data => {
          setPresupuestos(data);
        });
    }

    const borrarPresupuesto = () => {
      //console.log(localStorage.getItem("usuario"))
      let name = prompt('Ingrese nombre de presupuesto a borrar:');

      if (name === "") {
          // user pressed OK, but the input field was empty
          while(name===""){
            name = prompt('Ingrese nombre de presupuesto a borrar:');
          }
      } if (name) {
          // user typed something and hit OK
          fetch(`http://localhost:3001/merchants/${name}`, {
            method: 'DELETE',
          })
            .then(response => {
              return response.text();
            })
            .then(data => {
              console.log(data)
              if(parseInt(data)===0){
                alert("Presupuesto "+name+" no existe");
              }else{
                alert("Presupuesto "+name+" se ha borrado exitosamente");
                window.location.reload()
              }
              //getMerchant();
            });    
      } else {
          // user hit cancel
      }
    };
    
    return (
        <div>
          {presupuestos ? (
            <div>
          <Table striped bordered hover size="sm" responsive>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Partida</th>
                <th>Unidad</th>
                <th>Cantidad</th>
                <th>Valor Unitario</th>
                <th>Sub-Total</th>
              </tr>
            </thead>
            <tbody>
              {JSON.parse(presupuestos).map((merchant) => (
                <tr>
                  <td>{merchant.name}</td>
                  <td>{merchant.partida}</td>
                  <td>{merchant.unidad}</td>
                  <td>{merchant.cantidad}</td>
                  <td>{merchant.valorunitario}</td>
                  <td>{merchant.cantidad*merchant.valorunitario}</td>
                </tr>
              ))}
            </tbody>
          </Table></div>) : 'There is no merchant data available'}

          <Button variant="danger" onClick={borrarPresupuesto}>Eliminar presupuesto</Button>
        </div>
    );
}
  
export default Presupuesto;