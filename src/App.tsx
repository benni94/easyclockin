import { useCallback, useState } from "react";
import "./App.css";
import { Popup } from "./popup/popup";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

function App() {
  const [width, setWidth] = useState("220px");

  const appWidth = useCallback((size: number) => {
    setWidth(size + "px")
  }, []);

  const alertOptions = {
    timeout: 2000,
    position: positions.TOP_CENTER,
    offset: '20px',
  };

  return (
    <div className="App" style={{ width }}>
      <Provider template={AlertTemplate} {...alertOptions}>
        <Popup appWidth={appWidth} />
      </Provider>
    </div>
  );
}

export default App;
