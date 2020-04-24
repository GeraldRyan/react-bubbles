import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useHistory } from 'react-router-dom'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) =>
{
  console.log("Colors", colors);

  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor)

  const editColor = color =>
  {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e =>
  {
    e.preventDefault();
    // Make a put request to save your updated color
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res =>
      {
        console.log(`/api/colors/${colorToEdit.id}`)
        console.log("Response from color editing", res, "Id=", colorToEdit.id)
        console.log("Color to edit", colorToEdit)

      })
    // think about where will you get the id from...
    // where is is saved right now?
  };
  const addColor = e =>
  {
    e.preventDefault()
    console.log("Color To Add", colorToAdd)
  }
  const deleteColor = color =>
  {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res =>
      {
        console.log("response from delete request", res, colors, color)

      })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e =>
              {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* stretch - build another form here to add a color */}
      <form action="">
        <h4>Add New Color</h4>
        <div className="button-row">
          <label>
            color name:
            <input
              name="color"
              value={colorToAdd.color}
              onChange={e =>
                setColorToAdd({ ...colorToAdd, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              name="code"
              value={colorToAdd.hex}
              onChange={e =>
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <br />
          <br />
          <button type="submit" onClick={addColor} >Add</button>
        </div>
      </form>
      <div className="spacer" />
    </div>
  );
};

export default ColorList;
