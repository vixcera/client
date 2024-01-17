import axios from "axios"
import swal from "sweetalert2"
import convertPrice from "../../../utils/price"

import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"

import "../../style/create.css"

const Details = () => {

    const { vid } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const img = data.map((i) => { return i.img })

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API}/products/vid/${vid}`)
        .then((response) => setData(response.data))
        .catch((error) => console.log(error))
    }, [])

    return (
        <div className='page-max'>
            <div className="back" onClick={() => navigate(-1)}>
                <div className="fa-solid fa-arrow-left fa-xl active"></div>
                <div className="nav-logo" style={{fontFamily: 'var(--caveat)'}}>Vixcera</div>
            </div>
            <div className='prev-form' style={{ marginTop: '50px' }}>
              <div className='itext'>Product Details</div>
              <div className="product-card" style={{alignItems: 'center'}}>
                <LazyLoadImage onClick={() => swal.fire({ imageUrl: img, showConfirmButton: false })} className='product-img' src={img} loading='lazy' effect='blur'/>
              </div>
              {data.map((i,k) => {
                  return(
                      <div className='product-card' style={{ height: 'max-content' }} key={k}>
                          <div className='wrapped-text'>
                              <div className='product-title'>{i.title}</div>
                              <div className='product-desc' style={{ display: "block" }}>{i.desc}</div>
                              <div className='wrapped-details' style={{margin: 0, paddingTop: '25px', display: 'flex',alignItems: 'unset', flexDirection: "column", gap: '8px'}}>
                                  <div className="product-desc-product">Price       : <span>{convertPrice(i.price)}</span></div>
                                  <div className="product-desc-product">Category    : <span>{i.ctg}</span></div>
                                  {i.ctg == 'web' && <div className="product-desc-product">Technology  : <span>{i.tech || '-'}</span></div>}
                                  <div className="product-desc-product">Type        : <span>{i.type || '-'}</span></div>
                                  <div className="product-desc-product">Created by  : <span>{i.by}</span></div>
                              </div>
                          </div>
                      </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Details