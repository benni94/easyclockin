
export type FormValues = {
    clockIn: string;
    clockOut: string;
    htmlButton: string;
    htmlPassword: string;
    htmlUsername: string;
    linkToPage: string;
    password?: string;
    username: string;
};

export type ClockInTypes = "clockIn" | "clockOut" | "login";

export interface IStartColockinArgs {
    clockIn: ClockInTypes;
    data: FormValues;
    password: string;
}
