import { FormValues } from './../popup/popup';

export const chromeLocalStorageItem = "savings";
const switcherLocalStorageItem = "switcher";

export const formValuesDefaults: FormValues = {
    htmlButton: "submit",
    htmlPassword: "PINCODE",
    htmlUsername: "AUSWEISNR",
    linkToPage: "http://s-at00-163.meusburger-norm.com/s-at00-162_cwpdb1_cronet/!MAServ.MAServ_Main",
    password: "",
    username: ""
}
/* export const formValuesDefaults: FormValues = {
    htmlButton: "submit",
    htmlPassword: "pass",
    htmlUsername: "uname",
    linkToPage: "http://testphp.vulnweb.com/login.php",
    password: "",
    username: "",
} */

export const savings = (data?: FormValues) => {
    const toLocalStorage = () => {
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

    return { data, getDataFromLocalStorage, removeFromLocalStorage, toLocalStorage };
};

export const switcherSavings = (switcherState?: boolean) => {
    const toLocalStorage = () => {
        return localStorage.setItem(switcherLocalStorageItem, JSON.stringify(switcherState));
    }

    const getDataFromLocalStorage: () => boolean = () => {
        const items = localStorage.getItem(switcherLocalStorageItem);
        if (!items) return false;
        return JSON.parse(items);
    }

    return { getDataFromLocalStorage, toLocalStorage };
}


