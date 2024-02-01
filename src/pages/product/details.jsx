import swal from "sweetalert2"
import convertPrice from "../../../utils/price"
import { useLocation, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "../../style/create.css"

const Details = () => {

    const { vid } = useParams()
    const location = useLocation()
    const i = location.state
    const navigate = useNavigate()

    return (
        <div className='page-max'>
            <div className="back" onClick={() => navigate(`/product/${i.ctg}`)}>
                <div className="fa-solid fa-arrow-left fa-xl active"></div>
                <div className="nav-logo" style={{fontFamily: 'var(--caveat)'}}>Vixcera</div>
            </div>
            <div className="form">
                <div className='prev-form' style={{ marginTop: '10px', paddingBottom: '0', gap: '20px' }}>
                    <div className='itext'>Product Details</div>
                        <>
                        <div className="product-card" style={{ height: 'max-content', width: '100%', marginTop: '0px', justifyContent: 'center' }}>
                            <LazyLoadImage style={{ width: '100%' }} onClick={() => swal.fire({ imageUrl: i.img, showConfirmButton: false })} className='product-img' src={i.img} loading='lazy' effect='blur'/>
                        </div>
                        <div className="button-max" style={{ color: "var(--text)", backgroundColor: "var(--primary)"}} onClick={() => window.open(i.link)}>
                            <div className="i fa-solid fa-globe fa-xl"/>
                            Live Preview
                        </div>
                        <div className='product-card' style={{ height: 'max-content', width: '100%', marginTop: "30px" }}>
                            <div className='wrapped-text'>
                                <div className='product-title' style={{ fontSize: '1.4rem' }}>{i.title}</div>
                                <div className='product-desc' style={{ display: "block", fontSize: '1rem', marginTop: '10px', fontFamily: 'var(--poppins)' }}>{i.desc}</div>
                            </div>
                        </div>
                        <div className='product-card' style={{ height: 'max-content', width: '100%', marginTop: '10px' }}>
                            <div className='wrapped-text'>
                                <div className='wrapped-details' style={{margin: 0, paddingTop: '0', display: 'flex',alignItems: 'unset', flexDirection: "column", gap: '10px'}}>
                                    <div className="product-desc-product"><span>VID</span>          : {i.vid}</div>
                                    <div className="product-desc-product"><span>Price</span>        : {convertPrice(i.price)}</div>
                                    <div className="product-desc-product"><span>Category</span>     : {i.ctg}</div>
                                    {i.ctg == 'web' && <div className="product-desc-product"><span>Framework</span>  : {i.tech} {i.tech.toLowerCase().includes('html') ? "" : 'JS'}</div>}
                                </div>
                            </div>
                        </div>
                        <div className='product-card' style={{ height: 'max-content', width: '100%' }}>
                            <div className='wrapped-text'>
                                <div className='wrapped-details' style={{margin: 0, paddingTop: '0', display: 'flex',alignItems: 'unset', flexDirection: "column", gap: '10px'}}>
                                    <div className="product-desc-product"><span>Created by</span>  : {i.by}</div>
                                    <div className="product-desc-product"><span>Created at</span>  : {i.createdAt.slice(0, 10)}</div>
                                </div>
                            </div>
                        </div>
                        <div className="button-max" onClick={() => navigate(`/order/${vid}`, {state: i})} style={{ marginTop: '30px', backgroundColor: 'var(--yellow)' }}>
                            <div className="i fa-solid fa-cart-shopping fa-xl" style={{color: 'var(--background)'}}/>
                            Order now
                        </div>
                        </>
                </div>
            </div>
        </div>
    )
}

export default Details