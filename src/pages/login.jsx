import { NavLink, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import Context from "../../utils/context"
import Swal from "sweetalert2"
import axios from "axios"

import "../style/login.css"

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const context = useContext(Context)
    const url = `https://api-dimasputra.cyclic.app/admin`

    const handleLogin = async (event) => {
        event.preventDefault()
        context.setLoading(true)
        try {
            const response = await axios.post(url, { email, password, username : email })
            const token = response.data.accesstoken
            localStorage.setItem('token', token)
            navigate('/')
        }
        catch (error) {
            if (error.response) {
                Swal.fire({
                icon : "error",
                color : "var(--text)",
                iconColor : "var(--yellow)",
                background : "var(--primary)",
                text : error.response.data,
                showConfirmButton : false,
                timer : 2000
            })
            } 
        }
        finally{context.setLoading(false)}
    }

    return(
        <div className="page">
            <div className="back" onClick={() => navigate('/')}>
                <div className="fa-solid fa-arrow-left fa-xl active"></div>
                <div className="nav-logo">
                    <p style={{fontFamily : "var(--caveat)"}}>Vixcera</p>
                </div>
            </div>
            <div className="login-box">
                <div className="login-top">
                    <div className="title"><span>Sign</span> in</div>
                    <p className="desc">Free assets to make your <span>work easier.</span></p>
                </div>
                <form className="login-input" onSubmit={handleLogin}>
                    <input type="text" placeholder="email or username" onChange={(e) => setEmail(e.target.value)} required/>
                    <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} required/>
                    <div className="login-button">
                        <button type="submit" className="button" style={{fontFamily : "serif", width : "150px"}}>Sign in</button>
                        <NavLink to='/register' style={{textDecoration : "none", color : "var(--text)"}}>Create account</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
    
}

export default Login