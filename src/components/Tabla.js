import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "../App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import {Table, Accordion, Button, /*Form*/} from 'react-bootstrap'; 
import { utils, writeFile } from "xlsx";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Tabla = () => {
  
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    partida: "",
    unidad: "",
    cantidad: "",
    valorunitario: "",
  });

  const [editFormData, setEditFormData] = useState({
    partida: "",
    unidad: "",
    cantidad: "",
    valorunitario: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      partida: addFormData.partida,
      unidad: addFormData.unidad,
      cantidad: addFormData.cantidad,
      valorunitario: addFormData.valorunitario,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      partida: editFormData.partida,
      unidad: editFormData.unidad,
      cantidad: editFormData.cantidad,
      valorunitario: editFormData.valorunitario,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      partida: contact.partida,
      unidad: contact.unidad,
      cantidad: contact.cantidad,
      valorunitario: contact.valorunitario,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  const handleOnExportExcel = () => {
    var copyData = contacts;
    const contacts2 = copyData.map(contact => {
      delete contact.id
      return contact
    })
    
    var wb = utils.book_new(),
    ws = utils.json_to_sheet(contacts2);

    utils.book_append_sheet(wb, ws, "MySheet1");

    writeFile(wb, "MyExcel.xlsx");
  };

  const handleOnExportPdf = () => {
    const doc = new jsPDF()
    doc.text("Presupuesto", 20, 10)
    doc.autoTable({
      theme: "striped",
      body: contacts.map(contact => {
        delete contact.id
        return contact
      })
    })
    doc.save('MyPDF.pdf')
  };

  const handleInsertInBD = () => {
    let usuario = localStorage.getItem("usuario")
    let name = prompt("Ingrese nombre para el presupuesto:");
    
    if (name === "") {
        // user pressed OK, but the input field was empty
        while(name===""){
          name = prompt("Ingrese nombre para el presupuesto:");
        }
    } if (name) {
        // user typed something and hit OK
        fetch(`http://localhost:3001/merchant/${name}`)
          .then(response => {
            return response.text();
          })
          .then(data => {
            console.log(data)
            if(parseInt(data)!==0){
              alert("Ya existe el presupuesto "+name)
            }else{
              let id = 0
              let partida, unidad, cantidad, valorunitario;
              
              contacts.map((contact) => {
                id = id+1;
                partida = contact.partida;
                unidad = contact.unidad;
                cantidad = contact.cantidad;
                valorunitario = contact.valorunitario;
                //console.log(JSON.stringify({name, id, partida, unidad, cantidad, valorunitario}))
                fetch('http://localhost:3001/merchants', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({usuario, name, id, partida, unidad, cantidad, valorunitario}),
                })
                  .then(response => {
                    return response.text();
                  })
                  .then(data => {
                    //alert(data);
                  });
              })

              alert("Se ha guardado exitosamente el presupuesto "+name);
            }
          });
    } else {
        // user hit cancel
    }
  };

  const handleTotalPreupuesto = () => {
    let sum=0;
    contacts.map((contact)=>
    {
      sum=sum+(parseInt(contact.valorunitario)*parseInt(contact.cantidad))
      return sum
    }
    )
    return sum
  };


  return (

    <div className="app-container">

      {/* {console.log(contacts)} */}

       <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
      <Accordion.Header>Secci??n #1 
      </Accordion.Header>
      <Accordion.Body>
      <form onSubmit={handleEditFormSubmit}>
   
      
      <Table striped bordered hover size="sm" responsive>
          <thead>
            <tr>
              <th>Partida</th>
              <th>Unidad</th>
              <th>Cantidad</th>
              <th>Valor Unitario</th>
              <th>Sub-Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
            <th>Total Presupuesto</th><th></th><th></th><th></th><th>{handleTotalPreupuesto()}</th><th></th>
          </tbody>
        </Table>
      </form>

      <h2><font color="#006699">A??adir un nuevo item</font></h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="partida"
          required="required"
          placeholder="Partida"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="unidad"
          required="required"
          placeholder="Unidad"
          onChange={handleAddFormChange}
        />
        <input
          type="number"
          name="cantidad"
          required="required"
          placeholder="Cantidad"
          onChange={handleAddFormChange}
        />
        <input
          type="number"
          name="valorunitario"
          required="required"
          placeholder="Valor unitario"
          onChange={handleAddFormChange}
        />
        <div className="botones"></div>
        <Button type="submit">A??adir</Button>
        </form>
        </Accordion.Body>
        </Accordion.Item>
        </Accordion>

        <div className="espacio"></div>  

        <Button variant="success" onClick={handleOnExportExcel}>Descargar como Excel</Button>
        <div className="botones"></div>
        <Button variant="danger" onClick={handleOnExportPdf}>Descargar como PDF</Button>
        <div className="botones"></div>
        <Button onClick={handleInsertInBD}>Guardar presupuesto</Button>

        {/*<div ref={el => (this.componentRef = el)} />*/}

    </div>

  );
};

export default Tabla;
