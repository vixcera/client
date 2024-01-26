import { createStorage } from "../function/store"
import snap from "../utils/snap"

const windowpay = (token) => {
  snap().then(() => {
    window.snap.pay(token, {
        onSuccess: (result) => {
          createStorage('transaction', token, result.order_id, result.transaction_status, 15)
        },
        onPending: (result) => {
          createStorage('transaction', token, result.order_id, result.transaction_status, 15)
        },
        onClose: (result) => {
          createStorage('transaction', token, result.order_id, result.transaction_status, 15)
        },
        onError: (result) => {
          createStorage('transaction', token, result.order_id, result.transaction_status, 15)
        }
    })
  })
} 

export default windowpay;