import logot from '../assets/logot.png'
import '../styles/NavbarUp.css'
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react'


export const NavBarUp = () => {
  const navigate = useNavigate()
  const [userState, setUserState] = useState({});

  const user = useSelector(state => state.user)


  useEffect(() => {
    setUserState(user[0])
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
