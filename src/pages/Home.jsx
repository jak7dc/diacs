import { NavBarLeft } from "../components/NavBarLeft"
import { NavBarUp } from "../components/NavBarUp"

export const Home = () => {
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
