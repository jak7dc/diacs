import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Register } from './pages/inicio/Register'
import { Login } from './pages/inicio/Login'
import { Home } from './pages/Home'
import './styles/Index.css'
import { Productos } from './pages/inventario/Productos'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Home />} />
          <Route path='/products' element={<Productos />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
