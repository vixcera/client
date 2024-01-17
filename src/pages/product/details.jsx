import axios from "axios"
import convertPrice from "../../../utils/price"

import { useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"

import "../../style/create.css"
import { useEffect } from "react"

const Details = () => {

    const { vid } = useParams()
    const [data, setData] = useState([])
    console.log(vid)

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API}/products/vid/${vid}`)
        .then((response) => setData(response.data))
    }, [])

    return (
        <div className='page-max'></div>
    )
}

export default Details