import Context from "../../utils/context"
import { NavLink } from "react-router-dom"
import { useContext } from "react"
import "../style/sidebar.css"

const Sidebar = () => {

    const context = useContext(Context)

    const hideSidebar = () => {
        if (document.querySelector('.sidebar').classList.contains('show')) {
            document.querySelector('.sidebar').classList.remove('show')
        }
    }

    return (
        <div className="sidebar" onClick={() => hideSidebar()}>
            <div className="nav-logo">
                <img src="/img/vixcera.png"/>
                <p>Vixcera</p>
            </div>
            <div className="sideitem">
                <div className="topside">
                    <NavLink className="sidelist" to="/">
                        <i className="fa-solid fa-home fa-xl"/>
                        <div className="sidetext">Home</div>
                    </NavLink>
                    <NavLink className="sidelist" to="/products">
                        <i className="fa-solid fa-layer-group fa-xl"></i>
                        <div className="sidetext">Products</div>
                    </NavLink>
                    <NavLink className="sidelist" to={context.token ? '/store' : '/about'}>
                        <i className={context.token ? 'fa-solid fa-clock-rotate-left fa-xl' : 'fa-solid fa-circle-info fa-xl'}></i>
                        <div className="sidetext">{context.token ? 'Order history' : 'About'}</div>
                    </NavLink>
                </div>

                <div className="botside">
                    {(context.token) ? 
                    <>
                    <NavLink className={a => (a.isActive) ? "sidelist" : "sidelist"} to="/profile">
                        <div className="fa-solid fa-user fa-xl"/>
                        <div className="sidetext">Account</div>
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