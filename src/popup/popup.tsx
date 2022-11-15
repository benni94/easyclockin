import { clockerClicked, formValuesDefaults, savings } from "../functions/savingData";
import { ClockInTypes, FormValues } from "./popup.types";
import { Collapse } from "../components/collapse/collapse";
import { DefaultButton } from "../components/defaultButton/defaultButton";
import { Divider } from "@mui/material";
import { navigateToUrl, getCurrentUrl } from "../functions/chrome";
import { linkToPage, renderClockIn, renderClockInHomeOffice } from "../functions/renderClockIn";
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAlert } from "react-alert";
import AddIcon from '@mui/icons-material/Add';
import React, { useCallback, useEffect, useState } from "react";
import RemoveIcon from '@mui/icons-material/Remove';
import { Input } from "../components/Input/input";
import "./popup.css";

export const Popup: React.FC<{ appWidth: (size: number) => void }> = ({ appWidth }) => {
  const { register, handleSubmit, formState: { isDirty, isValid }, reset, getValues } = useForm<FormValues>({ mode: "onChange" });
  const onSubmit: SubmitHandler<FormValues> = result => savings().toLocalStorage(result);
  const [onLoginUrl, setOnLoginUrl] = useState(false);
  const [clockedIn, setClockedIn] = useState(clockerClicked().getDataFromLocalStorage());
  const alert = useAlert();

  useEffect(() => {
    getCurrentUrl().then((currentUrl) => {
      currentUrl === linkToPage ? setOnLoginUrl(true) : setOnLoginUrl(false);
    })
  }, []);

  const navigate = useCallback(() => {
    navigateToUrl(linkToPage);
  }, []);

  const clear = useCallback(() => {
    reset(formValuesDefaults);
    savings().removeFromLocalStorage();
    alert.error("Clear executed!");
  }, [alert, reset]);

  const switcher = useCallback((shouldChange: boolean) => {
    if (shouldChange) {
      const clicked = clockedIn === "clockIn" ? "clockOut" : "clockIn";
      setClockedIn(clicked);
      clockerClicked().toLocalStorage(clicked);
    }
  }, [clockedIn]);

  const clockInClockOut = useCallback((clockIn: ClockInTypes) => {
    const args = savings().getDataFromLocalStorage();
    renderClockIn(clockIn, args.username, getValues().password);
    if (clockIn !== "login") clockerClicked().toLocalStorage(clockedIn === "clockIn" ? "clockOut" : "clockIn");
  }, [clockedIn, getValues]);

  const homeOfficeClockInClockOut = useCallback((clockIn: ClockInTypes) => {
    const args = savings().getDataFromLocalStorage();
    renderClockInHomeOffice(clockIn, args.username, getValues().password);
    if (clockIn !== "login") clockerClicked().toLocalStorage(clockedIn === "clockIn" ? "clockOut" : "clockIn");
  }, [clockedIn, getValues]);

  return (
    <>
      <Collapse
        appWidth={appWidth}
        defaultClosed={savings().getDataFromLocalStorage().username.length > 1}
        collapsedIcon={<AddIcon />}
        openIcon={<RemoveIcon />}
        labelCollapsed="Settings:"
        labelOpen="Settings:"
        collapsedWidth={220}
        openWidth={220}
        style={{ paddingTop: "15px" }}
        content={
          <div className="collapseContent">
            {/*  <Collapse
                appWidth={appWidth}
                collapsedWidth={220}
                collapsedIcon={<SettingsIcon />}
                openIcon={<SettingsSuggestIcon />}
                openWidth={600}
                content={
                  <>
                     <InputAdvanced
                      register={register}
                    />
                    <Divider
                      style={{ marginLeft: "30px", marginRight: "30px" }}
                      sx={{ height: 20, m: 0.5 }}
                      orientation="horizontal" />
                  </>
                }
                labelCollapsed="Advanced:"
                labelOpen="Advanced:"
              /> */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="usernameWrapper">
                <Input
                  {...(register("username"))}
                  id="username"
                  defaultValue={savings().getDataFromLocalStorage().username}
                  label="Username:"
                  variant="standard"
                  width={150}
                />
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
                  onClick={() => alert.success("Set executed!")}
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
      <div className="buttonExecuteWrapper">
        {onLoginUrl ?
          <>
            <div className="bottomElementsWrapper">
              <Input
                {...(register("password"))}
                autoFocus={true}
                id="password"
                onKeyDown={(e) => { if (e.key === "Enter") { clockInClockOut(clockedIn === "clockIn" ? "clockIn" : "clockOut") } }}
                label="Password:"
                variant="standard"
                type={"password"}
                width={150}
              />
              <div className="bottomActionButtonWrapper">
                {
                  clockedIn === "clockIn" ?
                    <DefaultButton
                      color="success"
                      onClick={() => clockInClockOut("clockIn")}
                      style={{ minWidth: "130px", maxWidth: "130px" }}
                      title="Clock in"
                      variant="outlined"
                    /> :
                    <DefaultButton
                      color="secondary"
                      onClick={() => clockInClockOut("clockOut")}
                      style={{ minWidth: "130px", maxWidth: "130px" }}
                      title="Clock out"
                      variant="outlined"
                    />
                }
                <DefaultButton
                  color="info"
                  onClick={() => switcher(true)}
                  style={{ minWidth: "10px", maxWidth: "10px" }}
                  variant="text"
                  title="↔️"
                />
              </div>
              <div className="bottomActionButtonWrapper">
                {
                  clockedIn === "clockIn" ?
                    <DefaultButton
                      color="success"
                      onClick={() => homeOfficeClockInClockOut("clockIn")}
                      style={{ minWidth: "160px", maxWidth: "160px", padding: "10px" }}
                      title="Homeoffice in"
                      variant="outlined"
                    /> :
                    <DefaultButton
                      color="secondary"
                      onClick={() => homeOfficeClockInClockOut("clockOut")}
                      style={{ minWidth: "160px", maxWidth: "160px", padding: "10px" }}
                      title="Homeoffice out"
                      variant="outlined"
                    />
                }
              </div>
              <DefaultButton
                onClick={() => clockInClockOut("login")}
                style={{ minWidth: "160px", maxWidth: "160px" }}
                title="Only login"
                variant="outlined"
              />
            </div>
          </>
          :
          <DefaultButton
            onClick={navigate}
            style={{ marginTop: "15px" }}
            title="Go to page"
            variant="contained"
          />
        }
      </div>
      {/*  <div className="boxWrapper">
        <Box
          checked={checkBoxClicked().getDataFromLocalStorage()}
          label="Close page after progress"
          onChange={e => checkBoxClicked().toLocalStorage(e.target.checked)} />
      </div> */}
    </>
  );
};
