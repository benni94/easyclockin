import { FormValues } from './../popup/popup';

export const chromeLocalStorageItem = "savings";

/* export const formValuesDefaults: FormValues = {
    clockIn: "Kommt",
    clockOut: "Geht",
    htmlButton: "submit",
    htmlPassword: "PINCODE",
    htmlUsername: "AUSWEISNR",
    linkToPage: "http://s-at00-163.meusburger-norm.com/s-at00-162_cwpdb1_cronet/!MAServ.MAServ_Main",
    password: "",
    username: ""
} */

export const formValuesDefaults: FormValues = {
    clockIn: "The shore",
    clockOut: "Walking",
    htmlButton: "submit",
    htmlPassword: "pass",
    htmlUsername: "uname",
    linkToPage: "http://testphp.vulnweb.com/login.php",
    password: "",
    username: "",
}

export const savings = () => {

    const toLocalStorage = (data: FormValues) => {
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



