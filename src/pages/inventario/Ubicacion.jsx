import { NavBarUp } from '../../components/NavBarUp'
import { NavBarLeft } from '../../components/NavBarLeft'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ShowTable } from '../../components/ShowTable'


const DATA_TABLE_HEADERS = [
  {
    name: 'ID',
    type: 'label',
    namequery: 'id'
  },
  {
    name: 'NOMBRE',
    type: 'input',
    namequery: 'name'
  },
  {
    name: 'DIRECCION',
    type: 'input',
    namequery: 'address'
  },
  {
    name: 'OBSERVACION',
    type: 'textArea',
    namequery: 'observation'
  }]

// const DATA_TABLE_ROWS = [
//   ['CEL 1 1', 'CEL 1 2', 'CEL 1 3', 'CEL 1 4', 'CEL 1 5'],
//   ['CEL 2 1', 'CEL 2 2', 'CEL 2 3', 'CEL 2 4', 'CEL 2 5'],
//   ['CEL 3 1', 'CEL 3 2', 'CEL 3 3', 'CEL 3 4', 'CEL 3 5'],
//   ['CEL 4 1', 'CEL 4 2', 'CEL 4 3', 'CEL 4 4', 'CEL 4 5'],
//   ['CEL 5 1', 'CEL 5 2', 'CEL 5 3', 'CEL 5 4', 'CEL 5 5'],
// ]

const TITLE_FORM = 'Ubicacion de productos en almacen'
const URL_QUERY = `http://localhost:9000/locations`;

export const Ubicacion = () => {
  const navigate = useNavigate()
  const user = useSelector(state => state.user)[0]
  const [table, settable] = useState([]);


  useEffect(() => {
    if (!user.token) navigate('/')
    buscar()
  }, []);

  const buscar = async () => {
    const response = await fetch(URL_QUERY, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      }
    })

    const data = await response.json()
    const tableScrip = []
    data.forEach(element => {
      tableScrip.push(Object.values(element))
    });

    settable([...tableScrip])
  }

  const insertar = async (body) => {
    const response = await fetch(URL_QUERY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify(body)
    })
    if (response.status < 300) {
      buscar()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const dataForm = Object.fromEntries(formData.entries())
    insertar(dataForm)
  }

  return (
    <>
      <NavBarUp />
      <NavBarLeft />
      <div className="content-dashboard">
        <form id='form-items' className='form-items' onSubmit={handleSubmit}>
          <h2>{TITLE_FORM}</h2>
          <div className='form-container-full'>
            {DATA_TABLE_HEADERS.map((campo, x) => {
              return (
                <div key={x} className='form-content-items'>
                  <label>{`${campo.name} :`}</label>
                  {labelSelector(campo, x)}
                </div>
              )
            })}
          </div>
          <button id='btn-item' className='btn-form-items' >Nuevo</button>
        </form>


        <ShowTable headers={DATA_TABLE_HEADERS} rows={table} />
      </div>
    </>
  )
}

const labelSelector = (item, x) => {
  if (item.type == 'textArea') return (<textarea id={`input-item-${x}`} name={item.namequery} placeholder={item.name} />)

  if (item.type == 'label') return (<input id={`input-item-${x}`} name={item.namequery} defaultValue='0' />)

  if (item.type == 'input') return (<input id={`input-item-${x}`} name={item.namequery} placeholder={item.name} />)
}