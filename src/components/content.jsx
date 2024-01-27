import { LazyLoadImage } from "react-lazy-load-image-component"
import { useNavigate } from "react-router-dom"
import products from "../../data/product"
import vixcera from "../../data/vixcera"
import Context from "../../utils/context"
import alert from "../../utils/alert"
import about from "../../data/about"
import { useContext } from "react"
import axios from "axios"
import "../style/content.css"

const Content = ({data}) => {

    const path = location.pathname
    const navigate = useNavigate()
    const context = useContext(Context)

    const repay = (token, id, status) => {
        if (status !== "expire" && status !== 'settlement') {
            window.snap.pay(token, {
                onSuccess : () => { window.location.href = `/transaction/success/${id}`}
            })
        }
        if (status === 'settlement') { navigate(`/transaction/success/${id}`) }
    }

    const deleteNotification = async (id) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}/transaction/delete/${id}`)
            alert(response.data)
        } catch (error) {
            if (error || error.response) {
                alert(error.response.data || "server maintenance!")
            }
        }
            
    }

    return (
        <div className="content">
            <div className="snap-container"></div>
            <div className="grep"/>
            <div className="notification-panel">
                {(!data.length) ? 
                    <div className="notification-wrap" style={{ justifyContent: 'center', height: '100%'}}>
                        <div>No recent notification.</div>
                    </div>
                :
                    <div className="notification-wrap" style={{ justifyContent: 'unset' }}>
                        {data.map((i, k) => {
                            return (
                                <div className="notification-box" key={k}>
                                    <LazyLoadImage src="/img/vixcera.png" className="nimg" style={{width: '30px'}} loading="lazy" effect="blur"/>
                                    <div onClick={() => repay(i.transaction_token, i.order_id, i.transaction_status)} className="text-container" style={{ padding: '0', margin: '0', gap: '4px', width: '90%', cursor: 'pointer' }}>
                                        <div className="text">{i.transaction_status == "settlement" ? 'success' : i.transaction_status} transaction</div>
                                        <p style={{ fontSize: '0.8rem' }}><span style={{fontFamily: 'var(--poppins)'}}>Order ID : {i.order_id}</span></p>
                                    </div>
                                    <div className="close" onClick={() => deleteNotification(i.order_id)}>
                                        <div className="fa-solid fa-close fa-xl" style={{color: 'var(--second)'}}/>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
            {(path == '/') && 
            <div>
                {(context.token) ? 
                <div className="developer">
                    <img src="/img/pi.png" className="dimasputra" alt="" />
                    <div className="text-wrapper">
                    <div>Hi {context.username}!,</div>
                    <div>Welcome back.</div>
                    <div className="button contact" onClick={() => navigate('/profile')}>Account</div>
                </div>
                </div>
                : 
                <div className="developer">
                    <img src="/img/pi.png" className="dimasputra" alt="" />
                    <div className="text-wrapper">
                    <div>Welcome to Vixcera</div>
                    <div>Let's explore with us.</div>
                    <div className="button contact" onClick={() => navigate('/register')}>Sign up</div>
                    </div>
                </div>}
                {(vixcera.map((i,k) => {
                return(
                    <div className="service" style={{paddingTop: "40px"}} key={k}>
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
            <div>
                {(about.map((i,k) => {
                return(
                    <div className="service" style={{paddingTop: '20px'}} key={k}>
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
            }))}
            {/* <div className="developer">
                <img src="/img/dimasputra.png" alt="" className="dimasputra"/> 
                <div className="text-wrapper">
                <div>Vixcera Developer</div>
                <div>Dimas Putra Utama</div>
                <div className="button contact" onClick={() => navigate('/dashboard')}>Contact</div>
                </div>
            </div> */}
            </div>
            }
            {(path == '/products') && 
            <div>
                <div className="developer">
                <img src="/img/cont.png" alt="" className="dimasputra"/> 
                <div className="text-wrapper">
                <div>Become a Contributor</div>
                <div>Sell your best work</div>
                <div className="button contact">Upcoming</div>
                </div>
                </div>
                {(products.map((i,k) => {
                    return(
                        <div className="service" style={{paddingTop: "40px"}} key={k}>
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
                }))}
            </div>
            }
            
        </div>
    )
}

export default Content