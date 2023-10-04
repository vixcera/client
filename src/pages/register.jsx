import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'

import "../style/login.css"

const Register = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
                <form className="login-input">
                    <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} required/>
                    <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} required/>
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