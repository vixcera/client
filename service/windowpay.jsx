import { createStorage } from "../function/store"

const windowpay = (token) => {
    window.snap.pay(token, {
        onSuccess: (result) => {
          location.href = result.finish_redirect_url
          createStorage('transaction', token, result.order_id, result.transaction_status, 15)
        },
        onPending: (result) => {
          createStorage('transaction', token, result.order_id, result.transaction_status, 15)
        },
    })
} 

export default windowpay;