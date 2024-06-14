const Store = {
    set: (key: string, value: any,) => {
        localStorage.setItem(key, JSON.stringify(value));
    },

    get: (key: string) => {
        const s = localStorage.getItem(key);
        return s ? JSON.parse(s) : null;
    },
}

export default Store;
