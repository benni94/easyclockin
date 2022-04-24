import React, { useCallback, useState } from "react";
import { Collapse } from "../components/collapse/collapse";
import { DefaultButton } from "../components/defaultButton/defaultButton";
import { IconInput } from "../components/iconInput/iconInput";
import { Input } from "../components/Input/input";
import { Switcher } from "../components/switcher/switcher";
import { getDomElementOnMouseOver, navigateToUrl } from "../functions/chrome";

import "./popup.css";

export type IPopupProps = {};

const Popup: React.FC<IPopupProps> = (props) => {
  const {} = props;

  const [collapseIndex, setCollapseIndex] = useState([0]);

  //navigateToUrl(); to navigate to the access url

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
      <div>
        {collapseIndex.map((index) => {
          return (
            <Collapse
              label={`${index} page:`}
              content={
                <div className="collapseContent">
                  <form onSubmit={formResult}>
                    <Input label="Link to Page:" variant="standard" />

                    <div className="iconInputWrapper">
                      <IconInput
                        placeholder="Username:"
                        onClick={getDomElementOnMouseOver}
                      />
                    </div>

                    <div className="iconInputWrapper">
                      <IconInput
                        placeholder="Password:"
                        type="password"
                        onClick={getDomElementOnMouseOver}
                      />
                    </div>

                    <div id="switchHolder">
                      <Switcher
                        checkedLabel={{
                          isChecked: " on",
                          isNotChecked: " off",
                        }}
                        isChecked={switcherResult}
                        label="Autologin"
                      />
                    </div>
                    <div className="setResetWrapper">
                      {index !== 0 && (
                        <DefaultButton
                          onClick={() => {
                            if (collapseIndex.length > 1) {
                              setCollapseIndex(
                                collapseIndex.filter((item) => item !== index)
                              );
                            }
                          }}
                          type="button"
                          color="error"
                          title="Remove"
                          variant="outlined"
                        />
                      )}
                      <DefaultButton
                        type="submit"
                        title="Set"
                        variant="contained"
                      />
                    </div>
                  </form>
                </div>
              }
            />
          );
        })}
      </div>

      <br />

      <div className="buttonExecuteWrapper">
        <DefaultButton
          onClick={() => alert("clicked")}
          title="Clear"
          color="error"
          variant="outlined"
        />
        <DefaultButton
          onClick={() => {
            if (collapseIndex.length !== 0) {
              setCollapseIndex([
                ...collapseIndex,
                collapseIndex.slice(-1)[0] + 1,
              ]);
            }
          }}
          title="Add"
          variant="contained"
        />
      </div>
    </div>
  );
};

export { Popup };
