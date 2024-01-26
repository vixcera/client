export const createStorage = async (key, token, id, exp) => {
    let index = 1;
    let currentKey = `${key}${index}`;
    const found = sessionStorage.getItem(currentKey);
    const expire = new Date(exp).getTime()
    if (!found) return sessionStorage.setItem(currentKey, JSON.stringify({ token, id, expire }));
    
    while (sessionStorage.getItem(currentKey)) {
        index++;
        currentKey = `${key}${index}`;
    }
    return sessionStorage.setItem(currentKey, JSON.stringify({ token, id, expire }));
};

export const allStorage = () => {
    let i = 1;
    const allTransactionData = [];
  
    while (i <= 10) {
        const currentKey = `transaction${i}`;
        const item = JSON.parse(sessionStorage.getItem(currentKey));
        const defaultValues = { currentKey, token: null, id: null, expire: null };
        allTransactionData.push(item ? { ...defaultValues, ...item } : defaultValues);
    
        i++;
    }

    const allData = allTransactionData.map((i) => { return i })
    return allData
}

export const validStorage = () => {
    const data = allStorage();
    const now = new Date().getTime();
    const valid = data.filter((i) => now < i.expire)
    return valid
}

export const expireStorage = () => {
    const data = allStorage()
    const now = new Date().getTime()
    const expire = data.filter((i) => now > i.expire)
    return expire
}