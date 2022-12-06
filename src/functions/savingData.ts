type ISavings = "checkbox" | "clocker" | "username" | "slider";

const chromeLocalStorageItem: ISavings = "username";

export const username = () => {
    const toLocalStorage = (username: string) => {
        if (!username || username === "") {
            const dataFromLocalStorrage = getDataFromLocalStorage();
            if (dataFromLocalStorrage === undefined) {
                return localStorage.setItem(chromeLocalStorageItem, JSON.stringify(username));
            }
            return localStorage.setItem(chromeLocalStorageItem, JSON.stringify(username));
        }
        return localStorage.setItem(chromeLocalStorageItem, JSON.stringify(username));
    }

    const removeFromLocalStorage = () => {
        localStorage.clear();
    }

    const getDataFromLocalStorage: () => string = () => {
        const items = localStorage.getItem(chromeLocalStorageItem);
        if (!items) return "";
        return JSON.parse(items);
    }

    return { getDataFromLocalStorage, removeFromLocalStorage, toLocalStorage };
};

export const clockerSavings = (storrageItem: ISavings, fallbackReturn: string | boolean) => {
    const toLocalStorage = (data: string | boolean) => {
        return localStorage.setItem(storrageItem, JSON.stringify(data));
    }

    const getDataFromLocalStorage = () => {
        const items = localStorage.getItem(storrageItem);
        if (typeof fallbackReturn === "string") {
            if (!items) return fallbackReturn;
            return JSON.parse(items);
        }
        return JSON.parse(items || "false");
    }

    return { toLocalStorage, getDataFromLocalStorage };
}

