import { NavLink, useNavigate } from "react-router-dom"
import Context from "../../utils/context"
import { useContext } from "react"
import "../style/navbar.css"

const Navbar = () => {

  const context = useContext(Context)
  const navigate = useNavigate()

  window.onscroll = () => {
      let y = window.scrollY
      let w = window.innerWidth
      let nav = document.querySelector('.navbar-container')
      let grep = document.querySelector('.grep')
  
      if (w > 420 && nav && grep) {
        if (y > 170) {
          nav.classList.add('fix');
          grep.classList.add('block');
        }
      }
    
      if (nav && grep && nav.classList.contains('fix') && y < 5) {
        nav.classList.remove('fix');
        grep.classList.remove('block');
      }
  }

  const handleSidebar = () => {
    const sidebar = document.querySelector('.sidebar')
    sidebar.classList.toggle('show')
  }

  return (
    <div className="navbar-container">
      <div className='navbar'>
        <div className="nav-logo">
          <img src="/img/vixcera.png"/>
          <div>VI | X</div>
        </div>
        <div className="nav-menu">
          <NavLink className="menu" to="/">Home</NavLink> 
          <NavLink className="menu" to="/products">Product</NavLink> 
          <NavLink className="menu" to="/about">About</NavLink> 
        </div>
        <div className="nav-user">
          {(context.vid) ? 
          <NavLink className='button'><div style={{color: 'var(--background)'}} className="i fa-solid fa-cart-shopping fa-xl"/></NavLink>
          : 
          <NavLink className="button" to="/login">Sign in</NavLink>
          }
        </div>  
        <div className="nav-user-mobile">
          <div className="i fa-solid fa-bell fa-xl"/>
          <div className="i fa-solid fa-qrcode fa-xl" onClick={() => handleSidebar()} style={{fontSize : "28px"}}/>
        </div>
      </div>
    </div>
  )
}

export default Navbar