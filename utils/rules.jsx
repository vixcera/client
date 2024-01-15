import axios from "axios"

const checkCookie = async () => {
    try {
        axios.get(`${import.meta.env.VITE_API}/getcookie`)
        .then(() => axios.get(`${import.meta.env.VITE_API}/checkcookie`))
    } catch (error) {
        if (error.response){
            console.log("not working")
        }
    }
    
}

export default checkCookie;