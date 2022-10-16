import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Popup } from "./popup/popup";

function App() {
  const [url, setUrl] = useState("");
  const [width, setWidth] = useState("200px");

  /**
   * Get current URL
   */
  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };
    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const url = tabs[0].url as string;
        setUrl(url);
      });
  }, []);

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
