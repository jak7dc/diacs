import { NavBarUp } from '../../components/NavBarUp';
import { NavBarLeft } from '../../components/NavBarLeft';
// import { ShowTable } from '../../components/ShowTable';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../styles/Formularios.css'


// const DATA_TABLE_HEADERS = ['HEADER 1', 'HEADER 2', 'HEADER 3', 'HEADER 4', 'HEADER 5']
// const DATA_TABLE_ROWS = [
//   ['CEL 1 1', 'CEL 1 2', 'CEL 1 3', 'CEL 1 4', 'CEL 1 5'],
//   ['CEL 2 1', 'CEL 2 2', 'CEL 2 3', 'CEL 2 4', 'CEL 2 5'],
//   ['CEL 3 1', 'CEL 3 2', 'CEL 3 3', 'CEL 3 4', 'CEL 3 5'],
//   ['CEL 4 1', 'CEL 4 2', 'CEL 4 3', 'CEL 4 4', 'CEL 4 5'],
//   ['CEL 5 1', 'CEL 5 2', 'CEL 5 3', 'CEL 5 4', 'CEL 5 5'],
// ]

export const Productos = () => {
  const user = useSelector(state => state.user)[0]
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.token) navigate('/')
  }, []);

  return (
    <>
      <NavBarUp />
      <NavBarLeft />
      <div className='content-dashboard'>
        <div className='content-table'>
          {/* <ShowTable headers={DATA_TABLE_HEADERS} rows={DATA_TABLE_ROWS} /> */}
        </div>
      </div>
    </>
  )
}


// return (
//   <>
//     <NavBarUp />
//     <NavBarLeft />
//     <div className='content-dashboard'>
//       <div className='content-table'>
//         <ShowTable headers={DATA_TABLE_HEADERS} rows={DATA_TABLE_ROWS} />
//       </div>
//     </div>
//   </>
// )