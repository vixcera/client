import bowser from "bowser"
import axios from "axios"
import swal from "sweetalert2"

const browser = async () => {

    const brow = bowser.getParser(window.navigator.userAgent);
    const useragent = navigator.userAgent
    const localagent = sessionStorage.getItem("useragent")
    const urldocs = 'https://support.apple.com/en-gb/guide/iphone/iphb01fc3c85/ios#:~:text=Control%20privacy%20and%20security%20settings,to%20allow%20cross%2Dsite%20tracking.'


    if (!localagent) {
        if (brow.satisfies({ safari : ">= 10" })) {
            swal.fire({
                icon: 'info',
                titleText: 'safari detected!',
                text: "vixcera requires third-party cookies, please turn off prevent cross-site tracking on safari settings.",
                color: '#ccc',
                background: 'var(--primary)',
                confirmButtonText : "what's happend?",
                showDenyButton: true,
                denyButtonText : 'later'
            })
            .then((response) => {
                if (response.dismiss) return
                if (response.isDenied) {
                    swal.fire({
                        icon: "warning",
                        text: "vixcera may not work properly on this browser",
                        background: 'var(--primary)',
                        color : '#ccc',
                        showDenyButton: true,
                        denyButtonText: 'skip',
                        confirmButtonText : "let's do it"
                    })
                    .then((res) => {
                        if (res.isConfirmed)  {
                            sessionStorage.setItem("useragent", useragent)
                            window.open(urldocs)
                        } else {
                            sessionStorage.setItem("useragent", useragent)
                        }
                    })
                }
                if (response.isConfirmed) {
                    sessionStorage.setItem("useragent", useragent)
                    window.open(urldocs)
                }
            })
        }
    }
    return;
}

export default browser