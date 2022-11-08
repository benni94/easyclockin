import { executeClockin } from "../functions/chrome";
import { ClockInTypes, FormValues } from "./popup.types";

export const renderClockIn = (args: FormValues, clockIn: ClockInTypes, password?: string) => {
    executeClockin(
        [
            {
                func: "value",
                htmlElement: "input",
                textContent: args.htmlUsername,
                textPlacement: "name",
                value: args.username
            },
            {
                func: "value",
                htmlElement: "input",
                textContent: args.htmlPassword,
                textPlacement: "name",
                value: password || ""
            },
            {
                func: "click",
                htmlElement: "input",
                textContent: args.htmlButton,
                textPlacement: "value"
            }
        ],
        [
            {
                disabled: clockIn === "login",
                func: "click",
                htmlIframe: args.htmlIframe,
                htmlElement: "a",
                textContent: clockIn === "clockIn" ? args.clockIn : args.clockOut,
                textPlacement: "textContent"
            },
        ],
    )
}