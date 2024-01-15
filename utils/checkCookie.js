import axios from "axios"

const checkCookie = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API}`)
    console.log(response.data)
}

export default checkCookie;