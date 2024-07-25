import { NavBarUp } from '../../components/NavBarUp';
import { NavBarLeft } from '../../components/NavBarLeft';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Formularios.css'
import { useUserContext } from '../../providers/UserContext';
import { FormShTable } from '../../providers/FormShTable';
import { ShowTable } from '../../components/ShowTable';
import { FormAdd } from '../../components/FormAdd';

const DATA_TABLE_HEADERS = [
  {
    name: 'DNI',
    type: 'label',
    namequery: 'id',
    defValue: '',
    required: true,
    key: null
  },
  {
    name: 'REF',
    type: 'label',
    namequery: 'ref',
    defValue: '',
    required: false,
    key: null
  },
  {
    name: 'NOMBRE',
    type: 'input',
    namequery: 'name',
    defValue: '',
    required: true,
    key: null
  },
  {
    name: 'DESCRIPCION',
    type: 'input',
    namequery: 'description',
    defValue: '',
    required: true,
    key: null
  },
  {
    name: 'PRECIO',
    type: 'number',
    namequery: 'price',
    defValue: '',
    required: true,
    key: null
  },
  {
    name: 'EXISTENCIAS',
    type: 'number',
    namequery: 'stock',
    defValue: '',
    required: true,
    key: null
  },
  {
    name: 'UND/MEDIDA',
    type: 'input',
    namequery: 'measure',
    defValue: '',
    required: true,
    key: null
  },
  {
    name: 'ID UBICACION',
    type: 'keyForeing',
    namequery: 'location',
    defValue: '',
    required: true,
    key: {
      name: 'UBICACION'
    }
  },
  {
    name: 'UBICACION',
    type: 'none',
    namequery: 'location',
    defValue: 'holis',
    required: true,
    key: null
  },
  {
    name: 'ID CATEGORIA',
    type: 'keyForeing',
    namequery: 'none',
    defValue: '',
    required: false,
    key: false
  },
  {
    name: 'CATEGORIA',
    type: 'input',
    namequery: 'category',
    defValue: '',
    required: true,
    key: false
  },
]

const TITLE_FORM = 'Productos'
const URL_QUERY = `http://localhost:9000/products`;


export const Productos = () => {
  const navigate = useNavigate()
  const [userActions] = useUserContext()

  useEffect(() => {
    if (!userActions.user.token) navigate('/')
  }, []);

  return (
    <>
      <NavBarUp />
      <NavBarLeft />
      <div className='content-dashboard'>
        <FormShTable>
          <FormAdd TITLE_FORM={TITLE_FORM} DATA_TABLE_HEADERS={DATA_TABLE_HEADERS} URL_QUERY={URL_QUERY} />
          <ShowTable headers={DATA_TABLE_HEADERS} URL_QUERY={URL_QUERY} />
        </FormShTable>
      </div>
    </>
  )
}