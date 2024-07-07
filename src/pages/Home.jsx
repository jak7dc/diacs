import { NavBarLeft } from "../components/NavBarLeft"
import { NavBarUp } from "../components/NavBarUp"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "../providers/UserContext"

export const Home = () => {

  // const user = useSelector(state => state.user)[0]
  const [userActions] = useUserContext()

  const navigate = useNavigate()
  useEffect(() => {
    if (!userActions.user.token) navigate('/')
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
