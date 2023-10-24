import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import convertPrice from "../../utils/price"
import axios from "axios"
import Swal from 'sweetalert2'
import "../style/product.css"

const Product = () => {
    const { ctg } = useParams()
    const [data, setData] = useState([])
    const navigate = useNavigate()

    const downloadFile = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}/download/${data.map((i) => {return i.id})}`)
            Swal.fire({icon:'question', text:'apakah kamu ingin mendownload file ini?',background:'var(--primary)',color:'var(--text)', confirmButtonColor:'var(--primary)'})
            .then((res) => res.isConfirmed ? location.href = response.data : '')
        }   catch (error) {
            if (error) Swal.fire({icon:'error',showConfirmButton:false,text:error.response.data,background:'var(--primary)', color:'var(--text)',timer:1500})
        }
    }

    const getProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}/products/${ctg}` || `http://localhost:1010/products/${ctg}`)
            if (!response.data.length) return Swal.fire({icon: 'info', showConfirmButton: false, text:'belum ada data product',timer:1500,background: 'var(--primary)',color:'var(--text)'})
            setData(response.data)
        }   catch (error) {
            if (error || error.response) Swal.fire({icon: 'info', showConfirmButton: false, text:'belum ada data product',timer:1500,background: 'var(--primary)',color:'var(--text)'})
            .then((res) => res.isDismissed && navigate('/'))
        }
    }

    useEffect(() => {
        Swal.fire({icon: 'info', showConfirmButton: false, text:'belum ada data product',timer:1500,background: 'var(--primary)',color:'var(--text)'})
        .then((res) => res.isDismissed && navigate('/'))
    }, [])

    return (
        <div className='page'>
            <div className="back" onClick={() => navigate('/')}>
                <div className="fa-solid fa-arrow-left fa-xl active"></div>
                <div className="nav-logo" style={{fontFamily: 'var(--caveat)'}}>Vixcera</div>
            </div>
            <div className='product-page'>
                <div className='product-container' style={(data.length < 4) && {justifyContent: 'center'}}>
                    {(data.length) &&
                        data.map((i, k) => {
                            return(
                            <div className='product-card' key={k}>
                                <LazyLoadImage className='product-img' src={i.img} loading='lazy' effect='blur'/>
                                <div className='product-title'>{i.title}</div>
                                <div className='product-desc'>{i.desc}</div>
                                <div className='button' style={{width : '140px', position:'absolute', bottom:'15px', left:'15px'}}>{convertPrice(i.price)}</div>
                                <div style={{ position:'absolute', bottom:'30px', right:'20px', color : 'var(--text)', cursor: 'pointer'}} onClick={() => downloadFile()} className='fa-solid fa-download fa-xl' />
                            </div>
                            ) 
                        })
                    }
                    <div onClick={() => navigate('/create')} className='product-card' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', flexDirection: 'column'}}>
                        <i className='fa-solid fa-plus fa-2xl' style={{fontSize: '80px', color: 'var(--yellow)'}}/>
                        <div style={{color: 'var(--yellow)', fontFamily: 'var(--poppins)', fontSize: '1rem', translate: '0 50px'}}>add new product</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product