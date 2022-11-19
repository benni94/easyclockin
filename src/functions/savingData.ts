import { FormValues } from "../popup/popup.types";

type ISavings = "checkbox" | "clocker" | "savings" | "slider";

const chromeLocalStorageItem: ISavings = "savings";

export const formValuesDefaults: FormValues = {
    username: "",
}

export const savings = () => {
    const toLocalStorage = (data: FormValues) => {
        if (!data.username || data.username === "") {
            const dataFromLocalStorrage = getDataFromLocalStorage();
            if (dataFromLocalStorrage === undefined) {
                return localStorage.setItem(chromeLocalStorageItem, JSON.stringify({ ...formValuesDefaults, username: data.username }));
            }
            return localStorage.setItem(chromeLocalStorageItem, JSON.stringify({ ...dataFromLocalStorrage, username: data.username }));
        }
        return localStorage.setItem(chromeLocalStorageItem, JSON.stringify(data));
    }

    const removeFromLocalStorage = () => {
        localStorage.removeItem(chromeLocalStorageItem);
    }

    const getDataFromLocalStorage: () => FormValues = () => {
        const items = localStorage.getItem(chromeLocalStorageItem);
        if (!items) return formValuesDefaults;
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

