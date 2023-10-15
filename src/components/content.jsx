import { LazyLoadImage } from "react-lazy-load-image-component"
import { useNavigate } from "react-router-dom"
import products from "../../data/product"
import "../style/content.css"
import "react-lazy-load-image-component/src/effects/blur.css"
import axios from "axios"
import { useContext } from "react"
import Context from "../../utils/context"

const Content = () => {

    const navigate = useNavigate()
    const context = useContext(Context)

    const getUser = async () => {
        const response = await context.axtoken.get(`http://localhost:1010/user/${context.id}`, {
            withCredentials: true,
            headers : { Authorization: `bearer ${context.token}` }
        })
        console.log(response.data)
    }

    return (
        <div className="content">
            <div className="grep"/>
            <div className="developer">
                <img src="/img/dimasputra.png" alt="" className="dimasputra"/> 
                <div className="text-wrapper">
                    <div>Vixcera Developer</div>
                    <div>Dimas Putra Utama</div>
                    <div className="button contact" onClick={() => getUser()}>Contact</div>
                </div>
            </div>
            {(products.map((i,k) => {
                return(
                    <div className="service" key={k}>
                        <div className="itext"><span>{i.ctg}</span> Categories</div>
                        {i.data.map((p, l) => {
                            return(
                                <div className="sbox" key={l} onClick={() => p.link && navigate(p.link)}  style={{borderRight : `2px solid ${p.color}`}}>
                                    <div className="image-container" style={{backgroundColor : `${p.color}`}}>
                                        {p.img && <LazyLoadImage src={p.img} className="simg" loading="lazy" effect="blur"/>}
                                    </div>
                                    <div className="text-container">
                                        <h3>{p.title}</h3>
                                        <p>{p.text}</p>
                                        <div className="wrapdet">{p.pricing && p.pricing.map((s, l) => {return(<div key={l}>{s}</div>)})}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            }))}
        </div>
    )
}

export default Content