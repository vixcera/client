import axios from "axios"
import getvxsrf from "../secure/getvxsrf"
const transaction = JSON.parse(sessionStorage.getItem('success_transaction'))

const donwloadProduct = async () => {
    const vxsrf = getvxsrf().then((result) => { return result })
    const response = await axios.post(`${import.meta.env.VITE_API}/donwload/product`, {
        orderID : transaction.order_id
    })
}

export default donwloadProduct