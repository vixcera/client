import { useContext } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useNavigate } from 'react-router-dom'
import Context from '../../utils/context'

const User = () => {
    const navigate = useNavigate()
    const context = useContext(Context)

    return (
        <div className='page' style={{flexDirection: 'column', gap : '10px'}}>
            <div className="back" onClick={() => navigate('/')}>
                <div className="fa-solid fa-arrow-left fa-xl active"></div>
                <div className="nav-logo">
                    <p style={{fontFamily : "var(--caveat)"}}>Vixcera</p>
                </div>
            </div>
            <LazyLoadImage src={context.img} width={150} style={{borderRadius : '50%'}}/>
            <div className='title'>{context.username}</div>
            <div className='button' style={{width : 300, height : 45, borderRadius: '5px', marginTop: '20px'}}>
                <h4>{context.email}</h4>
            </div>
        </div>
    )
}

export default User