import { Divider } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Collapse } from "../components/collapse/collapse";
import { DefaultButton } from "../components/defaultButton/defaultButton";
import { Input } from "../components/Input/input";
import { navigateToUrl, startClocking, getCurrentUrl } from "../functions/chrome";
import "./popup.css";
import { SubmitHandler, useForm } from 'react-hook-form';
import { clockerClicked, formValuesDefaults, savings } from "../functions/savingData";

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

const Popup: React.FC<{ appWidth: (size: number) => void }> = ({ appWidth }) => {
  const { register, handleSubmit, formState: { isDirty, isValid }, reset, getValues } = useForm<FormValues>({ mode: "onChange" });
  const onSubmit: SubmitHandler<FormValues> = result => savings().toLocalStorage(result);
  const [onLoginUrl, setOnLoginUrl] = useState(false);
  const [clockedIn, setClockedIn] = useState(clockerClicked().getDataFromLocalStorage());

  useEffect(() => {
    getCurrentUrl().then((currentUrl) => {
      currentUrl === savings().getDataFromLocalStorage().linkToPage ? setOnLoginUrl(true) : setOnLoginUrl(false);
    })
  }, []);

  const navigate = useCallback(() => {
    navigateToUrl(savings().getDataFromLocalStorage().linkToPage);
  }, []);

  const clockInClockOut = useCallback((clockIn: boolean) => {
    startClocking(savings().getDataFromLocalStorage(), clockIn, getValues().password || "");
    const clicked = clockedIn === "clockIn" ? "clockOut" : "clockIn";
    clockerClicked().toLocalStorage(clicked);
    setClockedIn(clicked);
  }, [clockedIn, getValues]);

  const clear = useCallback(() => {
    reset(formValuesDefaults);
    savings().removeFromLocalStorage();
  }, [reset]);


  const switcher = useCallback(() => {
    const clicked = clockedIn === "clockIn" ? "clockOut" : "clockIn";
    clockerClicked().toLocalStorage(clicked);
    setClockedIn(clicked);
  }, [clockedIn]);



  return (
    <div>
      <br />
      <div>
        <Collapse
          appWidth={appWidth}
          labelCollapsed="Settings: ➕"
          labelOpen="Settings: ➖"
          collapsedWidth={220}
          openWidth={220}
          content={
            <div className="collapseContent">

              <form onSubmit={handleSubmit(onSubmit)}>
                <Collapse
                  appWidth={appWidth}
                  collapsedWidth={220}
                  openWidth={600}
                  content={
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Input
                        {...(register("linkToPage"))}
                        width={420}
                        defaultValue={savings().getDataFromLocalStorage().linkToPage}
                        label="Link to clocking page:"
                        variant="standard"
                        id="linkToPage"
                      />
                      <Input
                        {...(register("clockIn"))}
                        width={170}
                        margin="normal"
                        defaultValue={savings().getDataFromLocalStorage().clockIn}
                        label="Name of clock in elementt:"
                        variant="standard"
                        id="linkToCome"
                      />
                      <Input
                        {...(register("clockOut"))}
                        width={170}
                        margin="dense"
                        defaultValue={savings().getDataFromLocalStorage().clockOut}
                        label="Name of clock out element:"
                        variant="standard"
                        id="linkToGo"
                      />
                      <Input
                        {...register("htmlUsername")}
                        width={170}
                        margin="dense"
                        defaultValue={savings().getDataFromLocalStorage().htmlUsername}
                        label="Html Element Username:"
                        variant="standard"
                        id="htmlUsername"
                      />
                      <Input
                        {...register("htmlPassword")}
                        width={170}
                        margin="dense"
                        defaultValue={savings().getDataFromLocalStorage().htmlPassword}
                        label="Html Element Password:"
                        variant="standard"
                        id="htmlPassword"
                      />
                      <Input
                        {...register("htmlButton")}
                        width={170}
                        margin="dense"
                        defaultValue={savings().getDataFromLocalStorage().htmlButton}
                        label="Html Element Button:"
                        variant="standard"
                        id="htmlButton"
                      />
                    </div>
                  }
                  labelCollapsed="Advanced ⚙️"
                  labelOpen="⚙️"
                />

                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: "20px" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className="inputStyle">
                      <Input
                        {...register("username", { required: true })}
                        defaultValue={savings().getDataFromLocalStorage().username}
                        label="Username:"
                        variant="standard"
                        id="username"
                        width={118}
                      />
                    </div>
                  </div>

                </div>
                <div className="setResetWrapper">
                  <DefaultButton
                    onClick={clear}
                    title="Clear"
                    color="error"
                    variant="outlined"
                  />
                  <DefaultButton
                    type="submit"
                    title="Set"
                    variant="outlined"
                    disabled={!isDirty || !isValid}
                  />
                </div>
                <Divider
                  style={{ marginLeft: "30px", marginRight: "30px" }}
                  sx={{ height: 20, m: 0.5 }}
                  orientation="horizontal" />
              </form>
            </div >
          }
        />
      </div >
      <div className="buttonExecuteWrapper">
        {onLoginUrl ?
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
              <Input
                autoFocus
                {...register("password")}
                width={118}
                label="Password:"
                type="password"
                variant="standard"
                id="password"
              />
              <div style={{ flexDirection: "row", gap: "10px" }}>
                {clockedIn === "clockIn" ? <DefaultButton
                  color="success"
                  onClick={() => clockInClockOut(true)}
                  title="Clock in"
                  variant="outlined"
                  disabled={!isDirty}
                /> :
                  <DefaultButton
                    color="secondary"
                    onClick={() => clockInClockOut(false)}
                    title="Clock out"
                    variant="outlined"
                    disabled={!isDirty}
                  />}
                <DefaultButton
                  color="secondary"
                  onClick={switcher}
                  variant="outlined"
                  title="↔️"
                />
              </div>
            </div>
          </>
          :
          <DefaultButton
            onClick={navigate}
            title="Go to url"
            variant="contained"
          />
        }

      </div>
    </div >
  );
};

export { Popup };
