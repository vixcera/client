import { createStorage } from "../function/store"

const windowpay = (token) => {
  let endpoint = "https://vixcera.my.id/transaction/success"
    window.snap.pay(token, {
        onSuccess: (result) => {
          createStorage('transaction', token, `${endpoint}${result.finish_redirect_url}`, result.order_id, result.transaction_status, 5)
          location.href = result.finish_redirect_url
        },
        onPending: (result) => {
          createStorage('transaction', token, `${endpoint}${result.finish_redirect_url}`, result.order_id, result.transaction_status, 5)
          window.snap.hide()
        },
        onClose: (result) => {
          createStorage('transaction', token, `${endpoint}${result.finish_redirect_url}`, result.order_id, result.transaction_status, 5)
          window.snap.hide()
        }
    })
} 

export default windowpay;