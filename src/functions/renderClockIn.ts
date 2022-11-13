import { executeClockin } from "./chrome";
import { ClockInTypes } from "../popup/popup.types";

export const linkToPage = "http://s-at00-163.meusburger-norm.com/s-at00-162_cwpdb1_cronet/!MAServ.MAServ_Main";

export const renderClockIn = (clockIn: ClockInTypes, username: string, password?: string) => {
    executeClockin(
        [
            {
                func: "value",
                htmlElement: "input",
                textContent: "AUSWEISNR",
                textPlacement: "name",
                value: username
            },
            {
                func: "value",
                htmlElement: "input",
                textContent: "PINCODE",
                textPlacement: "name",
                value: password || ""
            },
            {
                func: "click",
                htmlElement: "input",
                textContent: "Anmeldung",
                textPlacement: "value"
            }
        ],
        [

            {
                disabled: clockIn === "login",
                func: "click",
                htmlIframe: "Menue",
                htmlElement: "a",
                textContent: clockIn === "clockIn" ? "Kommt" : "Geht",
                textPlacement: "textContent"
            },

        ]
    )
}

export function renderClockInHomeOffice(clockIn: ClockInTypes, username: string, password?: string) {
    executeClockin(
        [
            {
                func: "value",
                htmlElement: "input",
                textContent: "AUSWEISNR",
                textPlacement: "name",
                value: username
            },
            {
                func: "value",
                htmlElement: "input",
                textContent: "PINCODE",
                textPlacement: "name",
                value: password || ""
            },
            {
                func: "click",
                htmlElement: "input",
                textContent: "Anmeldung",
                textPlacement: "value"
            }
        ],
        [

            {
                disabled: clockIn === "login",
                func: "click",
                htmlIframe: "Menue",
                htmlElement: "a",
                textContent: clockIn === "clockIn" ? "Kommt mit Grund" : "Geht mit Grund",
                textPlacement: "textContent",
            },
        ],
        [
            {
                disabled: clockIn === "login",
                func: "select",
                htmlIframe: "Funktion",
                htmlElement: "select",
                textContent: "MGKZ",
                textPlacement: "name",
                value: "1"
            },
            {
                disabled: clockIn === "login",
                func: "click",
                htmlIframe: "Funktion",
                htmlElement: "input",
                textContent: "OK",
                textPlacement: "value",
            },
        ],
    )
}



export const linkToPageTest = "http://testphp.vulnweb.com/login.php";
export function renderClockInHomeOfficeTest(clockIn: ClockInTypes, username: string, password?: string) {
    executeClockin(
        [
            {
                func: "value",
                htmlElement: "input",
                textContent: "uname",
                textPlacement: "name",
                value: username
            },
            {
                func: "value",
                htmlElement: "input",
                textContent: "pass",
                textPlacement: "name",
                value: password || ""
            },
            {
                func: "click",
                htmlElement: "input",
                textContent: "login",
                textPlacement: "value"
            }
        ],
        [
            {
                disabled: clockIn === "login",
                func: "click",
                htmlElement: "a",
                textContent: "artists",
                textPlacement: "textContent",
            },
        ],
        [
            {
                func: "click",
                htmlElement: "a",
                textContent: "guestbook",
                textPlacement: "textContent",
            },
        ]
    )
}