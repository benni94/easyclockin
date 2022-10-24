import { useCallback, useState } from "react";
import "./App.css";
import { Popup } from "./popup/popup";

function App() {
  const [width, setWidth] = useState("220px");

  const appWidth = useCallback((size: number) => {
    setWidth(size + "px")
  }, []);


  return (
    <div className="App" style={{ width }}>
      <Popup appWidth={appWidth} />
    </div>
  );
}

export default App;
