import axios from "axios"
import bowser from "bowser"
import swal from "sweetalert2"

const checkCookie = async () => {

    const agent = sessionStorage.getItem("agent")
    const info = bowser.parse(window.navigator.userAgent)
    const name = info.browser.name.toLowerCase()

    const img_safari = '/img/safari.png'
    const img_chrome = '/img/chrome.png'
    const img_firefox = '/img/firefox.png'
    const img_default = '/img/browser.png'

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
                    if (result.isConfirmed) {
                        if (res.isConfirmed) {
                            swal.fire({
                                imageUrl: (name === 'safari') && img_safari ||
                                          (name === 'chrome') && img_chrome ||
                                          (name === 'firefox') && img_firefox ||
                                          (!name.includes("safari" || "chrome" || "firefox")) && img_default,
                                imageWidth : 120,
                                background: 'var(--primary)',
                                color : 'var(--blue)',
                                title : name,
                                text : `you are using ${name}, let's go configure now.`,
                                confirmButtonText: 'configuration'
                            })
                        }
                    }
                    if (result.isDenied) {
                        swal.fire({
                            icon: 'warning',
                            text : "some features may not work properly. or you can try on another browser.",
                            background: 'var(--primary)',
                            color : 'var(--blue)',
                            showDenyButton: true,
                            denyButtonText: 'skip & continue',
                            confirmButtonText: 'step by step',
                            reverseButtons: true
                        })
                        .then((res) => {
                            if (res.isDenied) {
                                sessionStorage.setItem("agent", "prevent")
                            }
                            if (res.isConfirmed) {
                                swal.fire({
                                    imageUrl: (name === 'safari') && img_safari ||
                                              (name === 'chrome') && img_chrome ||
                                              (name === 'firefox') && img_firefox ||
                                              (!name.includes("safari" || "chrome" || "firefox")) && img_default,
                                    imageWidth : 120,
                                    background: 'var(--primary)',
                                    color : 'var(--blue)',
                                    title : name,
                                    text : `you are using ${name}, let's go configure now.`,
                                    confirmButtonText: 'configuration'
                                })
                            }
                        })
                    }
                })
            }
        }
    }
}

export default checkCookie;