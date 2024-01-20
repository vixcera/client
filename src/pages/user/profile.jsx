import { useContext, useRef, useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useNavigate } from 'react-router-dom'
import Context from '../../../utils/context'
import swal from "sweetalert2"
import axios from "axios"

const Profile = () => {

    const navigate = useNavigate()
    const inputref = useRef(null)
    const context = useContext(Context)

    const [file, setFile] = useState(null)
    const [email, setEmail] = useState('')
    const [vxsrf, setVxsrf] = useState('')

    const edit = () => {
        const mail = document.getElementById('changemail')
        mail.removeAttribute('readOnly')
        mail.value = context.email
    }

    const logout = async() => {
        try {
            context.setLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_API}/logout`)
            context.setToken('')
            swal.fire({icon : 'success', text : response.data, showConfirmButton: false, timer : 2000, background: 'var(--primary)', color: 'var(--blue)'})
            .then((res) => location.href = '/')
        } 
        catch (error) {{error.response && console.log(error.response.data)}}
        finally{context.setLoading(false)}
    }

    const updateImage = async(e) => {
        e.preventDefault()
        context.setLoading(true)
        let formData = new FormData();
        formData.append('img', file);
        try {
            const response = await axios.put(`${import.meta.env.VITE_API}/user/update`, formData, {
                headers : {"Content-Type" : "multipart/form-data", "xsrf-token" : vxsrf}, 
                withCredentials : true
            })
            swal.fire({icon : 'success', text : response.data, showConfirmButton : false, timer: 2000 , background: 'var(--primary)', color: 'var(--blue)'})
            .then(res => res.isDismissed && location.reload())
        } 
        catch (error) {return swal.fire({icon : 'error', showConfirmButton: false, text: error.response.data, background: 'var(--primary)', color: 'var(--blue)'})}
        finally {context.setLoading(false)}
    }

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API}/getvxsrf`)
        .then((result) => setVxsrf(result.data))
    }, [])

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
                <input id='changemail' type="text" style={{width : '300px'}} placeholder={context.email} readOnly/>
                {(file || email) ? <button style={{margin: '30px 0'}} className='button' type='submit'>update</button> : 
                <div style={{margin: '30px 0', display: 'flex', gap: '20px'}}>
                    <div className='button' onClick={() => edit()}><i style={{cursor: 'pointer'}} className='fa-solid fa-store fa-xl'/></div>
                    <div className='button' onClick={logout}><i className='fa-solid fa-right-from-bracket fa-xl'/></div>
                </div>}  
            </form>
        </div>
    )
}

export default Profile;