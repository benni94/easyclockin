import React, { useCallback } from "react";
import { Collapse } from "../components/collapse/collapse";
import { DefaultButton } from "../components/defaultButton/defaultButton";
import { Input } from "../components/Input/input";
import { Switcher } from "../components/switcher/switcher";
import "./popup.css";

export type IPopupProps = {};

const Popup: React.FC<IPopupProps> = (props) => {
  const {} = props;

  const switcherResult = useCallback((e: boolean) => {
    console.log(e);
  }, []);

  return (
    <div>
      <br />
      <Collapse
        content={
          <div className="collapseContent">
            <Input label="Username:" variant="standard" />
            <Input
              label="Password:"
              type="password"
              marginTop="5px"
              variant="standard"
            />
          </div>
        }
      />
      <br />
      <div className="switcherHolder">
        <Switcher
          checkedLabel={{ isChecked: " on", isNotChecked: " off" }}
          isChecked={switcherResult}
          label="Autologin"
        />
      </div>

      <div className="buttonExecuteWrapper">
        <DefaultButton
          onClick={() => alert("Clear")}
          title="Clear"
          type="outlined"
        />
        <DefaultButton
          onClick={() => alert("Login")}
          title="Login"
          type="contained"
        />
      </div>
    </div>
  );
};

export { Popup };
