import axios from "axios"
import swal from "sweetalert2"
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
            const response = await axios.get(`${import.meta.env.VITE_API}/confirm/user/$${token}`)
            swal.fire({
                icon: 'success',
                text: "welcome to vixcera, let's start exploring with us.",
                showConfirmButton: false,
                timer: 1500,
                background: 'var(--primary)',
                color: 'var(--blue)'
            })
            .then(() => { navigate('/login') })
        } catch (error) {
            if (error || error.response) {
                alert(error.response.data)
            }
        }
        finally{context.setLoading(false)}
    }

    return(
        <div className="page-max">

        </div>
    )
}

export default UserConfirm