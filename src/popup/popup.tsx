import { Divider } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Collapse } from "../components/collapse/collapse";
import { DefaultButton } from "../components/defaultButton/defaultButton";
import { Input } from "../components/Input/input";
import { navigateToUrl, startLogin, getCurrentUrl } from "../functions/chrome";
import "./popup.css";
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValuesDefaults, savings } from "../functions/savingData";

export type FormValues = {
  linkToPage: string;
  username: string;
  password: string;
  clockIn: string;
  clockOut: string;
  htmlUsername: string;
  htmlPassword: string;
  htmlButton: string;
};

const Popup: React.FC<{ appWidth: (size: number) => void }> = ({ appWidth }) => {
  const { register, handleSubmit, formState: { isDirty, isValid }, reset } = useForm<FormValues>({ mode: "onChange" });
  const onSubmit: SubmitHandler<FormValues> = result => savings().toLocalStorage(result);
  const [onLoginUrl, setOnLoginUrl] = useState(false);

  useEffect(() => {
    //startLogin(savings().getDataFromLocalStorage());
    getCurrentUrl().then((currentUrl) => {
      currentUrl === savings().getDataFromLocalStorage().linkToPage ? setOnLoginUrl(true) : setOnLoginUrl(false);
    })
  }, []);

  const navigate = useCallback(() => {
    navigateToUrl(savings().getDataFromLocalStorage().linkToPage);
  }, []);


  const clockInClockOut = useCallback((clockIn: boolean) => {
    startLogin(savings().getDataFromLocalStorage(), clockIn);
  }, []);


  const clear = useCallback(() => {
    reset(formValuesDefaults);
    savings().removeFromLocalStorage();
  }, [reset]);

  return (
    <div>
      <br />
      <div>
        <Collapse
          appWidth={appWidth}
          label={"Settings:"}
          content={
            <div className="collapseContent">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="inputStyle">
                  <Input
                    {...(register("linkToPage", { required: true }))}
                    width={420}
                    defaultValue={savings().getDataFromLocalStorage().linkToPage}
                    label="Link to page:"
                    variant="standard"
                    id="linkToPage"
                  />
                  <div className="inputStyle">
                    <Input
                      {...(register("clockIn", { required: true }))}
                      width={420}
                      defaultValue={savings().getDataFromLocalStorage().clockIn}
                      label="Name of clock in:"
                      variant="standard"
                      id="linkToCome"
                    />
                  </div>
                  <div className="inputStyle">
                    <Input
                      {...(register("clockOut", { required: true }))}
                      width={420}
                      defaultValue={savings().getDataFromLocalStorage().clockOut}
                      label="Name of clock out:"
                      variant="standard"
                      id="linkToGo"
                    />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: "20px" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className="inputStyle">
                      <Input
                        {...register("username", { required: true })}
                        defaultValue={savings().getDataFromLocalStorage().username}
                        label="Username:"
                        variant="standard"
                        id="username"
                      />
                    </div>
                    <div className="inputStyle">
                      <Input
                        {...register("password", { required: true })}
                        defaultValue={savings().getDataFromLocalStorage().password}
                        label="Password:"
                        type="password"
                        variant="standard"
                        id="password"
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className="inputStyle">
                      <Input
                        {...register("htmlUsername", { required: true })}
                        defaultValue={savings().getDataFromLocalStorage().htmlUsername}
                        label="Html Element Username:"
                        variant="standard"
                        id="htmlUsername"
                      />
                    </div>
                    <div className="inputStyle">
                      <Input
                        {...register("htmlPassword", { required: true })}
                        defaultValue={savings().getDataFromLocalStorage().htmlPassword}
                        label="Html Element Password:"
                        variant="standard"
                        id="htmlPassword"
                      />
                    </div>
                    <div className="inputStyle">
                      <Input
                        {...register("htmlButton", { required: true })}
                        defaultValue={savings().getDataFromLocalStorage().htmlButton}
                        label="Html Element Button:"
                        variant="standard"
                        id="htmlButton"
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
                  sx={{ height: 45, m: 0.5 }}
                  orientation="horizontal" />
              </form>
            </div>
          }
        />
      </div>
      <div className="buttonExecuteWrapper">
        {onLoginUrl ?
          <>
            <DefaultButton
              onClick={() => clockInClockOut(true)}
              title="Clock in"
              variant="contained"
            />
            <DefaultButton
              onClick={() => clockInClockOut(false)}
              title="Clock out"
              variant="contained"
            />
          </>
          :
          <DefaultButton
            onClick={navigate}
            title="Go to url"
            variant="contained"
          />
        }

      </div>
    </div>
  );
};

export { Popup };
