import React from "react";
import { Button } from "react-bootstrap";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.partida}</td>
      <td>{contact.unidad}</td>
      <td>{contact.cantidad}</td>
      <td>{contact.valorunitario}</td>
      <td>{contact.valorunitario*contact.cantidad}</td>
      <td>
        <Button onClick={(event) => handleEditClick(event, contact)}>Editar</Button>
        <div className="botones"></div>
        <Button onClick={() => handleDeleteClick(contact.id)}>Borrar</Button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
