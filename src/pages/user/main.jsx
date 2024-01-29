import axios from "axios"
import snap from "../../../utils/snap"
import Navbar from "../../components/navbar"
import Content from "../../components/content"
import Sidebar from "../../components/sidebar"
import { useEffect, useState } from "react"
import "../../style/main.css"

const Main = () => {

    const transaction_mode = localStorage.getItem('transaction_mode')
    const [ data, setData ] = useState([])
    const [ count, setCount ] = useState(0)

    const getTransaction = async () => {
        const response = await axios.get(`${import.meta.env.VITE_API}/transaction/show`)
        setData(response.data)
        setCount(response.data.length)
        if (response.data.length !== 0) { snap() }
    }

    useEffect(() => { 
        if (transaction_mode) { getTransaction() }
        if (data.length == 0) { localStorage.removeItem('transaction_mode') }
    }, [])

    return (
        <div className="main">
            <Navbar count={count}/>
            <Content data={data} setData={setData} setCount={setCount}/>
            <Sidebar/>
        </div>
    )
}

export default Main