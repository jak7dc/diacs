/* eslint-disable react/prop-types */
import '../styles/ShowTable.css'
import { useState } from 'react';

export const ShowTable = ({ headers = [], rows = [], options = [] }) => {
  const [rowsList, setRowsList] = useState(rows);


  const deleteRow = (row, index) => {
    const rowsListTemporal = rowsList
    rowsListTemporal.splice(index, 1)
    setRowsList([...rowsListTemporal])
    console.log(rowsListTemporal)
  }



  return (
    <>
      {/* FORMILARIO DE BUSQUEDA */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className='form-search-table'>
        <select name='select'>
          {options.map((op, x) => (<option key={x}>{op}</option>))}
        </select>
        <input name='select' />
        <button>Buscar</button>
      </form>

      {/* TABLA DE INFORMACION */}
      <table className="paleBlueRows">
        <thead>
          <tr>
            {headers.map((header, x) => {
              return (
                <th key={x}>{header}</th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {rowsList.map((row, r) => {
            return (
              <tr key={r}>
                {row.map((item, i) => {
                  return (
                    <td key={i}>
                      {item}
                    </td>
                  )
                })}
                <td>
                  <div className='content-btn-table'>
                    <button className='btn-table-edit'>Editar</button>
                    <button className='btn-table-delete' onClick={() => { deleteRow(row, r) }}>Eliminar</button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table >
    </>
  )
}
