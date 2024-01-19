import axios from "axios"
import swal from "sweetalert2"
import convertPrice from "../../../utils/price"

import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"

import "../../style/create.css"

const Wetails = () => {

    const { vid } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const img = data.map((i) => { return i.img })
    const width = window.innerWidth;

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API}/waiting/vid/${vid}`)
        .then((response) => setData(response.data))
        .catch((error) => console.log(error))
    }, [])

    return (
        <div className='page-max'>
            <div className="back" onClick={() => navigate(-1)}>
                <div className="fa-solid fa-arrow-left fa-xl active"></div>
                <div className="nav-logo" style={{fontFamily: 'var(--caveat)'}}>Vixcera</div>
            </div>
            <div className="form">
                <div className='prev-form' style={{ marginTop: '10px', paddingBottom: '0', gap: '20px' }}>
                    <div className='itext'>Product Details</div>
                    <div className="product-card" style={{ height: 'max-content', width: '100%', marginTop: '0px', justifyContent: 'center' }}>
                        <LazyLoadImage style={{ width: '100%' }} onClick={() => (width) <= 530 && swal.fire({ imageUrl: img, showConfirmButton: false })} className='product-img' src={img} loading='lazy' effect='blur'/>
                    </div>
                {data.map((i,k) => {
                    return(
                        <>
                        <div className='product-card' style={{ height: 'max-content', width: '100%' }} key={k}>
                            <div className='wrapped-text'>
                                <div className='product-title'>{i.title}</div>
                                <div className='product-desc' style={{ display: "block" }}>{i.desc}</div>
                            </div>
                        </div>
                        <div className='product-card' style={{ height: 'max-content', width: '100%', marginTop: '20px' }}>
                            <div className='wrapped-text'>
                                <div className='wrapped-details' style={{margin: 0, paddingTop: '0', display: 'flex',alignItems: 'unset', flexDirection: "column", gap: '10px'}}>
                                    <div className="product-desc-product">VID         : <span>{i.vid}</span></div>
                                    <div className="product-desc-product">Price       : <span>{convertPrice(i.price)}</span></div>
                                </div>
                            </div>
                        </div>
                        <div className='product-card' style={{ height: 'max-content', width: '100%' }}>
                            <div className='wrapped-text'>
                                <div className='wrapped-details' style={{margin: 0, paddingTop: '0', display: 'flex',alignItems: 'unset', flexDirection: "column", gap: '10px'}}>
                                    <div className="product-desc-product">Category    : <span>{i.ctg}</span></div>
                                    {i.ctg == 'web' && <div className="product-desc-product">Framework  : <span>{i.tech} {i.tech.toLowerCase().includes('html') ? "" : 'JS'}</span></div>}
                                </div>
                            </div>
                        </div>
                        <div className='product-card' style={{ height: 'max-content', width: '100%' }}>
                            <div className='wrapped-text'>
                                <div className='wrapped-details' style={{margin: 0, paddingTop: '0', display: 'flex',alignItems: 'unset', flexDirection: "column", gap: '10px'}}>
                                    <div className="product-desc-product">Created by  : <span>{i.by}</span></div>
                                    <div className="product-desc-product">Created at  : <span>{i.createdAt.slice(0, 10)}</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="button-max" style={{ marginTop: '30px', fontWeight: 'bold', backgroundColor: 'var(--yellow)' }}>Approve</div>
                        <div className="button-max" style={{ marginTop: '5px', fontWeight: 'bold', backgroundColor: '#aaa' }}>Reject</div>
                        </>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Wetails