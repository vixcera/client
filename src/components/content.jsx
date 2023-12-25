import { LazyLoadImage } from "react-lazy-load-image-component"
import { useNavigate } from "react-router-dom"
import products from "../../data/product"
import vixcera from "../../data/vixcera"
import Context from "../../utils/context"
import about from "../../data/about"
import { useContext } from "react"
import "../style/content.css"

const Content = () => {

    const path = location.pathname
    const navigate = useNavigate()
    const context = useContext(Context)

    return (
        <div className="content">
            <div className="grep"/>
            <div className="developer" style={(path == '/about') ? {display: 'flex'} : {display: 'none'}}>
                <img src="/img/dimasputra.png" alt="" className="dimasputra"/> 
                <div className="text-wrapper">
                <div>Vixcera Developer</div>
                <div>Dimas Putra Utama</div>
                <div className="button contact" onClick={() => navigate('/request')}>Contact</div>
                </div>
            </div>
            {(path == '/') && 
            <div>
                {(context.token) ? 
                ''
                : 
                <div className="developer">
                    <img src="/img/pi.png" className="dimasputra" style={{width: '56%'}} alt="" />
                    <div className="text-wrapper">
                        <div>Welcome to Vixcera</div>
                        <div>Let's survive with us.</div>
                        <div className="button contact" onClick={() => navigate('/register')}>Sign up</div>
                    </div>
                </div>}
                {(vixcera.map((i,k) => {
                return(
                    <div className="service" style={(path == '/') ? {paddingTop: '40px'} : {}} key={k}>
                        <div className="itext"><span>{i.ctg}</span> Vixcera</div>
                        {i.data.map((p, l) => 
                            <div className="sbox" key={l} onClick={() => {p.ctg && navigate(`/product/${p.ctg}`)}} style={{borderRight : `2px solid ${p.color}`}}>
                                <div className="image-container" style={{backgroundColor : `${p.color}`}}>
                                    {p.img && <LazyLoadImage src={p.img} className="simg" style={{width: '60px'}} loading="lazy" effect="blur"/>}
                                </div>
                                <div className="text-container">
                                    <h3>{p.title}</h3>
                                    <p>{p.text}</p>
                                    <div className="wrapdet">{p.pricing && p.pricing.map((s, l) => {return(<div key={l}>{s}</div>)})}</div>
                                </div>
                            </div>
                        )}
                    </div>)
                }))}
            </div>
            }
            {(path == '/about') &&
            (about.map((i,k) => {
                return(
                    <div className="service" style={(path == '/about') ? {paddingTop: '40px'} : {}} key={k}>
                        <div className="itext"><span>{i.ctg}</span> Vixcera</div>
                        {i.data.map((p, l) => 
                            <div className="sbox" key={l} style={{borderRight : `2px solid ${p.color}`}}>
                                <div className="image-container" style={{backgroundColor : `${p.color}`}}>
                                    {p.img && <LazyLoadImage src={p.img} className="simg" style={{width: '50px'}} loading="lazy" effect="blur"/>}
                                </div>
                                <div className="text-container">
                                    <h3>{p.title}</h3>
                                    <p>{p.text}</p>
                                    <div className="wrapdet">{p.pricing && p.pricing.map((s, l) => {return(<div key={l}>{s}</div>)})}</div>
                                </div>
                            </div>
                        )}
                    </div>)
            })) 
            }
            {(path == '/products') && 
            (products.map((i,k) => {
                return(
                    <div className="service" style={(path == '/products') ? {marginBottom: '20px'} : {}} key={k}>
                        <div className="itext"><span>{i.ctg && i.ctg}</span> Categories</div>
                        {i.data.map((p, l) => 
                            <div className="sbox" key={l} onClick={() => navigate(`/product/${p.ctg}`)}  style={{borderRight : `2px solid ${p.color}`}}>
                                <div className="image-container" style={{backgroundColor : `${p.color}`}}>
                                    {p.img && <LazyLoadImage src={p.img} className="simg" loading="lazy" effect="blur"/>}
                                </div>
                                <div className="text-container">
                                    <h3>{p.title}</h3>
                                    <p>{p.text}</p>
                                    <div className="wrapdet">{p.pricing && p.pricing.map((s, l) => {return(<div key={l}>{s}</div>)})}</div>
                                </div>
                            </div>
                        )}
                    </div>
                )
            }))
            }
            
        </div>
    )
}

export default Content