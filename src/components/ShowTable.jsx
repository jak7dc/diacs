/* eslint-disable react/prop-types */
import '../styles/ShowTable.css'
import { useState } from 'react';

export const ShowTable = ({ headers = [], rows = [] }) => {
  const [rowsList, setRowsList] = useState(rows);
  const [formSearch, setFormSearch] = useState({
    header: '',
    search: ''
  });

  const deleteRow = (row, index) => {
    const rowsListTemporal = rowsList
    rowsListTemporal.splice(index, 1)
    setRowsList([...rowsListTemporal])

  }

  const editRow = (row) => {
    row.forEach((element, index) => {
      document.getElementById(`input-item-${index}`).value = element
    });
    document.getElementById('form-items').className = 'form-items'
    document.getElementById('btn-item').innerText = 'Editar'
    document.getElementById('btn-item').className = 'btn-form-items-edit'
  }

  // SUBMIT DE BUSQUEDA

  const fsHandleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const dataForm = Object.fromEntries(formData.entries())
    setFormSearch({
      ...formSearch,
      header: dataForm.select,
      search: dataForm.search,
    })

    // RECUPERAMOS LAS CABECERAS CON LOS VALORES AFECTADOS POR EL NAVEGADOR 
    const keyHeaders = headers.map((item, index) => {
      return (
        document.getElementById(`key_header_${index}`).innerText
      )
    })

    const indexSearch = keyHeaders.indexOf(dataForm.select);

    const rowsListTemporal = []
    rows.forEach(row => {
      const strSearch = row[indexSearch]
      strSearch.toLowerCase().includes(dataForm.search.toLowerCase()) ? rowsListTemporal.push(row) : null;
    });
    setRowsList([...rowsListTemporal])

  }

  // SUBMIT DE FORMULARIO PRINCIPAL
  const fpHandleSubmit = (e) => {
    e.preventDefault()
    // const formData = new FormData(e.target)
    // const dataForm = Object.fromEntries(formData.entries())
    // const newRow = []
    // for (const key in dataForm) {
    //   newRow.push(dataForm[key])
    // }
    // const rowsListTemporal = rowsList

    // rowsListTemporal.forEach((row, index) => {
    //   const strSearch = row[0]
    //   strSearch.includes(newRow[0]) ? rowsListTemporal.splice(index, 1, newRow) : null;
    // });

    // setRowsList([...rowsListTemporal])
    document.getElementById('form-items').className = 'oculto'
    document.getElementById('btn-search-new').className = 'btn-search-new'
  }

  return (
    <>
      <form id='form-items' className='oculto' onSubmit={fpHandleSubmit}>
        <h2>Productos</h2>
        <div className='form-container-full'>
          {headers.map((campo, x) => {
            return (
              <div key={x} className='form-content-items'>
                <label> {campo}</label>
                <input id={`input-item-${x}`} name={campo} placeholder={campo} />
              </div>
            )
          })}
        </div>
        <button id='btn-item' className='btn-form-items' >Nuevo</button>
      </form>

      {/* FORMILARIO DE BUSQUEDA */}
      <div className='form-items'>
        <div className='container-form-search'>
          <form
            onSubmit={fsHandleSubmit}
            className='form-search-table'>
            <select name='select'>
              {headers.map((op, x) => (<option key={x} name={op}>{op}</option>))}
            </select>
            <input name='search' />
            <button>Buscar</button>
          </form>
          <button id='btn-search-new' className='btn-search-new'
            onClick={() => {
              document.getElementById('form-items').className = 'form-items'
              document.getElementById('btn-search-new').className = 'oculto'
              document.getElementById('btn-item').innerText = 'Nuevo'
              document.getElementById('btn-item').className = 'btn-form-items'
              headers.forEach((element, index) => {
                document.getElementById(`input-item-${index}`).value = ''
              });
            }}
          >New</button>
        </div>

        {/* TABLA DE INFORMACION */}
        <table className="paleBlueRows">
          <thead>
            <tr>
              {headers.map((header, x) => {
                return (
                  <th id={`key_header_${x}`} key={x}>{header}</th>
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
                      <button className='btn-table-edit' onClick={() => { editRow(row) }}>Editar</button>
                      <button className='btn-table-delete' onClick={() => { deleteRow(row, r) }}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table >
      </div>
    </>
  )
}
