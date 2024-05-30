import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import '../styles/Login.css'
import Logot from '../assets/logot.png'

export const Login = () => {

  const [user, setUser] = useState(null)

  return (
    <>
      {user ? <Navigate to='/home' /> : <></>}
      <div className='content-form'>
        <form>
          <div className='content-logo'>
            <img src={Logot} alt='Diacs' className='logo-diacs' />
          </div>
          <input type="text" placeholder="username" />
          <input type="text" placeholder="password" />
          <input type="submit" value="login" className='btn-form'
            onClick={(e) => {
              e.preventDefault()
              setUser({
                id: '3',
                userName: 'yevgeny',
                permission: 'administartor'
              })
            }}
          />
        </form>
      </div>
    </>
  )
}
