import { useEffect, useState } from "react"
import axios from "axios"
import convertPrice from "../../../utils/price"
import Topback from "../../components/topback"
import swalert from "../../../utils/swalert"
import "../../style/history.css"

const History = () => {

    const [data, setData] = useState([])

    const getData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}/transaction/history`)
            if (response.data.length !== 0) return setData(response.data)
        } catch (error) {
            if (error || error.response) {
                swalert(error.response.data || "Forbidden request", 'error', 2000)
            }
        }
    }

    useEffect(() => {getData()}, [])

    return (
        <div className="page-max">
            <Topback/>
            <div className="form" style={{marginTop: '70px'}}>
                <div className="input-form" style={{marginTop: '50px'}}>
                    {data.length !== 0 && data.map((i, k) => {
                        return (
                        <div className="box-history" key={k}>
                            <div className="itext" style={{color: 'var(--yellow)'}}>{convertPrice(i.product_amount)}</div>
                            <div className="itext" style={{fontFamily: 'var(--quicksand)', fontSize: '1.1rem'}}>Order ID : {i.order_id}</div>
                            <div style={{position: 'absolute', bottom: '5px', left: '15px', display: 'flex', justifyContent: 'center', gap: '5px'}}>
                                <div className="fa-solid fa-circle-check fa-2xl" style={{color: 'var(--blue)'}}/>
                                <div className="desc" style={{color: 'var(--blue)'}}>Verified Transaction</div>
                            </div>
                        </div>
                        )
                    })}
                   
                </div>
                <div className="title" style={{textAlign: 'center'}}><span>Order</span> History</div>
            </div>
        </div>
    )
}

export default History