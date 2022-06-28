import React from "react";
import { Button } from "react-bootstrap";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Ingrese la partida..."
          name="partida"
          value={editFormData.partida}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Introduzca la unidad..."
          name="unidad"
          value={editFormData.unidad}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="number"
          required="required"
          placeholder="Introduzca la cantidad..."
          name="cantidad"
          value={editFormData.cantidad}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="number"
          required="required"
          placeholder="Introduzca un val unit..."
          name="valorunitario"
          value={editFormData.valorunitario}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>{ editFormData.valorunitario*editFormData.cantidad} </td>
      <td>
        <Button type="submit">Guardar</Button>
        <div className="botones"></div>
        <Button onClick={handleCancelClick}>Cancelar</Button>
      </td>
    </tr>
  );
};

export default EditableRow;
