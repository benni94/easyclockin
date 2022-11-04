import { Input } from "../components/Input/input";
import { UseFormRegister } from "react-hook-form";
import { savings } from "../functions/savingData";
import { FormValues } from "./popup.types";

interface InputAdvancedProps {
    register: UseFormRegister<FormValues>
}

export const InputAdvanced: React.FC<InputAdvancedProps> = (props) => {
    const { register } = props;
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Input
                {...(register("linkToPage"))}
                width={420}
                defaultValue={savings().getDataFromLocalStorage().linkToPage}
                label="Link to clock in page:"
                variant="standard"
                id="linkToPage"
            />
            <Input
                {...register("htmlUsername")}
                width={420}
                margin="normal"
                defaultValue={savings().getDataFromLocalStorage().htmlUsername}
                label="Username Html - name:"
                variant="standard"
                id="htmlUsername"
            />
            <Input
                {...register("htmlPassword")}
                width={420}
                margin="dense"
                defaultValue={savings().getDataFromLocalStorage().htmlPassword}
                label="Password Html - name:"
                variant="standard"
                id="htmlPassword"
            />
            <Input
                {...register("htmlButton")}
                width={420}
                margin="dense"
                defaultValue={savings().getDataFromLocalStorage().htmlButton}
                label="Button Html - value:"
                variant="standard"
                id="htmlButton"
            />
            <Input
                {...(register("htmlIframe"))}
                width={420}
                margin="normal"
                defaultValue={savings().getDataFromLocalStorage().htmlIframe}
                label="Iframe in Html - name:"
                variant="standard"
                id="htmlIframe"
            />
            <Input
                {...(register("clockIn"))}
                width={420}
                margin="normal"
                defaultValue={savings().getDataFromLocalStorage().clockIn}
                label="Clock in Html - textContent:"
                variant="standard"
                id="linkToCome"
            />
            <Input
                {...(register("clockOut"))}
                width={420}
                margin="dense"
                defaultValue={savings().getDataFromLocalStorage().clockOut}
                label="Clock out Html - textContent:"
                variant="standard"
                id="linkToGo"
            />
        </div >
    )
};
