import axios from "axios"
import swalert from "../utils/swalert"
import Loading from "../utils/loading"
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const AuthRegisterUser = () => {

    const { token } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    
    const confirm = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_API}/confirm/user/${token}`)
            swalert("verification success, let's start exploring vixcera.", "success", 1500)
            .then((res) => res.dismiss && navigate('/login'))
        } catch (error) {
            if (error || error.response) {
                swalert(error.response.data || "internal server error", "error", 1500)
                .then((res) => res.dismiss && navigate('/'))
            }
        } finally {
            setLoading(false)
        }
    }
    if (loading) return <Loading/>
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

export const AuthRegisterCont = () => {
    const { token } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    
    const confirm = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_API}/confirm/user/${token}`)
            swalert("verification success, let's start collab with us.", "success", 1500)
            .then((res) => res.dismiss && navigate('/login'))
        } catch (error) {
            if (error || error.response) {
                swalert(error.response.data || "internal server error", "error", 1500)
                .then((res) => res.dismiss && navigate('/'))
            }
        } finally {
            setLoading(false)
        }
    }
    if (loading) return <Loading/>
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