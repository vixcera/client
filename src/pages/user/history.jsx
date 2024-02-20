import { useEffect, useState } from "react"
import axios from "axios"
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
                <div className="input-form">
                    {data.length !== 0 && data.map((i, k) => {
                        return (
                        <div className="box-history" key={k}>
                            <div className="itext">hi</div>
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