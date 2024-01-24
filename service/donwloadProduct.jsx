import axios from "axios"
import alert from "../utils/alert"
import getvxsrf from "../secure/getvxsrf"

const donwloadProduct = async (order_id) => {
    try {
        const vxsrf = await getvxsrf().then((result) => { return result })
        const response = await axios.post(`${import.meta.env.VITE_API}/donwload/product`, { order_id },
        { headers : { 'xsrf-token' : vxsrf }, responseType: 'arraybuffer' })

        const blob = new Blob([response.data], { type: 'application/zip' });

        // Membuat tautan untuk mengunduh Blob
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;

        link.setAttribute('download', response.data.name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        if (error || error.response) {
            alert(error.response.data)
            .then((res) => res.dismiss ? location.href = '/' : '')
        }
    }
    
}

export default donwloadProduct