import { useContext, useRef, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useNavigate } from 'react-router-dom'
import Context from '../../utils/context'
import swal from "sweetalert2"
import axios from "axios"

const User = () => {
    const navigate = useNavigate()
    const inputref = useRef(null)
    const context = useContext(Context)
    const [file, setFile] = useState(null)

    const logout = async() => {
        try {
            const response = await axios.get(`http://localhost:1010/logout`, {withCredentials: true})
            context.setToken('')
            swal.fire({icon : 'success', text : response.data, showConfirmButton: false, timer : 1000})
            .then((res) => location.href = '/')
        } 
        catch (error) {{error.response && console.log(error.response.data)}}
    }

    const updateImage = async(e) => {
        e.preventDefault()
        context.setLoading(true)
        let formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.put('http://localhost:1010/user/update', formData, {
                headers : {"Content-Type" : "multipart/form-data"}, 
                withCredentials : true
            })
            swal.fire({icon : 'success', text : response.data, timer : 1000, showConfirmButton : false})
            .then(res => res.isDismissed && location.reload())
        } 
        catch (error) {return swal.fire({icon : 'error', showConfirmButton: false, text: error.response.data, timer: 1500})}
        finally {context.setLoading(false)}
    }

    return (
        <div className='page' style={{flexDirection: 'column', gap : '10px'}}>
            <div className="back" onClick={() => navigate('/')}>
                <div className="fa-solid fa-arrow-left fa-xl active"></div>
                <div className="nav-logo"><p style={{fontFamily : "var(--caveat)"}}>Vixcera</p></div>
            </div>
            <LazyLoadImage onClick={() => inputref.current.click()} src={(file) ? URL.createObjectURL(file) : context.img} width={150} height={150} style={{borderRadius : '50%', objectFit: 'cover', cursor : 'pointer', border : '2px solid var(--yellow)'}}/>
            <div className='title'>{context.username}</div>
            <form style={{display: 'flex', alignItems: "center", flexDirection: 'column'}} onSubmit={updateImage}>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} ref={inputref} style={{display: 'none'}}/>
                <input type="text" style={{width : '300px'}} placeholder={context.email} readOnly/>
                {(file) ? <button style={{margin: '30px 0'}} className='button' type='submit'>update</button> : <div className='button' onClick={logout} style={{margin: '30px 0'}}><i className='fa-solid fa-right-from-bracket fa-xl'/></div>}  
            </form>
        </div>
    )
}

export default User