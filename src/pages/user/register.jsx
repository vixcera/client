import { useContext, useState, useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import Context from "../../../utils/context"
import swal from "sweetalert2"
import axios from "axios"

import "../../style/login.css"

const Register = () => {

    const navigate = useNavigate()
    const context = useContext(Context)

    const [vxsrf, setVxsrf] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const createUser = async (e) => {
        e.preventDefault()
        context.setLoading(true)
        try {
            const response = await axios.post(`${import.meta.env.VITE_API}/register`,
            {email, username, password}, {headers: { "xsrf-token" : vxsrf }})
            swal.fire({icon: 'success', text: response.data, showConfirmButton: false, background: 'var(--primary)', color: 'var(--blue)'})
            .then(() => navigate('/'))
        } 
        catch (error) {
            swal.fire({icon: 'error', showConfirmButton: false, timer: 1500, text: error.response.data, background: 'var(--primary)', color: 'var(--blue)'})
        }
        finally {context.setLoading(false)}
    }

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API}/getvxsrf`)
        .then((result) => setVxsrf(result.data))
    }, [])


    return (
        <div className="page">
            <div className="back" onClick={() => navigate('/')}>
                <div className="fa-solid fa-arrow-left fa-xl active"></div>
                <div className="nav-logo">
                    <p style={{fontFamily : "var(--caveat)"}}>Vixcera</p>
                </div>
            </div>
            <div className="login-box">
                <div className="login-top">
                    <div className="title"><span>Regis</span>ter</div>
                    <p className="desc">Free assets to make your <span>work easier.</span></p>
                </div>
                <form onSubmit={createUser} className="login-input">
                    <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <input type="text" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} required/>
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <div className="login-button">
                        <button type="submit" className="button" style={{fontFamily : "serif", width : "150px"}}>Create</button>
                        <NavLink to="/login" style={{textDecoration : "none", color : "var(--text)"}}>Have an account</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register