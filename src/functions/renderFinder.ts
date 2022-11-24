import { ClockInTypes } from "../popup/popup.types";
import { executeClockin } from "./chrome";

export interface FinderArgs {
    /**
     * Disable the finder function and return instantly true.
     */
    disabled?: boolean;
    /**
     * The function which should be executed.
     */
    func: 'click' | 'select' | 'value';
    /**
     * The type of the html element like a or div.
     */
    htmlElement: keyof HTMLElementTagNameMap;
    /**
     * The iframe name, if the seccond page is wrapped in one.
     */
    htmlIframe?: string;
    /**
     * The inline text of the html element.
     */
    textContent: string;
    /**
     * Differs between the differen places of the inline text. textContent is the inline variant.
     */
    textPlacement: keyof HTMLInputElement;
    /**
     * The value is used to replace the inline textContent with the given value.
     */
    value?: string;
}

/**
 * This is a function to find a html element with the specific type and specific (no difference or shorts) 
 * inline text.
 */
export const findAndExecuteInDom = (args: FinderArgs[] | undefined) => {
    if (!args || args[0].disabled) return true;
    args.forEach((arg, i) => {
        // if the document elements are in an iFrame, the name of the iFrames is used to find it and then search in it for the document elements
        let doc = arg.htmlIframe?.length ?
            (window as any).frames[arg.htmlIframe].document.querySelectorAll(arg.htmlElement) :
            document.querySelectorAll(arg.htmlElement);

        let matches = Array.prototype.slice.call(doc);

        const filterElements = (element: HTMLInputElement) => {
            return element[arg.textPlacement]?.toString().includes(arg.textContent);
        }

        if (arg.func === "value") {
            matches.filter(filterElements)[0][arg.func] = arg.value;
            if (i === args.length) return true;
        }
        if (arg.func === "click") {
            matches.filter(filterElements)[0].click();
        }
        if (arg.func === "select") {
            matches.filter(filterElements)[0].selectedIndex = arg.value;
        }
    })
    return true;
    // necessary for the next step in chrome scripts if needed
}

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
                value: password || "",
            },
            {
                func: "click",
                htmlElement: "input",
                textContent: "Anmeldung",
                textPlacement: "value"
            }
        ],
        [
            [
                {
                    disabled: clockIn === "login",
                    func: "click",
                    htmlElement: "a",
                    htmlIframe: "Menue",
                    textContent: clockIn === "clockIn" ? "Kommt" : "Geht",
                    textPlacement: "textContent"
                },
            ]
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
            [
                {
                    disabled: clockIn === "login",
                    func: "click",
                    htmlElement: "a",
                    htmlIframe: "Menue",
                    textContent: clockIn === "clockIn" ? "Kommt mit Grund" : "Geht mit Grund",
                    textPlacement: "textContent",
                },
            ],
            [
                {
                    disabled: clockIn === "login",
                    func: "select",
                    htmlElement: "select",
                    htmlIframe: "Funktion",
                    textContent: "MGKZ",
                    textPlacement: "name",
                    value: "1"
                },
                {
                    disabled: clockIn === "login",
                    func: "click",
                    htmlElement: "input",
                    htmlIframe: "Funktion",
                    textContent: "OK",
                    textPlacement: "value",
                },
            ],
        ]
    )
}


// for testing remove the T after the const and function below
export const linkToPageT = "http://testphp.vulnweb.com/login.php";
export function renderClockInHomeOfficeT(clockIn: ClockInTypes, username: string, password?: string) {
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
            ],
            [
                {
                    func: "click",
                    htmlElement: "a",
                    textContent: "AJAX",
                    textPlacement: "textContent",
                },
            ],
            [
                {
                    func: "click",
                    htmlElement: "a",
                    textContent: "setcookie",
                    textPlacement: "textContent",
                },
                {
                    func: "click",
                    htmlElement: "a",
                    textContent: "send",
                    textPlacement: "textContent",
                },
            ]
        ]
    )
}