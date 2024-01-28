import swal from "sweetalert2";

const alert = (error) => {
  return swal.fire({
    icon: "info",
    text: `${error}`,
    showConfirmButton: false,
    color: "var(--blue)",
    background: "var(--primary)",
    timer: 1500,
  });
};

export default alert;