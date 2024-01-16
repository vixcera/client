import axios from "axios"
import swal from "sweetalert2"
import alert from "../../../utils/alert"
import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Context from "../../../utils/context"

const UserConfirm = () => {

    const { token } = useParams()
    const navigate = useNavigate()
    const context = useContext(Context)
    
    const confirm = async () => {
        context.setLoading(true)
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}/confirm/user/${token}`)
            swal.fire({
                icon: 'success',
                text: "welcome to vixcera, let's start exploring with us.",
                showConfirmButton: false,
                timer: 1500,
                background: 'var(--primary)',
                color: 'var(--blue)'
            })
            .then((res) => {
                if (res.dismiss) return location.href = '/login'
            })
        } catch (error) {
            alert("internal server error").then(() => navigate('/'))
            if (error.response) {alert(error.response.data).then((res) => {
                if (res.dismiss) return location.href = '/register'
            })}
        }
        finally{context.setLoading(false)}
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