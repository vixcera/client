import axios from "axios"

const checkCookie = async () => {
    try {
        const getcookie = await axios.get(`${import.meta.env.VITE_API}/getcookie`)
        .then(() => axios.get(`${import.meta.env.VITE_API}/checkcookie`))
    } catch (error) {
        if (error.response){
            console.log(error.response)
        }
    }
    
}

export default checkCookie;