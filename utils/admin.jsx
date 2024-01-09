import swal from "sweetalert2"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const admin = async () => {
  const navigate = useNavigate()
  try {
    const response = await axios.get(`${import.meta.env.VITE_API}/administrator`)
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
      .then((res) => {
        if (res.isDismissed) {
          return navigate('/')
        }
      })
    }
  }
  
}

export default admin