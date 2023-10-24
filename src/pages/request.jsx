import axios from 'axios'
import swal from "sweetalert2"
import convertPrice from "../../utils/price"
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {LazyLoadImage} from "react-lazy-load-image-component"

const Request = () => {
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
            id: data.map((i) => {return i.id})
        })
        swal.fire({icon:'success', showConfirmButton:false,timer:1500,text:response.data})
    }

    const reject = async () => {
        const response = await axios.post(`${import.meta.env.VITE_API}/product/reject`,{
            password: password,
            id: data.map((i) => {return i.id})
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
                <div className='product-container' style={(data.length < 4) && {justifyContent: 'center'}}>
                    {(data.length) &&
                        data.map((i, k) => {
                            return(
                            <div className='product-card' key={k}>
                                <LazyLoadImage className='product-img' src={i.img} loading='lazy' effect='blur'/>
                                <div className='product-title'>{i.title}</div>
                                <div className='product-desc'>{i.desc}</div>
                                <div className='button' style={{width : '140px', position:'absolute', bottom:'15px', left:'15px'}}>{convertPrice(i.price)}</div>
                                <div style={{position: 'absolute', bottom: '35px', right: '20px', display: 'flex',gap:'15px'}}>
                                    <div className='fa-solid fa-x fa-lg' onClick={() => reject()} style={{color: 'var(--text )', cursor: 'pointer'}}/>
                                    <div className='fa-solid fa-check fa-xl' onClick={() => confirm()} style={{color: 'var(--yellow)', cursor: 'pointer'}}/>
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

export default Request