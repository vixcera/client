import axios from "axios"
import alert from "../utils/alert"
import getvxsrf from "../secure/getvxsrf"

const donwloadProduct = async (order_id) => {
    try {
        const vxsrf = await getvxsrf().then((result) => { return result })
        const response = await axios.post(`${import.meta.env.VITE_API}/donwload/product`, { order_id },
        { headers : { 'xsrf-token' : vxsrf }, responseType: 'blob'})

        const blob = new Blob([response.data], { type: 'application/zip' });

        // Membuat tautan untuk mengunduh Blob
        const url = window.URL.createObjectURL(blob);

        // Membuat elemen anchor dan menyimpan file lokal
        const link = document.createElement('a');
        link.href = url;

        // Mendapatkan nama file dari respons server
        const suggestedFilename = response.data.name || 'nama_file_yang_diinginkan.zip';

        link.setAttribute('download', suggestedFilename);
        document.body.appendChild(link);
        link.click();

        // Membersihkan elemen anchor setelah unduhan selesai
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