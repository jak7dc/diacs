import { NavBarLeft } from "../components/NavBarLeft"
import { NavBarUp } from "../components/NavBarUp"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const Home = () => {

  const user = useSelector(state => state.user)[0]
  const navigate = useNavigate()
  useEffect(() => {
    if (!user.token) navigate('/')
  }, []);

  return (
    <>
      <NavBarUp />
      <NavBarLeft />
      <div className="content-dashboard">
        <h2>dashboard</h2>
      </div>

    </>
  )
}
