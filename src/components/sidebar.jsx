import { NavLink } from "react-router-dom"
import Context from "../../utils/context"
import { useContext } from "react"
import axios from "axios"
import "../style/sidebar.css"

const Sidebar = () => {

    const context = useContext(Context)

    const hideSidebar = () => {
        if (document.querySelector('.sidebar').classList.contains('show')) {
            document.querySelector('.sidebar').classList.remove('show')
        }
    }

    const logout = async() => {
        try {
            const response = await axios.get(`http://localhost:1010/logout/${context.id}`)
            location.reload()
        } 
        catch (error) {
            {error.response && console.log(error.response.data)}
        }
        
    }

    return (
        <div className="sidebar" onClick={() => hideSidebar()}>
            <div className="nav-logo">
                <img src="/img/viscera.png"/>
                <p>Vixcera</p>
            </div>
            <div className="sideitem">
                <div className="topside">
                    <NavLink className="sidelist" to="/">
                        <i className="fa-solid fa-home fa-xl"/>
                        <div className="sidetext">Home</div>
                    </NavLink>
                    <NavLink className="sidelist" to="/pricing">
                        <i className="fa-solid fa-sack-dollar fa-xl"></i>
                        <div className="sidetext">Pricing</div>
                    </NavLink>
                    <NavLink className="sidelist" to="/support">
                        <i className="fa-solid fa-heart fa-xl"></i>
                        <div className="sidetext">Support</div>
                    </NavLink>
                </div>

                <div className="botside">
                    {(context.id) ? 
                    <>
                    <NavLink className={a => (a.isActive) ? "sidelist" : "sidelist"} to="/user">
                        <div className="fa-solid fa-user fa-xl"/>
                        <div className="sidetext">Account</div>
                    </NavLink>
                    <NavLink className={a => (a.isActive) ? "sidelist" : "sidelist"} onClick={() => logout()}>
                        <i className="fa-solid fa-right-from-bracket fa-xl"/>
                        <div className="sidetext">Log out</div>
                    </NavLink>
                    </>
                    : 
                    <NavLink className={a => (a.isActive) ? "sidelist" : "sidelist"} to="/login">
                        <i className="fa-solid fa-right-to-bracket fa-xl"/>
                        <div className="sidetext">Sign in</div>
                    </NavLink>}
                </div>
            </div>
        </div>
    )
}

export default Sidebar