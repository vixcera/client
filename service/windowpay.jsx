const windowpay = (token) => {
    window.snap.pay(token, {
        onPending: (result) => {
          createStorage('transaction', response.data, result.order_id, result.transaction_status, 15)
        },
        onClose: (result) => {
          createStorage('transaction', response.data, result.order_id, result.transaction_status, 15)
        },
        onError: (result) => {
          createStorage('transaction', response.data, result.order_id, result.transaction_status, 15)
        }
    })
} 

export default windowpay;