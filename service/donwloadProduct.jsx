import axios from "axios"
import alert from "../utils/alert"
import getvxsrf from "../secure/getvxsrf"

const donwloadProduct = async (order_id) => {
    try {
        const vxsrf = getvxsrf().then((result) => { return result })
        const response = await axios.post(`${import.meta.env.VITE_API}/donwload/product`, {
            order_id : order_id
        },{ headers : { 'xsrf-token' : vxsrf }
        })
        const fileLink = response.data.file;
        const fileName = response.data.name;
        const link = document.createElement('a');
        link.href = fileLink;
        link.setAttribute('download', fileName);
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