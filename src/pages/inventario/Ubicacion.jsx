import { NavBarUp } from '../../components/NavBarUp'
import { NavBarLeft } from '../../components/NavBarLeft'
import { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ShowTable } from '../../components/ShowTable'
import { FormAdd } from '../../components/FormAdd'
import { FormShTable } from '../../providers/FormShTable'


const DATA_TABLE_HEADERS = [
  {
    name: 'DNI',
    type: 'label',
    namequery: 'id',
    defValue:'',
    required:true,   
    visible:false 
  }, 
  {
    name: 'NOMBRE', 
    type: 'input',
    namequery: 'name',
    defValue:'',
    required:true,
    visible:true
  },
  {
    name: 'DIRECCION',
    type: 'input',
    namequery: 'address',
    defValue:'',
    required:true,
    visible:true
  },
  {
    name: 'OBSERVACION',
    type: 'textArea',
    namequery: 'observation',
    defValue:'',
    required:true,
    visible:true
  }]

const TITLE_FORM = 'Ubicacion de productos en almacen'
const URL_QUERY = `http://localhost:9000/locations`;

export const Ubicacion = () => {
  const navigate = useNavigate()
  const user = useSelector(state => state.user)[0]


  useEffect(() => {
    if (!user.token) navigate('/')
  }, []);


  
  return (
    <>
      <NavBarUp />
      <NavBarLeft />
      <div className="content-dashboard">
        <FormShTable>
          <FormAdd TITLE_FORM={TITLE_FORM} DATA_TABLE_HEADERS={DATA_TABLE_HEADERS} URL_QUERY={URL_QUERY} />
          <ShowTable  headers={DATA_TABLE_HEADERS} URL_QUERY={URL_QUERY}/>
        </FormShTable>
      </div>
    </>
  )
  }
  

  
  // const insertar = async (body) => {
  //   const response = await fetch(URL_QUERY, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${user.token}`,
  //     },
  //     body: JSON.stringify(body)
  //   })
  //   if (response.status < 300) {
  //     buscar()
  //   }
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   const formData = new FormData(e.target)
  //   const dataForm = Object.fromEntries(formData.entries())
  //   insertar(dataForm)
  // }
  
  // {/* <form id='form-items' className='form-items' onSubmit={handleSubmit}>
  // <h2>{TITLE_FORM}</h2>
  // <div className='form-container-full'>
  //     {DATA_TABLE_HEADERS.map((campo, x) => {
    //       return (
      //         <div key={x} className='form-content-items'>
      //           <label>{`${campo.name} :`}</label>
      //           {labelSelector(campo, x)}
      //         </div>
      //       )
      //     })}
      //   </div>
      //   <button id='btn-item' className='btn-form-items' >Nuevo</button>
      // </form> */}
      
      // const labelSelector = (item, x) => {
        //   if (item.type == 'textArea') return (<textarea id={`input-item-${x}`} name={item.namequery} placeholder={item.name} />)
        
        //   if (item.type == 'label') return (<input id={`input-item-${x}`} name={item.namequery} defaultValue='0' />)
        
        //   if (item.type == 'input') return (<input id={`input-item-${x}`} name={item.namequery} placeholder={item.name} />)
        // }