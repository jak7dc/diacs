import logot from '../assets/logot.png'
import '../styles/NavbarUp.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useUserContext } from '../providers/UserContext';


export const NavBarUp = () => {
  const navigate = useNavigate()
  const [userState, setUserState] = useState({});

  const [userActions] = useUserContext()


  useEffect(() => {
    setUserState(userActions.user)
  }, []);

  const loguot = () => {
    navigate('/')
  }

  return (
    <nav className='content-navbar'>
      <div className='content-logo-navUp'>
        <img className='logo-diacs-navUp' src={logot} alt="no imagen" />
      </div>
      <div className='content-nav-rigth'>
        <h2>{userState.username}</h2>
        <button onClick={loguot} className='btn-logout'>logout</button>
      </div>
    </nav>
  )
}
