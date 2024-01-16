import axios from "axios"
import alert from "../../../utils/alert"
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Context from "../../../utils/context"

const UserConfirm = () => {

    const { token } = useParams()
    const context = useContext(Context)
    
    useEffect(() => {
        context.setLoading(true)
        axios.get(`${import.meta.env.VITE_API}/confirm/user/${token}`)
        .then((response) => location.replace('/register'))
        .catch((error) => (error.response) && alert(error.response.data).then((res) => location.replace('/')))
        .finally(() => context.setLoading(false))
    }, [])

    return(
        <div className="page-max"></div>
    )
}

export default UserConfirm