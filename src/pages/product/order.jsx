import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import snap from "../../../utils/snap"
import Context from '../../../utils/context'
import convertPrice from '../../../utils/price'
import { useNavigate, useParams } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import "../../style/create.css"

const Order = () => {

    const {vid} = useParams()
    const navigate = useNavigate()
    const context = useContext(Context)

    const [data, setData] = useState([])
    const [name, setName] = useState(context.username ? context.username : '')
    const [email, setEmail] = useState(context.email ? context.email : '')
    const [phone, setPhone] = useState('')
    
    const getProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}/products/vid/${vid}`)
            setData(response.data)
        }   catch (error) {
            if (error || error.response) Swal.fire({icon: 'info', showConfirmButton: false, text:'belum ada data product',timer:1500,background: 'var(--primary)',color:'var(--text)'})
            .then((res) => res.isDismissed && navigate('/'))
        }
    }
    
    const checkout = async () => {
      try {
        context.setLoading(true)
        const response = await axios.post(`${import.meta.env.VITE_API}/payments`,{
          vid     : vid,
          name    : name,
          email   : email,
          phone   : phone,
        })
        context.setLoading(false)
        window.snap.pay(response.data, {
          onSuccess: (result) => {
            localStorage.setItem('result', result)
            console.log(localStorage.getItem('result'))
          }
        })
      } 
      catch (error) {
        if (error || error.response) {
          Swal.fire({
            icon: 'warning',
            color : 'var(--text)',
            background: 'var(--primary)',
            showConfirmButton: false,
            text: `${error.response.data}`,
          })
        }
      }
    }

    useEffect(() => {
        getProducts()
        snap()
    }, [])

    return (
        <div className='page' style={{gap:'30px'}}>
          <div className="back" onClick={() => navigate(-1)}>
            <div className="fa-solid fa-arrow-left fa-xl active"></div>
            <div className="nav-logo" style={{fontFamily: 'var(--caveat)'}}>Vixcera</div>
          </div>
          <div className='form'>
            <div className='input-form' style={{padding: '30px 0'}}>
              <div>
                <div>Name :</div>
                <input className='productinput' value={name} type="text" placeholder='input your name' onChange={(e) => setName(e.target.value)} required/>
              </div>
              <div>
                <div>Phone Number :</div>
                <input className='productinput' type="text" placeholder='input your phone number' onChange={(e) => setPhone(e.target.value)} required/>
              </div>
              <div>
                <div>Email :</div>
                <input className='productinput' value={email} type="email" placeholder='input your email' onChange={(e) => setEmail(e.target.value)} required/>
              </div>
              <div className='button order' onClick={() => checkout()} style={(name && phone && email) ? {fontSize:'14px', fontWeight: '550'} : {fontSize:'14px', backgroundColor: '#aaa', fontWeight: '550'}}>Checkout</div>
            </div>
            <div className='prev-form'>
              <div className='itext'>Product</div>
              {data.map((i,k) => {
                    return(
                      <div className='product-card' key={k}>
                          <div id='see' className='i fa-solid fa-eye fa-xl'/>
                          <LazyLoadImage className='product-img' src={i.img} loading='lazy' effect='blur'/>
                          <div className='wrapped-text'>
                              <div className='product-title'>{i.title}</div>
                              <div className='product-desc'>{i.desc}</div>
                              <div className='wrapped-details'>
                                  <div className='button price'>{convertPrice(i.price)}</div>
                                  {/* <div style={{ color : 'var(--text)', cursor: 'pointer'}} onClick={() => navigate(`/order/${i.vid}`)} className='fa-solid fa-cart-plus fa-xl' /> */}
                              </div>
                          </div>
                          <div className='by'>by: {i.by}</div>
                      </div>
                    )
                })}
            </div>
          </div>
        </div>
      )
}

export default Order