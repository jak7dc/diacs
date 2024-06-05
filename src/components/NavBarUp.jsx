import logot from '../assets/logot.png'
import '../styles/NavbarUp.css'
import { useNavigate } from 'react-router-dom';

export const NavBarUp = () => {
  const navigate = useNavigate()

  const loguot = () => {
    navigate('/')
  }

  return (
    <nav className='content-navbar'>
      <div className='content-logo-navUp'>
        <img className='logo-diacs-navUp' src={logot} alt="no imagen" />
      </div>
      <div className='content-nav-rigth'>
        <h2>yevgeny sierra</h2>
        <button onClick={loguot} className='btn-logout'>logout</button>
      </div>
    </nav>
  )
}
