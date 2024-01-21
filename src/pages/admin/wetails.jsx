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

    const navigate = useNavigate()
    const { vid } = useParams()
    const vxpwd = sessionStorage.getItem("vxpwd")
    const [data, setData] = useState([])
    const img = data.map((i) => { return i.img })

    const checkAdmin = async () => {
        const result = await swal.fire({
          title: 'verify your identity',
          input: 'password',
          inputValue : vxpwd? vxpwd : '',
          inputPlaceholder: 'enter your password',
          showCancelButton: true,
          background: 'var(--primary)',
          color: 'var(--blue)',
          preConfirm: async (password) => {
            if (!password) {
              swal.showValidationMessage('password is required');
              return false;
            }
      
            try {
              const response = await axios.get(`${import.meta.env.VITE_API}/waiting/vid/${vid}`,{ headers: { "author" : password } });
              setData(response.data);
              sessionStorage.setItem('vxpwd', password);
              return true;
            } catch (error) {
                if (error || error.response) {
                    swal.showValidationMessage('invalid password');
                    return false;
                }
            }
          },
        });
      
        if (result.dismiss || result.isDenied) {
          return location.href = '/';
        }
      };
      
    useEffect(() => checkAdmin(), [])
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
                        <LazyLoadImage style={{ width: '100%' }} className='product-img' src={img} loading='lazy' effect='blur'/>
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
                        <div className='product-card' style={{ height: 'max-content', width: '100%', marginTop: '10px' }}>
                            <div className='wrapped-text'>
                                <div className='wrapped-details' style={{margin: 0, paddingTop: '0', display: 'flex',alignItems: 'unset', flexDirection: "column", gap: '10px'}}>
                                    <div className="product-desc-product">VID         : <span>{i.vid}</span></div>
                                    <div className="product-desc-product">Price       : <span>{convertPrice(i.price)}</span></div>
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