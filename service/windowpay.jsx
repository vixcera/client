import { createStorage } from "../function/store"

const windowpay = (token) => {
    window.snap.pay(token, {
        onSuccess: (result) => {
          location.href = result.finish_redirect_url
          createStorage('transaction', token, result.order_id, result.transaction_status, 5)
        },
        onPending: (result) => {
          window.snap.hide()
          createStorage('transaction', token, result.order_id, result.transaction_status, 5)
        },
    })
} 

export default windowpay;