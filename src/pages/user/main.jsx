import axios from "axios"
import snap from "../../../utils/snap"
import Navbar from "../../components/navbar"
import Content from "../../components/content"
import Sidebar from "../../components/sidebar"
import { useEffect, useState } from "react"
import "../../style/main.css"
import { Navigate } from "react-router-dom"

const Main = () => {

    const register_mode_user = localStorage.getItem('register_mode_user')
    const transaction_mode = localStorage.getItem('transaction_mode')
    const [ data, setData ] = useState([])
    const [ count, setCount ] = useState(0)

    const getTransaction = async () => {
        const response = await axios.get(`${import.meta.env.VITE_API}/transaction/show`)
        setData(response.data)
        setCount(response.data.length)
        response.data.length !== 0 ? snap() : localStorage.removeItem('transaction_mode')
    }

    useEffect(() => { 
        if (transaction_mode) { getTransaction() 
        if (register_mode_user) { Navigate({to : '/confirm/user'}) }
    }
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