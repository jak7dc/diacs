import { NavBarLeft } from "../../components/NavBarLeft"
import { NavBarUp } from "../../components/NavBarUp"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ShowTable } from "../../components/ShowTable"
import { FormAdd } from "../../components/FormAdd"
import { FormShTable } from "../../providers/FormShTable"
import { useUserContext } from "../../providers/UserContext";

const DATA_TABLE_HEADERS = [
  {
    name: 'DNI',
    type: 'label',
    namequery: 'id',
    defValue: '',
    required: true
  },
  {
    name: 'NOMBRE',
    type: 'input',
    namequery: 'name',
    defValue: '',
    required: true
  },
  {
    name: 'DESCRIPCION',
    type: 'textArea',
    namequery: 'description',
    defValue: '',
    required: true
  },]

const TITLE_FORM = 'Categorias de productos'
const URL_QUERY = `http://localhost:9000/categories`;




export const Categoria = () => {
  const [userActions] = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userActions.user.token) navigate('/')
  }, []);


  return (
    <>
      <NavBarUp />
      <NavBarLeft />
      <div className="content-dashboard">
        <FormShTable>
          <FormAdd TITLE_FORM={TITLE_FORM} DATA_TABLE_HEADERS={DATA_TABLE_HEADERS} URL_QUERY={URL_QUERY} />
          <ShowTable headers={DATA_TABLE_HEADERS} URL_QUERY={URL_QUERY} />
        </FormShTable>

      </div>
    </>
  )
}
