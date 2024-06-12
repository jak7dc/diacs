import { Link, useNavigate } from 'react-router-dom'
import '../../styles/Login.css'
import Logot from '../../assets/logot.png'
import { useState } from 'react'

export const Register = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate()

  const createUser = async (user) => {
    try {
      const response = await fetch(`http://localhost:9000/createUser`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      const data = await response.json()
      if (response.status > 299) {
        if (data.errorCode) {
          setErrorMsg(data.message)
        }
      } else {
        navigate('/')
      }
    } catch (error) {
      setErrorMsg('error de coneccion')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const dataForm = Object.fromEntries(formData.entries())
    if (dataForm.password == dataForm.repeatPassword) {
      setErrorMsg('')
      createUser({
        username: dataForm.username,
        password: dataForm.password
      })
    } else {
      setErrorMsg('Contraseñas no coinsiden')
    }
  }

  return (
    <>
      <div className='content-form'>
        <form onSubmit={handleSubmit} className='login-form'>
          <div className='content-logo'>
            <img src={Logot} alt='Diacs' className='logo-diacs' />
          </div>
          <input name='username' className='login-input' type="text" placeholder="nombre de usuario" />
          <input name='password' className='login-input' type="text" placeholder="contraseña" />
          <input name='repeatPassword' className='login-input' type="text" placeholder="repetir contraseña" />
          {errorMsg ? <label>{errorMsg}</label> : null}
          <input type="submit" value="Registrarme" className='btn-form' />
          <Link to='/'>Iniciar sesion</Link>
        </form>
      </div>
    </>
  )
}
