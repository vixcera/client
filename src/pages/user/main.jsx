import { useEffect } from "react"
import Navbar from "../../components/navbar"
import Content from "../../components/content"
import Sidebar from "../../components/sidebar"
import snap from "../../../utils/snap"
import swal from "sweetalert2"
import "../../style/main.css"

const Main = () => {

    const transaction = JSON.parse(sessionStorage.getItem('transaction'))
    const transaction_token = sessionStorage.getItem('transaction_token')
    
    useEffect(() => {
        if (transaction.transaction_status === 'pending') {
            snap()
            swal.fire({
                icon: 'question',
                title: `Pending order`,
                text: 'You have an unpaid order, want to pay now?',
                background: 'var(--primary)',
                color: "var(--blue)",
                confirmButtonText: 'Pay now',
                showDenyButton: true,
                denyButtonText: 'Cancel'
            })
            .then((res) => {
                if (res.isConfirmed) return window.snap.pay(transaction_token)
                if (res.isDenied) return sessionStorage.removeItem('transaction' && 'transactionToken')
            })
        }
    } ,[])

    return (
        <div className="main">
            <Navbar/>
            <Content/>
            <Sidebar/>
        </div>
    )
}

export default Main