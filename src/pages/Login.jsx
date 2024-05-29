import { useState } from 'react'
import { Navigate } from 'react-router-dom'

export const Login = () => {

  const [user, setUser] = useState(null)

  return (
    <>
      <div>
        {user ? <Navigate to='/home' /> : <></>}
        <form>
          <input type="text" placeholder="username" />
          <input type="text" placeholder="password" />
          <input type="submit" value="login"
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
