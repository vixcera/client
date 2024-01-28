import { useEffect, useState } from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useNavigate, useParams } from "react-router-dom"
import getvxsrf from '../service/getvxsrf'
import Loading from '../utils/loading'
import alert from '../utils/alert'
import swal from "sweetalert2"
import axios from 'axios'

const AuthTransaction = () => {

    const navigate = useNavigate()
    const [ loading, setLoading ] = useState(false)
    const [ vxsrf, setVxsrf] = useState('')
    const { order_id } = useParams()
    
    const donwloadProduct = async () => {
        if (!order_id) return (await alert("transaction not found")).dismiss && navigate('/')
        try {
            setLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_API}/transaction/success`,{
                order_id : order_id
            }, { headers: { 'xsrf-token' : vxsrf }})
            const url = response.data.file;
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${response.data.name}`);
            document.body.appendChild(link);
            link.onclick = () => { document.body.removeChild(link) }
            swal.fire({
                icon: 'success',
                background: 'var(--primary)',
                color: 'var(--blue)',
                confirmButtonColor: "none",
                text: 'Transaction complete!, thanks for your order on vixcera.',
                customClass: { container: "alertext" },
                confirmButtonText: 'download product',
            })
            .then((res) => {
                res.isConfirmed && link.click()
            })

        } catch (error) {
            alert("server maintenance!")
            if(error.response) alert(error.response.data)
            .then((res) => { if(res.dismiss) { location.href = '/' } })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {getvxsrf().then((result) => setVxsrf(result))} , [])

    if (loading) return <Loading/>

    return(
        <div className='page'>
            <div className="back" onClick={() => navigate('/products')}>
                <div className="fa-solid fa-arrow-left fa-xl active"></div>
                <div className="nav-logo" style={{fontFamily: 'var(--caveat)'}}>Vixcera</div>
          </div>
          <div className='form' style={{justifyContent: 'center', alignItems: 'center', gap: '50px'}}>
            <div className='button-max' onClick={() => { donwloadProduct() }} style={order_id? { backgroundColor: 'var(--yellow)' } : {backgroundColor: '#aaa'}}>Check transaction</div>
            <LazyLoadImage src="/img/200page.png" effect="blur" loading="lazy" style={{ width: '250px' }}/>
          </div>
        </div>
    )
}

export default AuthTransaction;