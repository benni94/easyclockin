import React, { useEffect, useState } from "react";
import "./App.css";
import { Popup } from "./popup/popup";

function App() {
  const [url, setUrl] = useState("");

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

  return (
    <div className="App">
      <Popup />
      <p>{url}</p>
    </div>
  );
}

export default App;
