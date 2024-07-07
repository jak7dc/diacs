/* eslint-disable react/prop-types */
import '../styles/ShowTable.css'
import { useEffect } from 'react';
import { useStateForm, useStateTable } from '../providers/FormShTable';
import Swal from 'sweetalert2'
import { useUserContext } from '../providers/UserContext';

export const ShowTable = ({ headers = [], URL_QUERY = '' }) => {

  const [userActions] = useUserContext()
  const [stateForm, setStateForm] = useStateForm();
  const [stateTable, setStateTable] = useStateTable();

  useEffect(() => {
    buscar()
  }, []);


  // BUSCAR EN BASE DE DATOS
  const buscar = async (dataForm = { select: '', search: '' }) => {
    const response = await fetch(URL_QUERY, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
        'Authorization': `Bearer ${userActions.user.token}`
      }
    })
    const data = await response.json()
    const tableScrip = []
    data.forEach(element => {
      tableScrip.push(Object.values(element))
    });


    // RECUPERAMOS LAS CABECERAS CON LOS VALORES AFECTADOS POR EL NAVEGADOR
    const keyHeaders = headers.map((item, index) => {
      return (
        document.getElementById(`key_header_${index}`).innerText
      )
    })

    if (dataForm.select == '') {
      dataForm.select = keyHeaders[0]
    }

    //  ENCUENTRA EL INDEX DEL SELECT
    const indexSearch = keyHeaders.indexOf(dataForm.select);

    // REALIZA LA BUSQUEDA Y RETORNA EL ARREGLO DE COLUMNAS
    const rowsListTemporal = []
    tableScrip.forEach(row => {
      const strSearch = row[indexSearch].toString()
      strSearch.toLowerCase().includes(dataForm.search.toLowerCase()) ? rowsListTemporal.push(row) : null;
    });


    setStateTable([...rowsListTemporal])

  }

  // SUBMIT DE BUSQUEDA

  const fsHandleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const dataForm = Object.fromEntries(formData.entries())

    buscar(dataForm)
  }



  // ELIMINAR FILA DE DATOS

  const deleteRow = async (row) => {
    const body = { id: row[0] }
    const response = await fetch(URL_QUERY, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json',
        'Authorization': `Bearer ${userActions.user.token}`
      },
      body: JSON.stringify(body)
    })
    const data = await response.json()
    if (response.status < 299) {
      Swal.fire({
        title: 'Item eliminado',
        icon: "success",
        text: 'Este mensaje desaparecera en 2 segundos',
        timer: 2000
      })
      buscar()
    } else {
      Swal.fire({
        title: 'Ups Error',
        text: data.message,
        icon: "error",
      })
    }
  }

  const editRow = (row) => {
    // console.log(row);
    setStateForm({ ...stateForm, estado: 'visible', values: row, acction: 'Editar' })
  }


  return (
    <>
      {/* FORMILARIO DE BUSQUEDA */}
      <div className='form-items'>
        <div className='container-form-search'>
          <button className='btn-form-items' onClick={() => { setStateForm({ ...stateForm, estado: 'visible', values: ['0'], acction: 'Nuevo' }) }} >Nuevo</button>
          <form className='form-search-table' onSubmit={fsHandleSubmit} >
            <select name='select'>
              {headers.map((op, x) => (<option key={x} name={op.namequery}>{op.name}</option>))}
            </select>
            <input name='search' />
            <button>Buscar</button>
          </form>
        </div>

        <div className='content-scroll'>
          <table className="paleBlueRows">
            <thead>
              <tr>
                {headers.map((header, x) => {
                  return (
                    <th id={`key_header_${x}`} key={x}>{header.name}</th>
                  )
                })}
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {stateTable.map((row, r) => {
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
                        <button className='btn-table-edit'
                          onClick={() => { editRow(row) }}
                        >Editar</button>
                        <button className='btn-table-delete'
                          onClick={() => { deleteRow(row) }}
                        >Eliminar</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table >
        </div>
      </div>
    </>
  )
}