export type FormValues = {
  password: string;
  username: string;
  url: string;
};

export type ClockInTypes = "clockIn" | "clockOut" | "login";

export interface IStartColockinArgs {
  clockIn: ClockInTypes;
  data: FormValues;
  password: string;
}
