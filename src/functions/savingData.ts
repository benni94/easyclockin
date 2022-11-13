import { FormValues } from "../popup/popup.types";

export const chromeLocalStorageItem = "savings";
export const clockerClickedState = "clocker";
export type Clocker = "clockIn" | "clockOut";

/* export const formValuesDefaults: FormValues = {
    clockIn: "Kommt",
    clockOut: "Geht",
    htmlButton: "Anmeldung",
    htmlIframeClockIn: "Menue",
    htmlIframeClockIn2: "Funktion",
    htmlPassword: "PINCODE",
    htmlUsername: "AUSWEISNR",
    homeofficeClockIn: "Kommt mit Grund",
    homeofficeClockOut: "Geht mit Grund",
    linkToPage: "http://s-at00-163.meusburger-norm.com/s-at00-162_cwpdb1_cronet/!MAServ.MAServ_Main",
    username: ""
} */

/* export const formValuesDefaults: FormValues = {
    clockIn: "guestbook",
    clockOut: "Logout",
    homeofficeClockIn: "categories",
    homeofficeClockOut: "Logout",
    htmlButton: "login",
    htmlPassword: "pass",
    htmlUsername: "uname",
    linkToPage: "http://testphp.vulnweb.com/login.php",
    username: "",
} */

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

export const clockerClicked = () => {

    const toLocalStorage = (data: Clocker) => {
        return localStorage.setItem(clockerClickedState, JSON.stringify(data));
    }

    const getDataFromLocalStorage: () => Clocker = () => {
        const items = localStorage.getItem(clockerClickedState);
        if (!items) return "clockIn";
        return JSON.parse(items);
    }

    return { toLocalStorage, getDataFromLocalStorage };
}

