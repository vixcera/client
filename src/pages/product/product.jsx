import { LazyLoadImage } from 'react-lazy-load-image-component'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import convertPrice from "../../../utils/price"
import Context from '../../../utils/context'
import axios from "axios"
import Swal from 'sweetalert2'
import "../../style/product.css"

const Product = () => {
    const { ctg } = useParams()
    const navigate = useNavigate()
    const context = useContext(Context)

    const [data, setData] = useState([])
    const [admin, setAdmin] = useState('')
    
    const getProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}/products/${ctg}`)
            if (!response.data.length) return Swal.fire({icon: 'info', showConfirmButton: false, text:'belum ada data product',timer:1500,background: 'var(--primary)',color:'var(--text)'})
            setData(response.data)
        }   catch (error) {
            if (error || error.response) Swal.fire({icon: 'info', showConfirmButton: false, text:'belum ada data product',timer:1500,background: 'var(--primary)',color:'var(--text)'})
            .then((res) => res.isDismissed && navigate('/'))
        }
    }    

    useEffect(() => {
        context.setLoading(true)
        getProducts()
        axios.get(`${import.meta.env.VITE_API}/administrator`)
        .then((response) => {
            setAdmin(response.data)
        })
        .catch((error) => {
            if (error.response) return setAdmin(false)
        })
        context.setLoading(false)
    }, [])

    return (
        <div className='page'>
            <div id='snap-container'></div>
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
                                <div style={{ position:'absolute', bottom:'30px', right:'20px', color : 'var(--text)', cursor: 'pointer'}} onClick={() => navigate(`/order/${i.id}`)} className='fa-solid fa-cart-plus fa-xl' />
                            </div>
                            )
                        })
                    }
                    <div onClick={() => navigate('/create')} className='product-card' style={admin ? {display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', flexDirection: 'column'} : {display: 'none'}}>
                        <i className='fa-solid fa-plus fa-2xl' style={{fontSize: '80px', color: 'var(--yellow)'}}/>
                        <div style={{color: 'var(--yellow)', fontFamily: 'var(--poppins)', fontSize: '1rem', translate: '0 50px'}}>add new product</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product