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

  const formResult = (result: any) => {
    result.preventDefault();
    console.log(result.target[0].value);
    console.log(result.target[1].value);
  };

  return (
    <div>
      <br />
      <Collapse
        content={
          <div className="collapseContent">
            <form onSubmit={formResult}>
              <Input label="Username:" variant="standard" />
              <Input
                label="Password:"
                type="password"
                marginTop="5px"
                variant="standard"
              />
              <br />
              <DefaultButton type="submit" title="Set" variant="contained" />
              {/* TODO:  disabled ?? */}
            </form>
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
          variant="outlined"
        />
      </div>
    </div>
  );
};

export { Popup };
