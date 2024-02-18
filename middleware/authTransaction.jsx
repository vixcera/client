import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import convertPrice from '../utils/price'
import html2pdf from "html2pdf"
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

    const downloadInvoice = () => {
        const content = document.querySelector('.form.invoice').innerHTML;
        const filename = `invoice-${data.name}.pdf`
        const blob = new Blob([content], {type: 'application/pdf'})
        const url = URL.createObjectURL(blob)

        let a = document.createElement('a')
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
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
          <div className='form invoice' style={{justifyContent: 'center',  gap: '30px', textAlign: 'left'}}>
            <div className='button-max' onClick={() => { data.transaction_status == 'settlement' && donwloadProduct() }} style={data.transaction_status == 'settlement'? { backgroundColor: 'var(--yellow)' } : {backgroundColor: '#aaa'}}>Get product file</div>
            <p style={{color: 'var(--blue)', textAlign: 'center', cursor: 'pointer'}} onClick={() => downloadInvoice()}>Donwload Invoice</p>
            <div style={{width: '100%', display: 'flex', gap: '5px', fontFamily: 'var(--quicksand)'}}>
                <div style={{width: '50%', display: 'flex', flexDirection: 'column', gap: '5px', color: 'var(--yellow)'}}>
                    <h4 style={{border: '1px solid var(--blue)', padding: '10px', borderRadius: '5px'}}>Customer :</h4>
                    <h4 style={{border: '1px solid var(--blue)', padding: '10px', borderRadius: '5px'}}>Status :</h4>
                    <h4 style={{border: '1px solid var(--blue)', padding: '10px', borderRadius: '5px'}}>Order ID :</h4>
                    <h4 style={{border: '1px solid var(--blue)', padding: '10px', borderRadius: '5px'}}>Product ID :</h4>
                    <h4 style={{border: '1px solid var(--blue)', padding: '10px', borderRadius: '5px'}}>Amount :</h4>
                    <h4 style={{border: '1px solid var(--blue)', padding: '10px', borderRadius: '5px'}}>Token :</h4>
                </div>
                <div style={{width: '50%', display: 'flex', flexDirection: 'column', gap: '5px', color: 'var(--blue)'}}>
                    <h4 style={{border: '1px solid var(--blue)', padding: '10px', borderRadius: '5px'}}>{data.name}</h4>
                    <h4 style={{border: '1px solid var(--blue)', padding: '10px', borderRadius: '5px'}}>{data.transaction_status}</h4>
                    <h4 style={{border: '1px solid var(--blue)', padding: '10px', borderRadius: '5px'}}>{data.order_id}</h4>
                    <h4 style={{border: '1px solid var(--blue)', padding: '10px', borderRadius: '5px'}}>{data.product_id}</h4>
                    <h4 style={{border: '1px solid var(--blue)', padding: '10px', borderRadius: '5px'}}>{data.product_amount ? convertPrice(data.product_amount) : '***'}</h4>
                    <h4 style={{border: '1px solid var(--blue)', padding: '10px', borderRadius: '5px'}}>{data.transaction_token? data.transaction_token.substring(0,10) + "***" : '***'}</h4>
                </div>
            </div>
            {data.transaction_status == 'settlement' && 
                <div style={{textAlign: 'center', lineHeight: '30px'}}>
                    <div className='fa-solid fa-circle-check fa-2xl' style={{fontSize: '2.5rem', color: 'var(--blue)'}}></div>
                    <div className='desc' style={{color: 'var(--yellow)'}}>Transaction Success</div>
                </div>
            }
            
            <div className='title' style={{textAlign: 'center'}}> <span>Vixcera</span> Invoice </div>
          </div>
        </div>
    )
}

export default AuthTransaction;