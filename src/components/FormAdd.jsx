/* eslint-disable react/prop-types */
import Swal from 'sweetalert2'
import { useEffect, useState } from "react"
import { useStateForm, useStateTable } from "../providers/FormShTable"
import { useUserContext } from '../providers/UserContext'

export const FormAdd = ({ TITLE_FORM = '', DATA_TABLE_HEADERS = [], URL_QUERY = '' }) => {
  const [userActions] = useUserContext()
  const [stateForm, setStateForm] = useStateForm();
  // eslint-disable-next-line no-unused-vars
  const [stateTable, setStateTable] = useStateTable();
  const [headers, setHeaders] = useState(DATA_TABLE_HEADERS);

  useEffect(() => {
    inicializar()
  }, [stateForm]);


  const inicializar = () => {
    const formulario = document.getElementById('form-items')

    // CAMBIA COLOR DEL BOTON DE ACCION DEL FORMULARIO
    const btnAcction = document.getElementById('btn-acction')
    if (stateForm.acction == 'Nuevo') {
      btnAcction.innerText = 'Nuevo'
      btnAcction.className = 'btn-form-items'
    } else {
      btnAcction.innerText = 'Editar'
      btnAcction.className = 'btn-form-items-edit'
    }
    // 
    // DETERMINA LOS CAMPOS OBLIGATORIOS
    const headersTemporal = headers
    if (stateForm.estado == 'oculto') {
      formulario.className = 'oculto'
      headers.forEach((element, index) => {
        const input = document.getElementById(`input-item-${index}`)
        input.required = false
      });
    } else {
      formulario.className = 'form-items'
      headersTemporal.forEach((element, index) => {
        headersTemporal[index].defValue = stateForm.values[index]
        const input = document.getElementById(`input-item-${index}`)
        input.value = '';
        if (element.required) { input.required = true }

        if (stateForm.values[index]) input.value = stateForm.values[index]
      });
    }
    setHeaders([...headersTemporal])
  }

  // BUSCAR EN BASE DE DATOS
  const buscar = async () => {
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
    setStateTable([...tableScrip])
  }

  // GUARDAR ITEM EN BASE DE DATOS
  const insertar = async (body) => {
    const response = await fetch(URL_QUERY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userActions.user.token}`,
      },
      body: JSON.stringify(body)
    })
    if (response.status < 300) {
      buscar()
      setStateForm({ ...stateForm, estado: 'oculto' })
      Swal.fire({
        title: 'Item Agregado',
        text: 'Seleccione el boton para continuar',
        icon: "success",
      })
    } else {
      Swal.fire({
        title: 'Ups Error',
        text: 'Seleccione el boton para continuar',
        icon: "error",
      })
    }
  }

  // EDITAR ITEM EN BASE DE DATOS
  const editar = async (body) => {
    const response = await fetch(URL_QUERY, {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/json',
        'Authorization': `Bearer ${userActions.user.token}`
      },
      body: JSON.stringify(body)
    })

    // const data = await response.json()
    if (response.status < 299) {
      buscar()
      setStateForm({ ...stateForm, estado: 'oculto' })
      Swal.fire({
        title: 'Item editado correctamente!',
        text: 'Este mensaje cerrara en 2 segundos.',
        icon: 'success',
        timer: 2000
      })
    }

  }


  const handleSubmit = () => {
    const formData = new FormData(document.getElementById('form-items'))
    const dataForm = Object.fromEntries(formData.entries())

    const validateForm = Object.values(dataForm)
    let isAllRequired = true

    headers.forEach((element, index) => {
      if (element.required) {
        if (!validateForm[index]) { isAllRequired = false }
      }
    });

    if (isAllRequired) {
      if (stateForm.acction == 'Nuevo') insertar(dataForm)
      if (stateForm.acction == 'Editar') editar(dataForm)
    }

  }


  return (
    <>
      <form id='form-items' className='form-items' onSubmit={(e) => { e.preventDefault() }}>
        <h2>{TITLE_FORM}</h2>
        <div className='form-container-full'>
          {headers.map((campo, x) => {
            return (
              <div key={x} className='form-content-items'>
                <label>{`${campo.name} :`}</label>
                {labelSelector(campo, x)}
              </div>
            )
          })}
        </div>
        <button className="btn-form-items-delete"
          onClick={() => {
            setStateForm({ ...stateForm, estado: 'oculto' })
          }}>Salir</button>
        <button id='btn-acction' className={`btn-form-items`} onClick={handleSubmit} >btn</button>
      </form>
    </>
  )
}

const labelSelector = (item, x) => {

  if (item.type == 'none') return (<input id={`input-item-${x}`}
    name={item.namequery}
    placeholder={item.name} />)

  if (item.type == 'textArea') return (<textarea id={`input-item-${x}`}
    name={item.namequery}
    placeholder={item.name} />)

  if (item.type == 'label') return (<input id={`input-item-${x}`}
    name={item.namequery}
    placeholder="0" />)

  if (item.type == 'input') return (<input id={`input-item-${x}`}
    name={item.namequery}
    placeholder={item.name} />)

  if (item.type == 'number') return (<input id={`input-item-${x}`}
    name={item.namequery}
    placeholder={item.name}
    type='number'
  />)

  if (item.type == 'keyForeing') return (
    <div className='form-input-items'>
      <input id={`input-item-${x}`}
        className='id'
        name={item.namequery}
        placeholder={''}
      />
      <input
        className='name'
        placeholder={item.name}
      />
      <button
        onClick={(e) => {
          e.preventDefault()
        }}
        className='btn-form-foreing'
      >.:.</button>
    </div>)

}
