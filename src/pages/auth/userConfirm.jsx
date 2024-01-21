import axios from "axios"
import swal from "sweetalert2"
import alert from "../../../utils/alert"
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UserConfirm = () => {

    const { token } = useParams()
    const navigate = useNavigate()
    
    const confirm = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}/confirm/user/${token}`)
            swal.fire({
                icon: 'success',
                text: "verification success, let's start exploring vixcera.",
                showConfirmButton: false,
                background: 'var(--primary)',
                color: 'var(--blue)'
            })
            navigate('/login')
        } catch (error) {
            navigate('/')
            alert("internal server error")
            if (error.response) alert(error.response.data)
        }
    }

    useEffect(() => { confirm() }, [])

    return(
        <div className="page">
            <div className="back" onClick={() => navigate('/')}>
                <div className="fa-solid fa-arrow-left fa-xl active"></div>
                <div className="nav-logo" style={{fontFamily: 'var(--caveat)'}}>Vixcera</div>
            </div>
        </div>
    )
}

export default UserConfirm