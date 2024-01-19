import { NavLink, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import Context from "../../../utils/context"
import alert from "../../../utils/alert"
import Swal from "sweetalert2"
import axios from "axios"
import "../../style/login.css"

const Login = () => {
    
    const navigate = useNavigate()
    const context = useContext(Context)
    const refemail = localStorage.getItem('email')

    const [as, setAs] = useState('user')
    const [url, setUrl] = useState('')
    const [email, setEmail] = useState((refemail) ? refemail : '')
    const [password, setPassword] = useState('')


    useEffect(() => {
        if (as == 'user') return setUrl(`${import.meta.env.VITE_API}/login`)
        else return setUrl(`${import.meta.env.VITE_API}/login/contributor`)
    }, [as])

    const handleLogin = async (event) => {
        event.preventDefault()
        localStorage.setItem('email', email)
        context.setLoading(true)
        try {
            const response = await axios.post(url, { email, password }, {withCredentials: true})
            context.setToken(response.data.token)
            localStorage.removeItem('email')
            navigate('/profile')
        }
        catch (error) {
            alert("server maintenance!")
            error.response && alert(error.response.data)  
        }
        finally{context.setLoading(false)}
    }

    // useEffect(() => {axios.get(`${import.meta.env.VITE_API}/ready`)}, [])

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
                    <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <div className="login-button">
                        <select onChange={(e) => setAs(e.target.value)} style={{width: '120px'}} required>
                            <option value="user">User</option>
                            <option value="contributor">Contributor</option>
                        </select>
                        <button type="submit" className="button" style={{fontFamily : "serif", width : "150px"}}>Sign in</button>
                    </div>
                    <NavLink to='/register' style={{textDecoration : "none", color : "var(--text)", translate: '0 20px'}}>Create account</NavLink>
                </form>
            </div>
        </div>
    )
    
}

export default Login