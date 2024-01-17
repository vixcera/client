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
    const [data, setData] = useState([])
    
    const context = useContext(Context)
    const total = data.map((result) => {return result})
    
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
                alert("server maintenance, please comeback later!")
                .then((res) => res.isDismissed && navigate('/'))
            }
        }
    }

    useEffect(() => { getProducts() }, [])

    return (
        <div className='page-max'>
            <div id='snap-container'></div>
                <div className="back" onClick={() => navigate(-1)}>
                    <div className="fa-solid fa-arrow-left fa-xl active"></div>
                    <div className="nav-logo" style={{fontFamily: 'var(--caveat)'}}>Vixcera</div>
            </div>
            <div className='product-page'>
                <div className='product-container'>
                <input type="text" className='search'/>
                    {data.map((i, k) => {
                            return(
                            <div className='product-card' key={k}>
                                <LazyLoadImage className='product-img' src={(i.img) || ('img/img404.jpg')} loading='lazy' effect='blur'/>
                                <div className='wrapped-text'>
                                    <div className='product-title'>{i.title}</div>
                                    <div style={{ display: 'flex', flexWrap : 'wrap', flexDirection : 'column'}}>
                                        <div className='product-desc'>{i.desc.length >= 30 ? i.desc.substring(0,30) + '...' : i.desc}</div>
                                        <div className='wrapdet' style={{ position: 'unset', marginTop: '10px', marginLeft: '5px', gap: '5px' }}>
                                            <div style={{ backgroundColor: 'var(--background)', width: '90px', height: '30px' }}>Tech :</div>
                                            <div style={{ backgroundColor: 'var(--background)', width: '90px', height: '30px' }}>React</div>
                                         </div>
                                    </div>
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