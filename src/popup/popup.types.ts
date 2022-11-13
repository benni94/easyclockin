
export type FormValues = {
    password?: string;
    username: string;
};

export type ClockInTypes = "clockIn" | "clockOut" | "login";

export interface IStartColockinArgs {
    clockIn: ClockInTypes;
    data: FormValues;
    password: string;
}
