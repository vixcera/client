import { useEffect, useState } from 'react'
import Loading from '../../../utils/loading'
import alert from '../../../utils/alert'
import axios from 'axios'

const SuccessOrder = () => {

    const orderID = new URLSearchParams(location.search).get('order_id')
    console.log(orderID)
    const [ loading, setLoading ] = useState(false)

    const donwloadProduct = async() => {
        try {
            setLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_API}/transaction/success/${orderID}`)
            const url = response.data.file;
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${response.data.name}`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            alert("server maintenance!")
            if(error.response) alert(error.response.data)
            .then((res) => { if(res.dismiss) { location.href = '/' } })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { donwloadProduct() }, [])

    if (loading) return <Loading/>

    return(
        <div className='page-max'>
            <div className="back" onClick={() => navigate('/products')}>
                <div className="fa-solid fa-arrow-left fa-xl active"></div>
                <div className="nav-logo" style={{fontFamily: 'var(--caveat)'}}>Vixcera</div>
          </div>
        </div>
    )
}

export default SuccessOrder