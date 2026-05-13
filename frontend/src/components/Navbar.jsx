import { NavLink } from 'react-router-dom'
import '../styles/navbar.css'

const Navbar = () => {
  return (
    <nav>
      <h1>ImageSearcher</h1>
      <ul>
        <li><NavLink to="/" className={(e)=>{return e.isActive?"active":""}}>Home</NavLink></li>
        <li><NavLink to="/favourites" className={(e)=>{return e.isActive?"active":""}}>Favourites</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navbar