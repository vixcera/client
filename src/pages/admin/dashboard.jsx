import axios from 'axios'
import swal from "sweetalert2"
import convertPrice from '../../../utils/price'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {LazyLoadImage} from "react-lazy-load-image-component"

const Dashboard = () => {
    const navigate = useNavigate()

    const [ data, setData ] = useState([])
    const [ password, setPassword ] = useState('')

    const vxpwd = sessionStorage.getItem("vxpwd")
    
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
              const response = await axios.get(`${import.meta.env.VITE_API}/waitinglist`,{ headers: { "author" : password } });
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
      
        if (result.isDenied || result.dismiss) {
          return location.href = '/';
        }
    };

    useEffect(() => { checkAdmin() }, [])

    return (
        <div className='page-max'>
            <div className="back" onClick={() => location.href = '/'}>
                <div className="fa-solid fa-arrow-left fa-xl active"></div>
                <div className="nav-logo" style={{fontFamily: 'var(--caveat)'}}>Vixcera</div>
            </div>
            <div className='product-page'>
                <div className='product-container'>
                <input type="text" className='search'/>
                    {data.map((i, k) => {
                            return(
                            <div className='product-card' key={k}>
                                <LazyLoadImage className='product-img' onClick={() => navigate(`/waiting/details/${i.vid}`)} src={(i.img) || ('img/img404.jpg')} loading='lazy' effect='blur'/>
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