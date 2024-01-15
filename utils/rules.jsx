import axios from "axios"
import swal from "sweetalert2"

const checkCookie = async () => {

    const agent = sessionStorage.getItem("agent")

    if (!agent) {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}/getcookie`)
            .then(() => axios.get(`${import.meta.env.VITE_API}/checkcookie`))
            sessionStorage.setItem("agent", "prevent")
        } catch (error) {
            if (error.response){
                swal.fire({
                    icon : 'info',
                    title: 'cookie disabled',
                    text: 'vixcera requires third-party cookies, please enable on your browser settings.',
                    background: 'var(--primary)',
                    color : 'var(--blue)',
                    showDenyButton: true,
                    denyButtonText: 'skip',
                    confirmButtonText: 'yes, understand'
                })
                .then((result) => {
                    if (result.isDenied) {
                        swal.fire({
                            icon: 'warning',
                            text : "some features may not work properly. or you can try on another browser.",
                            background: 'var(--primary)',
                            color : 'var(--blue)',
                            showDenyButton: true,
                            denyButtonText: 'skip',
                            confirmButtonText: 'step by step'
                        })
                        .then((res) => {
                            if (res.isDenied) {
                                sessionStorage.setItem("agent", "prevent")
                            }
                        })
                    }
                })
            }
        }
    }
}

export default checkCookie;