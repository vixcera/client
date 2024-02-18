import { useEffect, useState } from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useNavigate, useParams } from "react-router-dom"
import getvxsrf from '../service/getvxsrf'
import Loading from '../utils/loading'
import swalert from "../utils/swalert"
import swal from "sweetalert2"
import axios from 'axios'

const AuthTransaction = () => {

    const navigate = useNavigate()
    const [ loading, setLoading ] = useState(false)
    const [ vxsrf, setVxsrf] = useState('')
    const [ data, setData ] = useState('')
    const { order_id } = useParams()

    const getData = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_API}/transaction/result/${order_id}`)
            return response;
        } catch (error) {
            if (error.response || error) {
                swalert(error.response.data || "internal server error", 'error', 2000)
            }
        } finally {setLoading(false)}
    }
    
    const donwloadProduct = async () => {
        if (!order_id) return (await swalert("transaction not found", "error")).dismiss && navigate('/')
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
            swalert("server maintenance!")
            if(error.response) swalert(error.response.data)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData().then((res) => setData(res.data))
        getvxsrf().then((result) => setVxsrf(result))
    } , [])

    if (loading) return <Loading/>

    return(
        <div className='page'>
            <div className="back" onClick={() => navigate('/products')}>
                <div className="fa-solid fa-arrow-left fa-xl active"></div>
                <div className="nav-logo" style={{fontFamily: 'var(--caveat)'}}>Vixcera</div>
          </div>
          <div className='form' style={{justifyContent: 'center',  gap: '50px', textAlign: 'left'}}>
            <div className='button-max' onClick={() => { data.transaction_status == 'settlement' && donwloadProduct() }} style={data.transaction_status == 'settlement'? { backgroundColor: 'var(--yellow)' } : {backgroundColor: '#aaa'}}>Download File</div>
            <div style={{width: '100%', display: 'flex', gap: '3px', fontFamily: 'var(--quicksand)', color: 'var(--blue)'}}>
                <div style={{width: '50%', display: 'flex', flexDirection: 'column', gap: '5px'}}>
                    <h3 style={{border: '1px solid var(--blue)', padding: '5px'}}>Status :</h3>
                    <h3 style={{border: '1px solid var(--blue)', padding: '5px'}}>Customer :</h3>
                </div>
                <div style={{width: '50%', display: 'flex', flexDirection: 'column', gap: '5px'}}>
                    <h3 style={{border: '1px solid var(--blue)', padding: '5px'}}>{data.transaction_status}</h3>
                    <h3 style={{border: '1px solid var(--blue)', padding: '5px'}}>{data.name}</h3>
                </div>
            </div>
            <div className='title' style={{textAlign: 'center'}}>Invoice Status</div>
          </div>
        </div>
    )
}

export default AuthTransaction;