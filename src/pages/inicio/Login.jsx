import { Link, useNavigate } from 'react-router-dom'
import '../../styles/Login.css'
import Logot from '../../assets/logot.png'
import { useDispatch } from 'react-redux'
import { setUser } from "../../context/userSlice";
import { useState } from "react";


export const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState('');

  const getLogin = async (e) => {
    e.preventDefault()

    const formdata = new FormData(e.target)
    const dataForm = Object.fromEntries(formdata.entries())
    const response = await fetch('http://localhost:9000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataForm)

    })
    const data = await response.json()

    if (response.status > 299) {
      setErrorMsg(data.message)
    }
    if (data.token) {
      dispatch(setUser({
        username: dataForm.username,
        token: data.token
      }))
      navigate('/dashboard')
    }
  }


  return (
    <>
      <div className='content-form'>
        <form onSubmit={getLogin} className='login-form'>
          <div className='content-logo'>
            <img src={Logot} alt='Diacs' className='logo-diacs' />
          </div>
          <input name='username' className='login-input' type="text" placeholder="username" />
          <input name='password' className='login-input' type="text" placeholder="password" />
          {errorMsg ? <label>{errorMsg}</label> : null}
          <input type="submit" value="Iniciar sesion" className='btn-form' />
          <Link to='/register'>registrarme</Link>
        </form>
      </div>
    </>
  )
}
