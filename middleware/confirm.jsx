import axios from "axios"
import getvxsrf from "../service/getvxsrf"
import swalert from "../utils/swalert"
import Loading from "../utils/loading"
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Confirm = {
    user : () => {
        const register_mode_user = JSON.parse(localStorage.getItem('register_mode_user'))
        const navigate = useNavigate()
        const [ otp, setOtp ] = useState('')
        const [ vxsrf, setVxsrf ] = useState('')
        const [loading, setLoading] = useState(false)
        const confirm = async () => {
            if (otp) {
                try {
                    setLoading(true)
                    const response = await axios.post(`${import.meta.env.VITE_API}/confirm/user`, {otp}, 
                    { headers: {'xsrf-token': vxsrf} })
                    localStorage.removeItem('register_mode_user')
                    swalert("verification success, let's start exploring vixcera.", "success", 5500)
                    .then((res) => res.dismiss && navigate('/login'))
                } catch (error) {
                    if (error || error.response) {
                        swalert(error.response.data || "internal server error", "error", 1500)
                    }
                } finally {
                    setLoading(false)
                }
            }
        }
        if (loading) return <Loading/>
        useEffect(() => { register_mode_user? getvxsrf().then((data) => setVxsrf(data)) : navigate('/')}, [])
        return(
            <div className="page">
                <div className="back" onClick={() => navigate('/')}>
                    <div className="fa-solid fa-arrow-left fa-xl active"></div>
                    <div className="nav-logo" style={{fontFamily: 'var(--caveat)'}}>Vixcera</div>
                </div>
                <div className="form" style={{ textAlign: 'center', gap: '50px' }}>
                    <div style={{display: 'flex', gap: '20px', justifyContent: 'center'}}>
                        <div className="button" style={{width: '180px', backgroundColor: '#aaa'}}>Resend OTP</div>
                        <div className="button" onClick={() => confirm()}>Verify</div>
                    </div>
                    <input type="text" onChange={(e) => setOtp(e.target.value)} placeholder="input your OTP number here" required/>
                    <div>
                        <div className="title">OTP <span>Verification</span></div>
                        <div className="desc" style={{ fontFamily: 'var(--quicksand)', fontSize: '0.9rem', marginTop: '7px', letterSpacing: '1px' }}>Hi <span>{register_mode_user ? register_mode_user.username : 'dimas'}!</span>, your OTP number was successfully <br/> sent to <span>{register_mode_user? register_mode_user.email : 'd@gmail.com'}</span>. Let's check your email.</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Confirm;

// export const AuthRegisterCont = () => {
//     const { token } = useParams()
//     const navigate = useNavigate()
//     const [loading, setLoading] = useState(false)
    
//     const confirm = async () => {
//         try {
//             setLoading(true)
//             const response = await axios.get(`${import.meta.env.VITE_API}/confirm/user/${token}`)
//             swalert("verification success, let's start collab with us.", "success", 1500)
//             .then((res) => res.dismiss && navigate('/login'))
//         } catch (error) {
//             if (error || error.response) {
//                 swalert(error.response.data || "internal server error", "error", 1500)
//                 .then((res) => res.dismiss && navigate('/'))
//             }
//         } finally {
//             setLoading(false)
//         }
//     }
//     if (loading) return <Loading/>
//     useEffect(() => { confirm() }, [])
//     return(
//         <div className="page">
//             <div className="back" onClick={() => navigate('/')}>
//                 <div className="fa-solid fa-arrow-left fa-xl active"></div>
//                 <div className="nav-logo" style={{fontFamily: 'var(--caveat)'}}>Vixcera</div>
//             </div>
//         </div>
//     )
// }