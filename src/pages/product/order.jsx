import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import snap from "../../../utils/snap"
import Context from '../../../utils/context'
import getvxsrf from '../../../secure/getvxsrf'
import Loading from "../../../utils/loading"
import convertPrice from '../../../utils/price'
import { useNavigate, useParams } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import "../../style/create.css"

const Order = () => {

    const history = JSON.parse(localStorage.getItem("inputOrder"))
    const navigate = useNavigate()
    const {vid} = useParams()
    const context = useContext(Context)
    
    const [loading, setLoading] = useState('')
    const [vxsrf, setVxsrf] = useState('')
    const [data, setData] = useState([])
    const [name, setName] = useState(history ? history.name : '')
    const [email, setEmail] = useState(history ? history.email : '')
    const [phone, setPhone] = useState(history ? history.phone : '')
    
    if (name || email || phone) {
      localStorage.setItem('inputOrder', JSON.stringify({ name, email, phone }))
    }
    
    const getProducts = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_API}/products/vid/${vid}`)
            setData(response.data)
        }   catch (error) {
            if (error || error.response) Swal.fire({icon: 'info', showConfirmButton: false, text:'belum ada data product',timer:1500,background: 'var(--primary)',color:'var(--text)'})
            .then((res) => res.isDismissed && navigate('/'))
        } finally {
          setLoading(false)
        }
    }
    
    const checkout = async () => {
      try {
        setLoading(true)
        const response = await axios.post(`${import.meta.env.VITE_API}/payments`,{
          vid     : vid,
          name    : name,
          email   : email,
          phone   : phone,
        }, 
        { headers : { "xsrf-token" : vxsrf } })
        window.snap.pay(response.data, {
          onSuccess: (result) => {
            localStorage.setItem('result', result)
            console.log(localStorage.getItem('result'))
          },
          onPending: (result) => {
            sessionStorage.setItem('transaction', JSON.parse(result))
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
      finally { setLoading(false) }
    }

    useEffect(() => {
      getvxsrf().then((result) => setVxsrf(result))
      getProducts()
      snap()
    }, [])

    if (loading) return <Loading/>

    return (
        <div className='page-max' style={{gap:'30px'}}>
          <div className="back" onClick={() => navigate('/products')}>
            <div className="fa-solid fa-arrow-left fa-xl active"></div>
            <div className="nav-logo" style={{fontFamily: 'var(--caveat)'}}>Vixcera</div>
          </div>
          <div className='form'>
            <div className='input-form' >
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
              <div className='button-max' onClick={() => checkout()} style={(name && phone && email) ? { backgroundColor: 'var(--yellow)' } : { backgroundColor: "#aaa" }}>Checkout</div>
            </div>
            <div className='prev-form'>
              <div className='itext'>Product</div>
              {data.map((i,k) => {
                    return(
                      <div className='product-card' key={k}>
                          <LazyLoadImage className='product-img' src={i.img} loading='lazy' effect='blur'/>
                          <div className='wrapped-text'>
                              <div className='product-title'>{i.title}</div>
                              <div className='product-desc'>{i.desc}</div>
                              <div className='wrapped-details'>
                                  <div className='button price'>{convertPrice(i.price)}</div>
                              </div>
                          </div>
                      </div>
                    )
                })}
            </div>
          </div>
        </div>
      )
}

export default Order