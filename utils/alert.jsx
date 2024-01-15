import swal from "sweetalert2"

const alert = (error) => {
    return swal.fire({
        icon: "warning",
        text: `${error}`,
        showConfirmButton : false,
        color: 'var(--yellow)',
        background: 'var(--primary)',
        timer: 1500
    })
}

export default alert