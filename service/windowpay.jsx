import { createStorage } from "../function/store"

const windowpay = (token) => {
    window.snap.pay(token, {
        onSuccess: (result) => {
          createStorage('transaction',token, result.order_id, result.transaction_status, 5)
        },
        onPending: (result) => {
          createStorage('transaction',token, result.order_id, result.transaction_status, 5)
        },
    })
} 

export default windowpay;