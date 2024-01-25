import axios from "axios"
import alert from "../utils/alert"
import getvxsrf from "./getvxsrf"

const donwloadProduct = async (order_id) => {
    try {
        const vxsrf = await getvxsrf().then((result) => { return result })
        const response = await axios.post(`${import.meta.env.VITE_API}/donwload/product`, { order_id },
        { headers : { 'xsrf-token' : vxsrf }})

        // Membuat tautan untuk mengunduh Blob
        const url = response.data.file;
        const link = document.createElement('a');
        link.href = url;

        link.setAttribute('download', `${response.data.name}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        alert(error.message)
        if (error.response) {
            alert(error.response.data)
            .then((res) => res.dismiss ? location.href = '/' : '')
        }
    }
    
}

export default donwloadProduct