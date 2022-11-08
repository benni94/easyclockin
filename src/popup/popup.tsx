import { Divider } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Collapse } from "../components/collapse/collapse";
import { DefaultButton } from "../components/defaultButton/defaultButton";
import { Input } from "../components/Input/input";
import { navigateToUrl, getCurrentUrl } from "../functions/chrome";
import "./popup.css";
import { SubmitHandler, useForm } from 'react-hook-form';
import { clockerClicked, formValuesDefaults, savings } from "../functions/savingData";
import { ClockInTypes, FormValues } from "./popup.types";
import { InputAdvanced } from "./popup.render";
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { useAlert } from "react-alert";
import { renderClockIn } from "./renderClockIn";

export const Popup: React.FC<{ appWidth: (size: number) => void }> = ({ appWidth }) => {
  const { register, handleSubmit, formState: { isDirty, isValid }, reset, getValues } = useForm<FormValues>({ mode: "onChange" });
  const onSubmit: SubmitHandler<FormValues> = result => savings().toLocalStorage(result);
  const [onLoginUrl, setOnLoginUrl] = useState(false);
  const [clockedIn, setClockedIn] = useState(clockerClicked().getDataFromLocalStorage());
  const alert = useAlert();

  useEffect(() => {
    getCurrentUrl().then((currentUrl) => {
      currentUrl === savings().getDataFromLocalStorage().linkToPage ? setOnLoginUrl(true) : setOnLoginUrl(false);
    })
  }, []);

  const navigate = useCallback(() => {
    navigateToUrl(savings().getDataFromLocalStorage().linkToPage);
  }, []);

  const clear = useCallback(() => {
    reset(formValuesDefaults);
    savings().removeFromLocalStorage();
    alert.error("Clear executed!");
  }, [alert, reset]);

  const switcher = useCallback((shouldChange: boolean) => {
    const clicked = clockedIn === "clockIn" ? "clockOut" : "clockIn";
    clockerClicked().toLocalStorage(clicked);
    if (shouldChange) setClockedIn(clicked);
  }, [clockedIn]);

  const clockInClockOut = useCallback((clockIn: ClockInTypes) => {
    const args = savings().getDataFromLocalStorage();
    renderClockIn(args, clockIn, getValues().password);
    switcher(false);
  }, [getValues, switcher]);

  return (
    <div>
      <br />
      <div>
        <Collapse
          appWidth={appWidth}
          defaultClosed={savings().getDataFromLocalStorage().username.length > 1}
          collapsedIcon={<AddIcon />}
          openIcon={<RemoveIcon />}
          labelCollapsed="Settings:"
          labelOpen="Settings:"
          collapsedWidth={220}
          openWidth={220}
          content={
            <div className="collapseContent">

              <form onSubmit={handleSubmit(onSubmit)}>
                <Collapse
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
                />
                <div className="usernameWrapper">
                  <Input
                    {...register("username", { required: true })}
                    defaultValue={savings().getDataFromLocalStorage().username}
                    label="Username:"
                    variant="standard"
                    id="username"
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
      </div >
      <div className="buttonExecuteWrapper">
        {onLoginUrl ?
          <>
            <div className="bottomElementsWrapper">
              <Input
                autoFocus
                {...register("password")}
                width={150}
                label="Password:"
                type="password"
                variant="standard"
                id="password"
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
              <DefaultButton
                onClick={() => clockInClockOut("login")}
                style={{ minWidth: "130px", maxWidth: "130px", marginRight: "29px" }}
                title="Only login"
                variant="outlined"
              />
            </div>
          </>
          :
          <DefaultButton
            onClick={navigate}
            style={{ marginTop: "15px" }}
            title="Go to url"
            variant="contained"
          />
        }

      </div>
    </div >
  );
};
