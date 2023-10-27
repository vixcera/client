import { useNavigate } from "react-router";
import { Comments } from "@hyvor/hyvor-talk-react";

const Support = () => {

    const navigate = useNavigate()

    return (
        <div className="page">
            <div className="back" onClick={() => navigate('/')}>
                <div className="fa-solid fa-arrow-left fa-xl active"></div>
                <div className="nav-logo" style={{fontFamily: 'var(--caveat)'}}>Vixcera</div>
            </div>
            <div className="product-page" style={{color: 'var(--yellow)', fontFamily: 'var(--poppins)',  marginTop: '30px'}}>
               <Comments website-id={9873}/>
            </div>
        </div>
    )
}

export default Support