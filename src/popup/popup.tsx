import { clockerSavings, username } from "../functions/savingData";
import { ClockInTypes, FormValues } from "./popup.types";
import { Collapse } from "../components/collapse/collapse";
import { DefaultButton } from "../components/defaultButton/defaultButton";
import { Divider, Slider } from "@mui/material";
import { navigateToUrl, getCurrentUrl } from "../functions/chrome";
import { linkToPage, renderClockIn, renderClockInHomeOffice } from "../functions/renderFinder";
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAlert } from "react-alert";
import AddIcon from '@mui/icons-material/Add';
import React, { useCallback, useEffect, useState } from "react";
import RemoveIcon from '@mui/icons-material/Remove';
import { Input } from "../components/Input/input";
import "./popup.css";
import { Box } from "../components/checkbox/box";

export const Popup: React.FC<{ appWidth: (size: number) => void }> = ({ appWidth }) => {
  const { register, handleSubmit, formState: { isDirty, isValid }, reset, getValues } = useForm<FormValues>({ mode: "onChange" });
  const onSubmit: SubmitHandler<FormValues> = result => username().toLocalStorage(result.username);
  const [onLoginUrl, setOnLoginUrl] = useState(false);
  const [clockedIn, setClockedIn] = useState(clockerSavings("clocker", "clockIn").getDataFromLocalStorage());
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
    reset({ username: "" });
    username().removeFromLocalStorage();
    window.location.reload();
  }, [reset]);

  const switcher = useCallback((shouldChange: boolean) => {
    if (shouldChange) {
      const clicked = clockedIn === "clockIn" ? "clockOut" : "clockIn";
      setClockedIn(clicked);
      clockerSavings("clocker", "clockIn").toLocalStorage(clicked);
    }
  }, [clockedIn]);

  const clockInClockOut = useCallback((clockIn: ClockInTypes) => {
    const args = username().getDataFromLocalStorage();
    renderClockIn(clockIn, args, getValues().password);
    if (clockIn !== "login") clockerSavings("clocker", "clockIn").toLocalStorage(clockedIn === "clockIn" ? "clockOut" : "clockIn");
  }, [clockedIn, getValues]);

  const homeOfficeClockInClockOut = useCallback((clockIn: ClockInTypes) => {
    const args = username().getDataFromLocalStorage();
    renderClockInHomeOffice(clockIn, args, getValues().password);
    if (clockIn !== "login") clockerSavings("clocker", "clockIn").toLocalStorage(clockedIn === "clockIn" ? "clockOut" : "clockIn");
  }, [clockedIn, getValues]);

  return (
    <>
      <Collapse
        appWidth={appWidth}
        defaultClosed={username().getDataFromLocalStorage().length > 1}
        collapsedIcon={<AddIcon />}
        openIcon={<RemoveIcon />}
        labelCollapsed="Settings:"
        labelOpen="Settings:"
        collapsedWidth={220}
        openWidth={220}
        style={{ paddingTop: "15px" }}
        content={
          <div className="collapseContent">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="usernameWrapper">
                <Input
                  {...(register("username"))}
                  autoFocus={username().getDataFromLocalStorage().length === 0}
                  id="username"
                  defaultValue={username().getDataFromLocalStorage()}
                  label="Username:"
                  variant="standard"
                  width={150}
                />
              </div>
              <div className="setResetWrapper">
                <DefaultButton
                  type="submit"
                  title="Set"
                  onClick={() => alert.success("Set executed!")}
                  variant="outlined"
                  disabled={!isDirty || !isValid}
                />
                <DefaultButton
                  onClick={clear}
                  title="Clear"
                  color="error"
                  variant="outlined"
                />
              </div>
              <div className="boxSliderWrapper">
                <Box
                  color="secondary"
                  checked={clockerSavings("checkbox", false).getDataFromLocalStorage()}
                  fontSize="15px"
                  label="Close page in s:"
                  style={{ alignItems: "center", display: "flex", paddingTop: 20 }}
                  onChange={e => clockerSavings("checkbox", false).toLocalStorage(e.target.checked)} />
                <Slider
                  color="secondary"
                  defaultValue={clockerSavings("slider", "").getDataFromLocalStorage() || 3}
                  marks
                  max={6}
                  min={0}
                  step={1}
                  style={{ width: "160px" }}
                  onChange={(_, v) => clockerSavings("slider", "").toLocalStorage(v.toString())}
                  valueLabelDisplay="auto"
                />
              </div>
              <Divider
                style={{ marginLeft: "30px", marginRight: "30px", marginTop: "10px" }}
                sx={{ height: 0, m: 0.5 }}
                orientation="horizontal" />
            </form>
          </div >
        }
      />
      <div className="buttonExecuteWrapper">
        {onLoginUrl ?
          <>
            <div className="bottomElementsWrapper">
              <div className="bottomActionButtonWrapper">
                <Input
                  {...(register("password"))}
                  autoFocus={username().getDataFromLocalStorage().length > 1}
                  id="password"
                  onKeyDown={(e) => { if (e.key === "Enter") { clockInClockOut(clockedIn === "clockIn" ? "clockIn" : "clockOut") } }}
                  label="Password:"
                  variant="standard"
                  type={"password"}
                  width={120}
                />
                <DefaultButton
                  color="info"
                  onClick={() => switcher(true)}
                  style={{ minWidth: "10px", maxWidth: "10px" }}
                  variant="text"
                  title="↔️"
                />
              </div>
              <DefaultButton
                color={clockedIn === "clockIn" ? "success" : "secondary"}
                onClick={() => clockInClockOut(clockedIn === "clockIn" ? "clockIn" : "clockOut")}
                style={{ minWidth: "160px", maxWidth: "160px" }}
                title={clockedIn === "clockIn" ? "Clock in" : "Clock out"}
                variant="outlined"
              />
              <DefaultButton
                color={clockedIn === "clockIn" ? "success" : "secondary"}
                onClick={() => homeOfficeClockInClockOut(clockedIn === "clockIn" ? "clockIn" : "clockOut")}
                style={{ minWidth: "160px", maxWidth: "160px", padding: 6 }}
                title={clockedIn === "clockIn" ? "Homeoffice clock in" : "Homeoffice clock out"}
                variant="outlined"
              />
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
            autoFocus={username().getDataFromLocalStorage().length > 1}
            onClick={navigate}
            style={{ marginTop: 15, minWidth: "160px", maxWidth: "160px" }}
            title="Go to page"
            variant="outlined"
          />
        }
      </div>
    </>
  );
};
