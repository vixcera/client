import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {LazyLoadImage} from "react-lazy-load-image-component"
import convertPrice from '../../../utils/price'
import swal from "sweetalert2"
import axios from "axios"
import "../../style/create.css"

const Create = () => {
  const navigate = useNavigate()
  const fileref = useRef(null)
  const imgref = useRef(null)

  const inputHistory = JSON.parse(localStorage.getItem('inputHistory'))

  const [file, setFile] = useState('')
  const [image, setImage] = useState('')
  const [ctg, setCtg] = useState((inputHistory) ? inputHistory.ctg : '')
  const [desc, setDesc] = useState((inputHistory) ? inputHistory.desc : '')
  const [title, setTitle] = useState((inputHistory) ? inputHistory.title : '')
  const [price, setPrice] = useState((inputHistory) ? inputHistory.price : '')

  if (title || price || desc || ctg || file || image) {
    localStorage.setItem('inputHistory', JSON.stringify({title, price, desc, ctg}))
  }

  const createProduct = async () => {
    try {
      let formData = new FormData()
      formData.append('ctg', ctg);
      formData.append('img', image);
      formData.append('desc', desc);
      formData.append('file', file);
      formData.append('title', title);
      formData.append('price', price);
      const response = await axios.post(`${import.meta.env.VITE_API}/product`,formData, {
        headers: {"Content-Type": 'multipart/form-data'}
      })
      localStorage.clear()
      swal.fire({icon:'success',text:response.data,showConfirmButton:false,timer:2500})
      .then((res) => res.dismiss && location.reload())
    } catch (error) {
      if (error.response) {swal.fire({icon: 'error', text:error.response.data,showConfirmButton:false})}
    }
  }


  return (
    <div className='page-max' style={{gap:'30px'}}>
      <div className="back" onClick={() => navigate('/')}>
        <div className="fa-solid fa-arrow-left fa-xl active"></div>
        <div className="nav-logo" style={{fontFamily: 'var(--caveat)'}}>Vixcera</div>
      </div>
      <div className='form'>
        <div className='input-form'>
          <div>
            <div>Title :</div>
            <input className='productinput' value={title} type="text" placeholder='ex: company profile' onChange={(e) => setTitle(e.target.value)}/>
          </div>
          <div>
            <div>Description :</div>
            <input className='productinput' value={desc} type="text" placeholder='ex: modern company web.....' onChange={(e) => setDesc(e.target.value)}/>
          </div>
          <div>
            <div>Price :</div>
            <input className='productinput' value={price} type="text" placeholder='ex: 350000' onChange={(e) => setPrice(e.target.value)}/>
          </div>
          <div className='wrap-file'>
            <div>
              <div>Preview : </div>
              <div className='prevfile' onClick={() => imgref.current.click()}>
                <div className={(image) ? 'fa-solid fa-check fa-xl' : 'fa-solid fa-image fa-xl'} style={{color: 'var(--background)'}}/>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} ref={imgref} style={{display:'none'}}/>
              </div>
            </div>
            <div>
              <div>File : </div>
              <div className='prevfile' onClick={() => fileref.current.click()}>
                <div className={(file) ? 'fa-solid fa-check fa-xl' : 'fa-solid fa-file fa-xl'} style={{color: 'var(--background)'}}/>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} ref={fileref} style={{display:'none'}}/>
              </div>
            </div>
            <div>
              <div>Category :</div>
              <select value={ctg} onChange={(e) => setCtg(e.target.value)}>
                <option value=""></option>
                <option value="web">Web</option>
                <option value="vector">Vector</option>
                <option value="video">Video</option>
              </select>
            </div>
            </div>
          </div>
        <div className='prev-form'>
          <div className='itext'>Preview</div>
          <div className='product-card'>
            <LazyLoadImage className='product-img' src={(image) ? URL.createObjectURL(image) : '/img/dpi.jpg'} loading='lazy' effect='blur'/>
            <div className="wrapped-text">
              <div className='product-title'>{(title) ? title : 'Untitled'}</div>
              <div className='product-desc'>{(desc) ? desc : 'no description available'}</div>
              <div className="wrapped-details">
              <div className='button price'>{convertPrice(price)}</div>
              <div style={{ color : 'var(--text)', cursor: 'pointer'}} className='fa-solid fa-cart-plus fa-xl' />
              </div>
            </div>
          </div>
          <div className='button' onClick={() => createProduct()} style={(file && title && image && desc && price && ctg) ? {width:'130px', marginTop:"30px"} : {display:'none'}}>Create</div>
        </div>
      </div>
    </div>
  )
}

export default Create