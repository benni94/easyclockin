import { UseFormRegister } from "react-hook-form";
import { FormValues } from "./popup.types";

interface InputAdvancedProps {
    register: UseFormRegister<FormValues>;
}

interface IPopupRender {
    autoFocus?: boolean,
    defaultValue?: string;
    id: string;
    label: string;
    margin?: "none" | "dense" | "normal" | undefined;
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
    register: keyof FormValues;
    type?: React.InputHTMLAttributes<unknown>['type'];
    variant?: 'standard' | 'outlined' | 'filled';
    width?: number;
}
/* 
const popupRender: IPopupRender[] = [
    {
        defaultValue: savings().getDataFromLocalStorage().linkToPage,
        id: "linkToPage",
        label: "Link to clock in page:",
        margin: "dense",
        register: "clockIn",
        variant: "standard",
        width: 420,
    },
    {
        defaultValue: savings().getDataFromLocalStorage().htmlUsername,
        id: "htmlUsername",
        label: "Username Html - name:",
        margin: "normal",
        register: "htmlUsername",
        variant: "standard",
        width: 420,
    },
    {
        defaultValue: savings().getDataFromLocalStorage().htmlPassword,
        id: "htmlPassword",
        label: "Password Html - name:",
        margin: "dense",
        register: "htmlPassword",
        variant: "standard",
        width: 420,
    },
    {
        defaultValue: savings().getDataFromLocalStorage().htmlButton,
        id: "htmlButton",
        label: "Button Html - value:",
        margin: "dense",
        register: "htmlButton",
        variant: "standard",
        width: 420,
    },
    {
        defaultValue: savings().getDataFromLocalStorage().htmlIframeClockIn,
        id: "htmlIframe",
        label: "Iframe in Html - name:",
        margin: "normal",
        register: "htmlIframeClockIn",
        variant: "standard",
        width: 420,
    },
    {
        defaultValue: savings().getDataFromLocalStorage().clockIn,
        id: "linkToCome",
        label: "Clock in Html - textContent:",
        margin: "normal",
        register: "clockIn",
        variant: "standard",
        width: 420,
    },
    {
        defaultValue: savings().getDataFromLocalStorage().clockOut,
        id: "linkToGo",
        label: "Clock out Html - textContent:",
        margin: "dense",
        register: "clockOut",
        variant: "standard",
        width: 420,
    }
]

export const InputAdvanced: React.FC<InputAdvancedProps> = ({ register }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {popupRender.map((popup) =>
                <div style={{ paddingTop: "10px" }}>
                    <Input
                        {...(register(popup.register))}
                        {...popup}
                    />
                </div>
            )}
        </div >
    )
};

export const SmallInput: React.FC<InputAdvancedProps & { rand: IPopupRender }> = (props) => {
    const { rand, rand: { variant = "standard", width = 150 }, register } = props;

    return (
        <Input
            {...(register(rand.register))}
            variant={variant}
            width={width}
            {...rand}
        />
    )
};
 */