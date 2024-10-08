import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Slider } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Input/input";
import { Box } from "../components/checkbox/box";
import { Collapse } from "../components/collapse/collapse";
import { DefaultButton } from "../components/defaultButton/defaultButton";
import { getCurrentUrl, navigateToUrl } from "../functions/chrome";
import {
  renderClockIn,
  renderClockInHomeOffice,
} from "../functions/renderFinder";
import {
  clockerSavings,
  password,
  url,
  username,
} from "../functions/savingData";
import "./popup.css";
import { ClockInTypes, FormValues } from "./popup.types";

export const Popup: React.FC<{ appWidth: (size: number) => void }> = ({
  appWidth,
}) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
  } = useForm<FormValues>({ mode: "onChange" });
  const onSubmit: SubmitHandler<FormValues> = (result) => {
    username().toLocalStorage(result.username);
    url().toLocalStorage(result.url);
    password().toLocalStorage(result.password);
  };
  const [onLoginUrl, setOnLoginUrl] = useState(false);
  const [clockedIn, setClockedIn] = useState(
    clockerSavings("clocker", "clockIn").getDataFromLocalStorage()
  );
  const alert = useAlert();

  const [hasOpenCollapsible, setHasOpenCollapsible] = useState(false);

  useEffect(() => {
    getCurrentUrl().then((currentUrl) => {
      currentUrl === url().getDataFromLocalStorage()
        ? setOnLoginUrl(true)
        : setOnLoginUrl(false);
    });
  }, [onLoginUrl]);

  const navigate = useCallback(() => {
    navigateToUrl(url().getDataFromLocalStorage());
  }, []);

  const clear = useCallback(() => {
    reset({ username: "" });
    username().removeFromLocalStorage();
    window.location.reload();
  }, [reset]);

  const switcher = useCallback(
    (shouldChange: boolean) => {
      if (shouldChange) {
        const clicked = clockedIn === "clockIn" ? "clockOut" : "clockIn";
        setClockedIn(clicked);
        clockerSavings("clocker", "clockIn").toLocalStorage(clicked);
      }
    },
    [clockedIn]
  );

  const clockInClockOutLogin = useCallback(
    (clockIn: ClockInTypes) => {
      renderClockIn(
        clockIn,
        username().getDataFromLocalStorage(),
        password().getDataFromLocalStorage()
      );
      if (clockIn !== "login")
        clockerSavings("clocker", "clockIn").toLocalStorage(
          clockedIn === "clockIn" ? "clockOut" : "clockIn"
        );
    },
    [clockedIn]
  );

  const homeOfficeClockInClockOut = useCallback(
    (clockIn: ClockInTypes) => {
      renderClockInHomeOffice(
        clockIn,
        username().getDataFromLocalStorage(),
        password().getDataFromLocalStorage()
      );
      if (clockIn !== "login")
        clockerSavings("clocker", "clockIn").toLocalStorage(
          clockedIn === "clockIn" ? "clockOut" : "clockIn"
        );
    },
    [clockedIn]
  );

  return (
    <>
      <Collapse
        appWidth={appWidth}
        defaultClosed={username().getDataFromLocalStorage().length > 1}
        collapsedIcon={<AddIcon />}
        isOpen={(open) => setHasOpenCollapsible(open)}
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
                  {...register("username")}
                  autoFocus
                  id="username"
                  defaultValue={username().getDataFromLocalStorage()}
                  label="Username:"
                  type="text"
                  variant="standard"
                  width={150}
                />
              </div>
              <div className="usernameWrapper">
                <Input
                  {...register("url")}
                  id="url"
                  defaultValue={url().getDataFromLocalStorage()}
                  label="Url:"
                  type="url"
                  variant="standard"
                  width={150}
                />
              </div>
              <div className="usernameWrapper">
                <Input
                  {...register("password")}
                  id="password"
                  defaultValue={password().getDataFromLocalStorage()}
                  label="Password:"
                  type="password"
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
                  checked={clockerSavings(
                    "checkbox",
                    false
                  ).getDataFromLocalStorage()}
                  fontSize="15px"
                  label="Close page in s:"
                  style={{
                    alignItems: "center",
                    display: "flex",
                    paddingTop: 20,
                  }}
                  onChange={(e) =>
                    clockerSavings("checkbox", false).toLocalStorage(
                      e.target.checked
                    )
                  }
                />
                <Slider
                  color="secondary"
                  defaultValue={
                    clockerSavings("slider", "").getDataFromLocalStorage() || 3
                  }
                  marks
                  max={6}
                  min={0}
                  step={1}
                  style={{ width: "160px" }}
                  onChange={(_, v) =>
                    clockerSavings("slider", "").toLocalStorage(v.toString())
                  }
                  valueLabelDisplay="auto"
                />
              </div>
            </form>
          </div>
        }
      />
      {!hasOpenCollapsible && (
        <div className="buttonExecuteWrapper">
          {onLoginUrl ? (
            <>
              <div className="bottomElementsWrapper">
                <DefaultButton
                  color={clockedIn === "clockIn" ? "success" : "secondary"}
                  onClick={() =>
                    clockInClockOutLogin(
                      clockedIn === "clockIn" ? "clockIn" : "clockOut"
                    )
                  }
                  size="large"
                  style={{ width: "160px" }}
                  title={clockedIn === "clockIn" ? "Clock in" : "Clock out"}
                  variant="outlined"
                />
                <DefaultButton
                  color={clockedIn === "clockIn" ? "success" : "secondary"}
                  onClick={() =>
                    homeOfficeClockInClockOut(
                      clockedIn === "clockIn" ? "clockIn" : "clockOut"
                    )
                  }
                  style={{ width: "160px" }}
                  size="large"
                  title={
                    clockedIn === "clockIn" ? "Home clock in" : "Home clock out"
                  }
                  variant="outlined"
                />
                <DefaultButton
                  onClick={() => clockInClockOutLogin("login")}
                  style={{ width: "160px" }}
                  size="large"
                  title="Only login"
                  variant="outlined"
                />
                <DefaultButton
                  color="secondary"
                  onClick={() => switcher(true)}
                  style={{ marginTop: "-8px" }}
                  size="medium"
                  variant="text"
                  title="◄ ►"
                />
              </div>
            </>
          ) : (
            <DefaultButton
              autoFocus={username().getDataFromLocalStorage().length > 1}
              onClick={navigate}
              style={{ minWidth: "160px", maxWidth: "160px" }}
              title="Go to page"
              variant="outlined"
            />
          )}
        </div>
      )}
    </>
  );
};
