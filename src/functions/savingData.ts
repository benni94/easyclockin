import { FormValues } from './../popup/popup';

export const chromelocalStorageItem = "savings";

export const formValuesDefaults: FormValues = {
    htmlButton: "Submit",
    htmlPassword: "PINCODE",
    htmlUsername: "AUSWEISNR",
    linkToPage: "http://s-at00-163.meusburger-norm.com/s-at00-162_cwpdb1_cronet/!MAServ.MAServ_Main",
    password: "",
    username: ""
}
/* export const formValuesDefaults: FormValues = {
    htmlButton: "input",
    htmlPassword: "pass",
    htmlUsername: "uname",
    linkToPage: "http://testphp.vulnweb.com/login.php",
    password: "",
    username: ""
} */

export const savings = (data?: FormValues) => {

    const toLocalStorage = () => {
        return localStorage.setItem(chromelocalStorageItem, JSON.stringify(data));
    }

    const removeFromLocalStorage = () => {
        localStorage.removeItem(chromelocalStorageItem);
    }

    const getDataFromLocalStorage: () => FormValues = () => {
        const items = localStorage.getItem(chromelocalStorageItem);
        if (!items) return formValuesDefaults;
        return JSON.parse(items);
    }

    return { data, getDataFromLocalStorage, removeFromLocalStorage, toLocalStorage };
};


