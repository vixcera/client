import axios from 'axios'
import swal from "sweetalert2"
import convertPrice from "../../../utils/price"
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {LazyLoadImage} from "react-lazy-load-image-component"

const Dashboard = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [password, setPassword] = useState('')
    
    const checkAdmin = async () => {
        const input = await swal.fire({input: 'password'})
        if (!input.value) return navigate('/')
        try {
            const response = await axios.post(`${import.meta.env.VITE_API}/products/waitinglist`,{password : input.value})
            setPassword(input.value)
            setData(response.data)
        } 
            catch (error) {
            if (error) return navigate('/') 
        }
    }
    
    const confirm = async () => {
        const response = await axios.post(`${import.meta.env.VITE_API}/product/confirm`,{
            password: password,
            vid: data.map((i) => {return i.vid})
        })
        swal.fire({icon:'success', showConfirmButton:false,timer:1500,text:response.data})
    }

    const reject = async () => {
        const response = await axios.post(`${import.meta.env.VITE_API}/product/reject`,{
            password: password,
            vid: data.map((i) => {return i.vid})
        })
        swal.fire({icon:'success', showConfirmButton:false,timer:1500,text:response.data})
    }

    useEffect(() => {checkAdmin()}, [])
    
    return (
        <div className='page'>
            <div className="back" onClick={() => navigate('/')}>
                <div className="fa-solid fa-arrow-left fa-xl active"></div>
                <div className="nav-logo" style={{fontFamily: 'var(--caveat)'}}>Vixcera</div>
            </div>
            <div className='product-page'>
                <div className='product-container'>
                <input type="text" className='search'/>
                    {data.map((i, k) => {
                            return(
                            <div className='product-card' key={k}>
                                <LazyLoadImage className='product-img' onClick={() => navigate(`/product/details/${i.vid}`)} src={(i.img) || ('img/img404.jpg')} loading='lazy' effect='blur'/>
                                <div className='wrapped-text'>
                                    <div className='product-title'>{i.title}</div>
                                    <div style={{ display: 'flex', flexWrap : 'wrap', flexDirection : 'column'}}>
                                        <div className='product-desc'>{i.desc.length >= 40 ? i.desc.substring(0,40) + '...' : i.desc}</div>
                                        <div className='wrapdet' style={{ position: 'unset', marginTop: '15px', marginLeft: '5px', gap: '5px' }}>
                                            <div style={{ backgroundColor: 'var(--background)', width: '95px', height: '30px' }}>{i.tech}</div>
                                            <div style={{ backgroundColor: 'var(--background)', width: '95px', height: '30px' }}>{i.tech.toLowerCase().includes('html') ? "only" : 'JS'}</div>
                                         </div>
                                    </div>
                                    <div className='wrapped-details'>
                                        <div className='button price'>{convertPrice(i.price)}</div>
                                        <div style={{ color : 'var(--text)', cursor: 'pointer'}} onClick={() => navigate(`/order/${i.vid}`)} className='fa-solid fa-cart-plus fa-xl' />
                                    </div>
                                </div>
                            </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard