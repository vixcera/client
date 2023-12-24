import swal from "sweetalert2"
import axios from "axios"

const admin = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API}/administrator`)
    console.log(response.data)
  } catch (error) {
    if (error || error.response) {
      swal.fire({
        icon: 'warning',
        text: `${error.response.data}`,
        showConfirmButton: false,
        color: 'var(--text)',
        background: 'var(--background)',
        timer: 1500
      })
      .then((res) => res.isDismissed? location.href = '/' : '/')
    }
  }
  
}

export default admin