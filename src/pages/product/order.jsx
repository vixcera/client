import React from 'react'
import axios from 'axios'
import snap from "../../../utils/snap"
import swalert from '../../../utils/swalert'
import Loading from "../../../utils/loading"
import convertPrice from '../../../utils/price'
import getvxsrf from '../../../service/getvxsrf'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useEffect } from 'react'
import { useState } from 'react'
import "../../style/create.css"
import Swal from 'sweetalert2'

const Order = () => {

    const location = useLocation()
    const history = JSON.parse(localStorage.getItem("inputOrder"))
    const navigate = useNavigate()
    const {vid} = useParams()
    const i = location.state
    
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
            if (error || error.response) {
              swalert(error.response.data, "error", 1500)
              .then((res) => res.dismiss && navigate('/'))
            }
        } finally {
          setLoading(false)
        }
    }

    const showPlaceOrder = async () => {
      return Swal.fire({
        html: `
        <div style="width: 100%; display: flex; flex-direction: column; gap: 5px;">
          <h2 style="text-align: center;">Shipping Details</h2>
          <div style="width: 100%; height: 1px; background-color: var(--blue);"></div>
          <h4 style="margin-top: 5px;">Customer : ${name}</h4>
          <h4>Phone Number : ${phone}</h4>
          <h4>Email Address : ${email}</h4>
          <h4>Product ID : ${vid}</h4>
          <h4>Product Price : ${convertPrice(i.price)}</h4>
          <h4>Product Quantity : 1</h4>
          <h4>PPN : 11%</h4>
          <div style="width: 100%; height: 1px; background-color: var(--blue)"></div>
          <h4>Total Amount: ${convertPrice(i.price * 0.11 + i.price)}</h4>
        </div>  
        `,
        confirmButtonText: 'Confirm & Pay',
        cancelButtonText: "Cancel",
        allowOutsideClick: false,
        showCancelButton: true,
        focusConfirm: false,
        color: 'var(--blue)',
        background: 'var(--primary)',
        customClass: {container: 'alertext'},
      })
      .then((res) => {
        if (res.isConfirmed) {
          checkout()
        }
      })
    }
    
    const checkout = async () => {
      try {
        setLoading(true)
        const response = await axios.post(`${import.meta.env.VITE_API}/transaction/create`,{
          vid     : vid,
          name    : name,
          email   : email,
          phone   : phone,
        }, 
        { headers : { "xsrf-token" : vxsrf } })
        localStorage.setItem('transaction_mode', "true")
        window.snap.pay(response.data, {
          onSuccess: (result) => { window.location.href = `/transaction/success/${result.order_id}`},
          onPending : () => {window.location.href = '/'}
      })
      } 
      catch (error) {
        if (error || error.response) {
          swalert(error.response.data, "error")
        }
      }
      finally { setLoading(false) }
    }

    useEffect(() => {
      if (sessionStorage.getItem('prevent')) {
        swalert("cookie is required, please follow the intruction before start purchasing any product", 'info', 5000)
        .then((res) => navigate('/product'))
      }
      snap()
      getProducts()
      getvxsrf().then((result) => setVxsrf(result))
    }, [])

    if (loading) return <Loading/>

    return (
        <div className='page-max' style={{gap:'30px'}}>
          <div className="back" onClick={() => navigate(`/product/details/${vid}`, { state: i })}>
            <div className="fa-solid fa-arrow-left fa-xl active"></div>
            <div className="nav-logo" style={{fontFamily: 'var(--caveat)'}}>Vixcera</div>
            <div className='snap-container'></div>
          </div>
          <div className='form'>
            <div className='input-form' >
              <div>
                <div>Name :</div>
                <input className='productinput' value={name} type="text" placeholder='input your name' onChange={(e) => setName(e.target.value)} required/>
              </div>
              <div>
                <div>Phone Number :</div>
                <input className='productinput' value={phone} type="text" placeholder='input your phone number' onChange={(e) => setPhone(e.target.value)} required/>
              </div>
              <div>
                <div>Email :</div>
                <input className='productinput' value={email} type="email" placeholder='input your email' onChange={(e) => setEmail(e.target.value)} required/>
              </div>
              <div className='button-max' onClick={() => showPlaceOrder()} style={(name && phone && email) ? { backgroundColor: 'var(--yellow)' } : { backgroundColor: "#aaa" }}>Checkout</div>
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