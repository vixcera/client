import { LazyLoadImage } from 'react-lazy-load-image-component'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import convertPrice from "../../../utils/price"
import Context from '../../../utils/context'
import alert from "../../../utils/alert"
import axios from "axios"
import "../../style/product.css"

const Product = () => {
    const { ctg } = useParams()
    const navigate = useNavigate()
    const context = useContext(Context)

    const [data, setData] = useState([])
    
    const getProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}/products/${ctg}`)
            if (!response.data.length) {
                alert("product data is empty")
                .then((res) => res.isDismissed && navigate('/products'))
            }
            setData(response.data)
        }   catch (error) {
            if (error || error.response) {
                alert("server maintenance!")
                .then((res) => res.isDismissed && navigate('/'))
            }
        }
    }

    const showPreview = (src, card) => {
        let kartu = document.getElementById(`card${card}`)
        let img = document.querySelector('.product-img')
        kartu.appendChild(img)
        img.setAttribute('src', src)
        img.classList.toggle('show')
    }

    const requestCreate = async () => {
        context.setLoading(true)
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}/administrator`)
            navigate('/create')
        }   catch (error) {
            if (error || error.response) {navigate('/register')}
        }
        finally{context.setLoading(false)}
    }

    useEffect(() => { getProducts() }, [])

    return (
        <div className='page'>
            <div id='snap-container'></div>
            <div className="back" onClick={() => navigate('/')}>
                <div className="fa-solid fa-arrow-left fa-xl active"></div>
                <div className="nav-logo" style={{fontFamily: 'var(--caveat)'}}>Vixcera</div>
            </div>
            <div className='product-page'>
                <div className='product-container'>
                    {/* <div onClick={() => requestCreate()} className='product-card' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', flexDirection: 'column'}}>
                        <i className='fa-solid fa-plus fa-2xl' style={{fontSize: '80px', color: 'var(--yellow)'}}/>
                        <div style={{color: 'var(--yellow)', fontFamily: 'var(--poppins)', fontSize: '1rem', translate: '0 50px'}}>add new product</div>
                    </div> */}
                    {data.map((i, k) => {
                            return(
                            <div className='product-card' key={k}>
                                <div id='see' className='i fa-solid fa-eye fa-xl'/>
                                <LazyLoadImage className='product-img' src={i.img} loading='lazy' effect='blur'/>
                                <div className='wrapped-text'>
                                    <div className='product-title'>{i.title}</div>
                                    <div className='product-desc'>{i.desc}</div>
                                    <div className='wrapped-details'>
                                        <div className='button price'>{convertPrice(i.price)}</div>
                                        <div style={{ color : 'var(--text)', cursor: 'pointer'}} onClick={() => navigate(`/order/${i.vid}`)} className='fa-solid fa-cart-plus fa-xl' />
                                    </div>
                                </div>
                                <div className='by'>by: {i.by}</div>
                            </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Product