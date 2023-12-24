const snap =  async () => {
        const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';  
        let scriptTag = document.createElement('script');
        scriptTag.src = midtransScriptUrl;
        const myMidtransClientKey = 'SB-Mid-client-xZHXngPqmiSbGWeP';
        scriptTag.setAttribute('data-client-key', myMidtransClientKey);
        document.body.appendChild(scriptTag);
        return () => {
          document.body.removeChild(scriptTag);
        }

}

export default snap
    
