import { useEffect, useState } from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useNavigate } from "react-router-dom"
import getvxsrf from "../../../service/getvxsrf"
import Loading from '../../../utils/loading'
import alert from '../../../utils/alert'
import swal from "sweetalert2"
import axios from 'axios'

const SuccessOrder = () => {

    const navigate = useNavigate()
    const [ loading, setLoading ] = useState(false)
    const [ vxsrf, setVxsrf] = useState('')
    const orderID = new URLSearchParams(location.search).get('order_id')
    
    const donwloadProduct = async () => {
        if (!orderID) return alert("transaction not found")
        try {
            setLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_API}/transaction/success`,{
                order_id : orderID
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
                text: 'Thanks for your order on vixcera, have a nice day.',
                confirmButtonText: 'Download product'
            })
            .then((res) => {
                res.isConfirmed ? link.click() : link.click()
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
            <div className='button-max' onClick={() => { donwloadProduct() }} style={orderID? { backgroundColor: 'var(--yellow)' } : {backgroundColor: '#aaa'}}>Result</div>
            <LazyLoadImage src="/img/200page.png" effect="blur" loading="lazy" style={{ width: '300px' }}/>
          </div>
        </div>
    )
}

export default SuccessOrder