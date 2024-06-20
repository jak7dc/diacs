import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Register } from './pages/inicio/Register'
import { Login } from './pages/inicio/Login'
import { Home } from './pages/Home'
import './styles/Index.css'
import { Productos } from './pages/inventario/Productos'
import { Ubicacion } from './pages/inventario/Ubicacion'
import { Categoria } from './pages/inventario/Categoria'

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          < Route path='/dashboard' element={<Home />} />
          <Route path='/products' element={<Productos />} />
          <Route path='/register' element={<Register />} />
          <Route path='/location' element={<Ubicacion />} />
          <Route path='/category' element={<Categoria />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
