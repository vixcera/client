import { NavLink, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import Context from "../../../utils/context"
import cookie from "js-cookie"
import Swal from "sweetalert2"
import axios from "axios"
import "../../style/login.css"

const Login = () => {

    const [as, setAs] = useState('user')
    const [url, setUrl] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const context = useContext(Context)

    useEffect(() => {
        if (as == 'user') return setUrl(`${import.meta.env.VITE_API}/login`)
        else return setUrl(`${import.meta.env.VITE_API}/login/contributor`)
    }, [as])

    const handleLogin = async (event) => {
        event.preventDefault()
        context.setLoading(true)
        try {
            const response = await axios.post(url, { email, password }, {withCredentials: true})
            context.setToken(response.data.token)
            cookie.set('reftoken', response.data.token, {expires : 24 * 60 * 60 * 1000})
            navigate('/user')
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
                <div className="nav-logo" style={{fontFamily: 'var(--caveat)'}}>Vixcera</div>
            </div>
            <div className="login-box">
                <div className="login-top">
                    <div className="title"><span>Sign</span> in</div>
                    <p className="desc">Free assets to make your <span>work easier.</span></p>
                </div>
                <form className="login-input" onSubmit={handleLogin}>
                    <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <div className="login-button">
                        <button type="submit" className="button" style={{fontFamily : "serif", width : "150px"}}>Sign in</button>
                        <select onChange={(e) => setAs(e.target.value)} style={{width: '120px'}} required>
                            <option value="user">User</option>
                            <option value="contributor">Contributor</option>
                        </select>
                    </div>
                    <NavLink to='/register' style={{textDecoration : "none", color : "var(--text)", translate: '0 20px'}}>Create account</NavLink>
                </form>
            </div>
        </div>
    )
    
}

export default Login